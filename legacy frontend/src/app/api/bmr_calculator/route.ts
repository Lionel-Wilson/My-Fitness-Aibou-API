"use server";

import { BmrFormData } from "@/app/lib/types";

export async function POST(request: Request) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Set to "0" to disable certificate verification. set back to "1" when in prod
  const go_server_url = await process.env.GO_SERVER_URL;

  const formData = (await request.json()) as BmrFormData;
  const age = JSON.stringify(formData.Age);
  const weight = JSON.stringify(formData.Weight);
  const height = JSON.stringify(formData.Height);
  const gender = formData.Gender;

  const res = await fetch(
    go_server_url +
      "/kitchen/bmr?age=" +
      age +
      "&weight=" +
      weight +
      "&height=" +
      height +
      "&gender=" +
      gender,
    {
      method: "POST",
      agent: new (require("https").Agent)({ rejectUnauthorized: false }), // Ignore certificate verification
    }
  ).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return res.json();
  });

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";

  return Response.json(res);
}
