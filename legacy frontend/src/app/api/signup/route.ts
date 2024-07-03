"use server";

import { permanentRedirect } from "next/navigation";

export async function POST(request: Request) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Set to "0" to disable certificate verification. set back to "1" when in prod
  const go_server_url = await process.env.GO_SERVER_URL;

  const formData = await request.json();

  const res = await fetch(go_server_url + "/user/signup", {
    method: "POST",
    body: JSON.stringify(formData),
    agent: new (require("https").Agent)({ rejectUnauthorized: false }), // Ignore certificate verification
  });
  if (!res.ok) {
    const responseBody = await res.json();
    return new Response(JSON.stringify(responseBody), {
      status: res.status,
    });
  }

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

  const responseBody = await res.json(); //TO-DO: find out how to send flashmessage to redirected login page.

  return permanentRedirect(`/login`);
}
