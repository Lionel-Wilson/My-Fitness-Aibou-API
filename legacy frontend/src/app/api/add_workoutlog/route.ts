"use server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  //const cookieStore = cookies()
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Set to "0" to disable certificate verification. set back to "1" when in prod
  const go_server_url = await process.env.GO_SERVER_URL;
  const formData = await request.json();
  const formDataJson = JSON.stringify(formData);

  const res = await fetch(go_server_url + "/workout/addworkoutlog", {
    method: "POST",
    body: formDataJson,
    agent: new (require("https").Agent)({ rejectUnauthorized: false }), // Ignore certificate verification
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          JSON.stringify({ flashMessage: new Error(text) });
        });
      }

      return res.json();
    })
    .then((message) => {
      //const sessionId = cookieStore.get('test-session')?.value
      return JSON.stringify({ flashMessage: message });
    });
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

  return Response.json(res);
}
