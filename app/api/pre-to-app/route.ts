//NEXT_PRIVATE_API_KEY_PAYWAY
import axios from "axios";
import { NextResponse } from "next/server";

export async function PUT(req: any, res: any) {
  const PRIVATE_API_KEY = process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PRIVATE_API_KEY_PAYWAY
    : process.env.NEXT_PRIVATE_API_KEY_PAYWAY_DEV
  const API_URL = process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PUBLIC_URL
    : process.env.NEXT_PUBLIC_URL_DEV

  try {
    const body = await req.json();
    const id = body.id
    delete body.id

    const url_to_appoved = `${API_URL}payments/${id}`

    const response = await axios.put(
      url_to_appoved,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          apiKey: PRIVATE_API_KEY,
        },
      }
    );
    return NextResponse.json({ response: response.data }, { status: 200 });
  } catch (error: any) {
    console.log(error, "_______ ERROR!!!!");
    const errorMessage = error.response?.data || error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
 }
}