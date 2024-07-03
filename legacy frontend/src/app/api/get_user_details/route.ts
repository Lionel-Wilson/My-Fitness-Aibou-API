"use server";

import { cookies } from "next/headers";

export async function GET() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Set to "0" to disable certificate verification. set back to "1" when in prod
  const go_server_url = await process.env.GO_SERVER_URL;

  const cookieStore = cookies();
  const userID = await cookieStore.get("userID")?.value;
  if (userID != undefined) {
    const res = await fetch(go_server_url + "/user/details", {
      method: "POST",
      body: userID,
      agent: new (require("https").Agent)({ rejectUnauthorized: false }), // Ignore certificate verification
    }).then((res) => {
      //TO-DO: Sort the below out and all the responses.
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
      return res.json();
    });

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

    return Response.json(res);
  } else {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

    return Response.json("No userId cookie");
  }
}
