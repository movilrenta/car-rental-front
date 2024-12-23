import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BACK = process.env.NEXT_PUBLIC_URL_BACK

type Params = {
  params: Promise<{additionalId: string}>
}

export async function PUT(req: NextRequest, context: { params: { additionalId: string } }) {
  try {
    const body = await req.json();
    const response = await axios.put(
      `${BACK}aditional/${context.params.additionalId}`,
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

export async function DELETE(req: NextRequest, context: { params: { additionalId: string } }) {
  try {
    const response = await axios.delete(
      `${BACK}aditional/${context.params.additionalId}`
    );
    return NextResponse.json({message: response.data, status: 200});
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to fetch data', errorData: e },
      { status: 500 }
    );
  }
}
