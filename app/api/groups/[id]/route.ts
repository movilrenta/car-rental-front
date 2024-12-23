import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

const BACK = process.env.NEXT_PUBLIC_URL_BACK

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json();
    const { id } = await params;
    const response = await axios.put(`${BACK}groups/${id}`, body);
    return NextResponse.json({ ok:true, data: response.data, status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({
        ok:false,
        message: error.response?.data.message,
        status: error.response?.status,
      });
    }
    return NextResponse.json({ ok:false, message: "Internal Server Error", status: 500 });
  }
}

export async function DELETE(request:NextRequest, {params}: Params){
  try {
    const { id } = await params;
    const response = await axios.delete(`${BACK}groups/${id}`);
    return NextResponse.json({ ok:true, data: response.data, status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({
        ok:false,
        message: error.response?.data.message,
        status: error.response?.status,
      });
    }
    return NextResponse.json({ ok:false, message: "Internal Server Error", status: 500 });
  }
}