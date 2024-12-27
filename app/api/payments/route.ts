import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const PRIVATE_API_KEY = process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PRIVATE_API_KEY_PAYWAY
    : process.env.NEXT_PRIVATE_API_KEY_PAYWAY_DEV
  const API_URL = process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PUBLIC_URL
    : process.env.NEXT_PUBLIC_URL_DEV

  try {
    const body = await req.json();
    const response = await axios.post(
      `${API_URL}payments` || "",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          apikey: PRIVATE_API_KEY,
        },
      }
    );

    return NextResponse.json({ response: response.data }, { status: 200 });
  } catch (error) {
    console.log(error)
    if(error instanceof AxiosError) {
      return NextResponse.json({ error: error.response?.data }, { status: error.status });
    }
    return NextResponse.json({ error: error }, { status: 500 });
 }
}