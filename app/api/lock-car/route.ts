"use server";

//import axios from "axios";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri =
  "mongodb+srv://juanignaciomunozok:Morrison241408@cluster0.h573vbi.mongodb.net/";

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

const lockCar = async (values: any) => {
  try {
    const client = await clientPromise;
    const db = client.db("MovilRenta");
    const collection = db.collection("Cards");

    await collection.insertOne(values);
  } catch (error) {
    return {
      ok: false,
      message: "Internal server error",
    };
  }
};

export async function POST(req: any) {
  const body = await req.json();
  await lockCar(body);
  return NextResponse.json({ ok: true }, { status: 200 });
}
