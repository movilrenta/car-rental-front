import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const PRIVATE_API_KEY = process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PRIVATE_API_KEY_PAYWAY
    : process.env.NEXT_PRIVATE_API_KEY_PAYWAY_DEV
  const API_URL = process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PUBLIC_URL
    : process.env.NEXT_PUBLIC_URL_DEV

  try {
    const response = await axios.get(
      `${API_URL}payments` || "",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          apikey: PRIVATE_API_KEY,
        },
      }
    );

    return NextResponse.json({ response: response.data }, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
 }
}