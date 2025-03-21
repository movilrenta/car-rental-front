import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BACK = process.env.NEXT_PUBLIC_URL_BACK

type Params = {
  params: Promise<{fechaId: string}>
}

export async function PUT(req: NextRequest, context: { params: { fechaId: string } }) {
  try {
    const body = await req.json();
    const response = await axios.put(
      `${BACK}date-based-price-multipliers/${context.params.fechaId}`,
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

export async function DELETE(req: NextRequest, context: { params: { fechaId: string } }) {
  try {
    const response = await axios.delete(
      `${BACK}date-based-price-multipliers/${context.params.fechaId}`
    );
    return NextResponse.json({message: response.data, status: 200});
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to fetch data', errorData: e },
      { status: 500 }
    );
  }
}
