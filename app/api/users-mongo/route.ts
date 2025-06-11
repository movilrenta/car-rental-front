import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
   const client = await clientPromise;
    const db = client.db("MovilRenta");
    const collection = db.collection("Users");
    const items = await collection.find({}).toArray();
    console.log(items)
    return NextResponse.json(items);
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Failed to fetch data' ,
      status: 500 },
    );
  }
}