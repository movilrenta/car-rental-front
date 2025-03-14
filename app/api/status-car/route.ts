"use server";

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URL;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri!);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri!);
  clientPromise = client.connect();
}

export async function GET(request: Request) {
  const client = await clientPromise;
  const db = client.db("MovilRenta");
  const collection = db.collection("Data");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const car = await collection.findOne({ id: Number(id) });

  return NextResponse.json(car);
}
