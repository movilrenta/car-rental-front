import axios from "axios";
import { NextResponse } from "next/server";

const URL = process.env.NEXT_PUBLIC_URL_BACK

type Check_Availability = {
  startDate: string,
  endDate: string
}

export async function POST(request:any) {
  const payload:Check_Availability = await request.json()
  try {
    const {data, status} = await axios.post(`${URL}reservations/available-cars`, payload)
    return NextResponse.json({ response: data }, { status: status });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ response: [] }, { status: 400 });
  }
}