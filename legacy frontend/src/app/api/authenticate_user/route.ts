"use server";

import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Set to "0" to disable certificate verification. set back to "1" when in prod

  const userID = await request.json().catch((err) => {
    return Response.json("Failed to unmarshal userID cookie", { status: 500 });
  });

  const go_server_url = await process.env.GO_SERVER_URL;

  const res = await fetch(go_server_url + "/user/authenticate", {
    method: "POST",
    body: userID,
    agent: new (require("https").Agent)({ rejectUnauthorized: false }), // Ignore certificate verification
  });

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

  return Response.json(res, {
    status: res.status,
    statusText: res.statusText,
  });
}
