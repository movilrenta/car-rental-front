import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  const PUBLIC_API_KEY = process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PUBLIC_API_KEY_PAYWAY
    : process.env.NEXT_PUBLIC_API_KEY_PAYWAY_DEV
  const API_URL = process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PUBLIC_URL
    : process.env.NEXT_PUBLIC_URL_DEV

  try {
    const body = await req.json();

    const response = await axios.post(
      `${API_URL}tokens` || "",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          apikey: PUBLIC_API_KEY,
        },
      }
    );

    return NextResponse.json({ response: response.data }, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
 }
}