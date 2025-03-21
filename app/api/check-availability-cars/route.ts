import axios from "axios";
import { NextResponse } from "next/server";

const URL = process.env.NEXT_PUBLIC_URL_BACK;

type Check_Availability = {
  startDate: string;
  endDate: string;
};
const BACK = process.env.NEXT_PUBLIC_URL_BACK;
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.movilrenta.com.ar";
async function getStatus(id: string) {
  try {
    const response = await fetch(
      `https://www.movilrenta.com.ar/api/status-car?id=${id}`
    );
    const data = await response.json();
    // console.log(data, "data");
    return data?.locked_status || false;
  } catch (error) {
    return "unknown"; // En caso de error, devolver un estado predeterminado
  }
}

export async function POST(request: any) {
  const payload: Check_Availability = await request.json();
  try {
    const { data, status } = await axios.post(
      `${URL}reservations/available-cars`,
      payload
    );
    //console.log(status, "DESDE LA API");
    // Mapear cada auto y obtener su estado
    // const carsWithStatus = await Promise.all(
    //   data.map(async (car: { id: string }) => ({
    //     ...car,
    //     status: await getStatus(car.id),
    //   }))
    // );
    // console.log(carsWithStatus, "cars");

    return NextResponse.json({ response: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ response: [] }, { status: 400 });
  }
}
