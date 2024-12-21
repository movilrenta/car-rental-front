import axios from "axios";
import { NextResponse } from "next/server";

const BACK = process.env.NEXT_PUBLIC_URL_BACK

export async function GET() {
  try {
    const response = await axios.get(`${BACK}cars`);
    return NextResponse.json({ response: response.data }, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const body = await req.json();
    const response = await axios.post(
      `${BACK}cars` || "",
      body
    );

    return NextResponse.json({ response: response.data }, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
 }
}