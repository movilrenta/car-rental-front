import axios from "axios";
import { NextResponse } from "next/server";

const BACK = process.env.NEXT_PUBLIC_URL_BACK;
const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.movilrenta.com.ar";
// async function getStatus(id: string) {
//   try {
//     const response = await fetch(`${URL}/api/status-car?id=${id}`);
//     const data = await response.json();
//     // console.log(data, "data");
//     return data?.locked_status || false;
//   } catch (error) {
//     return "unknown"; // En caso de error, devolver un estado predeterminado
//   }
// }
export async function GET() {
  try {
    const response = await axios.get(`${BACK}cars`);
    const cars = response.data;

    // Mapear cada auto y obtener su estado
    // const carsWithStatus = await Promise.all(
    //   cars.map(async (car: { id: string }) => ({
    //     ...car,
    //     status: await getStatus(car.id),
    //   }))
    // );
    // console.log(carsWithStatus, "cars");

    return NextResponse.json({ cars: cars }, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const body = await req.json();
    const response = await axios.post(`${BACK}cars` || "", body);

    return NextResponse.json({ response: response.data }, { status: 200 });
  } catch (error: any) {
    const errorMessage = error.response?.data || error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
