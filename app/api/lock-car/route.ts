"use server";

import axios from "axios";
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
    const collection = db.collection("Data");
    const car = await collection.findOne({ id: values.id });
    if (car) {
      await collection.updateOne(
        { id: values.id },
        { $set: { locked_status: values.locked_status } }
      );
    } else {
      await collection.insertOne(values);
    }

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Internal server error",
    };
  }
};

export async function POST(req: any) {
  const body = await req.json();
  const response = await lockCar(body);
  return NextResponse.json(response, { status: 200 });
}
