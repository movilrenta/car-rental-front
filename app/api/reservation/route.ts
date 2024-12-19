import axios from "axios";
import { NextResponse } from "next/server";

const URL = process.env.NEXT_PUBLIC_URL_BACK

type Check_Availability = {
  startDate: string,
  endDate: string
}

type errorType = {
  response: {
    data: {
      message: string
    }
  }
}

export async function POST(request:any) {
  const payload:any = await request.json()
  try {
    const {data, status} = await axios.post(`${URL}reservations/`, payload)
    return NextResponse.json({ response: data }, { status: status });
  } catch (error: errorType | any) {
    console.log(error,"error");
    const response = error?.response?.data
    return NextResponse.json({ response: response }, { status: 400 });
  }
}