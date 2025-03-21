import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BACK = process.env.NEXT_PUBLIC_URL_BACK

type Params = {
  params: Promise<{carId: string}>
}

export async function PUT(req: NextRequest, context: { params: { carId: string } }) {
  try {
    const body = await req.json();
    console.log(body, "__________");
    const response = await axios.put(
      `${BACK}cars/${context.params.carId}`,
      body
    );
    return NextResponse.json({message: response.data, status: 200});
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to fetch data', errorData: e },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: { params: { carId: string } }) {
  try {
    const body = await req.json();
    console.log(body);
    const response = await axios.put(
      `${BACK}cars/${context.params.carId}`,
      body
    );
    return NextResponse.json({message: response.data, status: 200});
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to fetch data', errorData: e },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: { params: { carId: string } }) {
  try {
    const response = await axios.delete(
      `${BACK}cars/${context.params.carId}`
    );
    return NextResponse.json({message: response.data, status: 200});
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to fetch data', errorData: e },
      { status: 500 }
    );
  }
}
