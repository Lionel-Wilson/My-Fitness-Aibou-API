"use server";
import { cookies } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";

export async function POST(request: Request) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const go_server_url = await process.env.GO_SERVER_URL;

  const loginDetails = await request.json();

  const res = await fetch(go_server_url + "/user/login", {
    method: "POST",
    body: JSON.stringify(loginDetails),
    agent: new (require("https").Agent)({ rejectUnauthorized: false }), // Ignore certificate verification
  });
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

  if (!res.ok) {
    const responseBody = (await res.json()) as UserDetails;
    console.log("response is not 200:");
    console.log(responseBody);
    return new Response(JSON.stringify(responseBody), {
      status: res.status,
    });
  }

  // Extracting cookies from the response headers
  const setCookieHeader = res.headers.get("Set-Cookie");
  const parsedCookies = parseSetCookieHeader(setCookieHeader);

  // Get the "userID" cookie
  const useridCookie = parsedCookies.find(
    (cookie: { name: string }) => cookie.name === "userID"
  );
  console.log("user id cookie made from funky funtions:");
  console.log(useridCookie);
  const cookieStore = cookies();

  if (useridCookie != undefined) {
    console.log("Cookie extracted!!");
    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    cookieStore.set({
      name: "userID",
      value: useridCookie?.value,
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + twentyFourHoursInMilliseconds),
    });
    const userDetails: UserDetails = await res.json();
    console.log("Prepare for redirection!!!");

    redirect(`/dashboard/${userDetails.userName}`); // Navigate to the new post page

    //return permanentRedirect(`/dashboard/${userDetails.userName}`);
  }
}

// Helper function to parse Set-Cookie header
function parseSetCookieHeader(setCookieHeader: string | null) {
  if (!setCookieHeader) {
    return [];
  }

  return setCookieHeader.split(";").map((cookie) => {
    const [name, ...options] = cookie.trim().split("=");
    const [value] = options.join("=").split(";");
    return { name, value };
  });
}
