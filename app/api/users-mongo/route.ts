import { MongoClient, ObjectId } from 'mongodb';
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
    const users = await collection.find({}).toArray();
    const usersToShow = users.filter((user) => user?.role !== "supseradmin");
    return NextResponse.json(usersToShow);
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Failed to fetch data' ,
      status: 500 },
    );
  }
}

export async function POST(user: any) {
  const userBody = await user.json();

  try {
    const client = await clientPromise;
    const db = client.db("MovilRenta");
    const collection = db.collection("Users");
    const { name, email, password, roles} = userBody;
    const isExistingUser = await collection.findOne({email});
    if (isExistingUser) {
      return NextResponse.json({ message: "El email ya está registrado", status: 409 })
    }


    const createdUser = await collection.insertOne({name, email, password, role: roles, isBloqued: false})
    return NextResponse.json(createdUser);
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Failed to fetch data' ,
      status: 500 },
    );
  }
}

export async function PATCH(user: any) {
  const userBody = await user.json();

  try {
    const client = await clientPromise;
    const db = client.db("MovilRenta");
    const collection = db.collection("Users");
    const { _id, roles, isBloqued} = userBody;
    const updatedUser = await collection.findOneAndUpdate(
      {_id: new ObjectId(_id)},
      {$set: {role: roles, isBloqued: isBloqued}}
    )

    console.log(updatedUser);
    //const users = await collection.find({}).toArray();
    //const usersToShow = users.filter((user) => user?.role !== "superadmin");
    return NextResponse.json(updatedUser);
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Failed to fetch data' ,
      status: 500 },
    );
  }
}

