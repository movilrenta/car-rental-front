import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

type errorType = {
  response: {
    data: {
      message: string;
    };
  };
};

export async function GET(request: Request) {
  try {
    if (!request.url) {
      return NextResponse.json(
        { error: "Invalid request: URL is undefined" },
        { status: 400 }
      );
    }

    // Crear una instancia de URL correctamente
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "El parámetro 'id' es requerido" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("MovilRenta");
    const collection = db.collection("Data");

    const car = await collection.findOne({ id: parseInt(id) });

    if (!car) {
      return NextResponse.json(
        { error: "Auto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ response: car }, { status: 200 });
  } catch (error: any) {
    console.error("Error en la API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
