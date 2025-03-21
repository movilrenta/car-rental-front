import axios, { AxiosError } from "axios";
import { NextResponse, NextRequest } from "next/server";

const URL = process.env.NEXT_PUBLIC_URL_BACK as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await axios.post(`${URL}brands`, body);
    return NextResponse.json({ ok: true, data: res.data, status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({
        ok: false,
        message: error.response?.data.message,
        status: error.response?.status,
      });
    }
    return NextResponse.json({
      ok: false,
      message: "Internal Server Error",
      status: 500,
    });
  }
}
