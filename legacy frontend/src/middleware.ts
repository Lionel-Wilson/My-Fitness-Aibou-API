import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const userID = request.cookies.get("userID")?.value;

  /*
  if the user is either:
  1. has no userID cookie and is trying to access to dashboard
  2. has a user cookie but it's not for an existing user
  Then redirect to login
  */
  if (!userID && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", request.url));
  } else if (userID && request.nextUrl.pathname.startsWith("/dashboard")) {
    var hasAccess = false;

    hasAccess = await authenticateUser(userID);
    if (!hasAccess) {
      return Response.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

async function authenticateUser(userID: string) {
  const response = await fetch(process.env.URL + "/api/authenticate_user", {
    method: "POST",
    body: userID,
  });
  if (response.status == 200) {
    return true;
  }
  return false;
}
