import { MongoClient, ObjectId } from "mongodb";
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

export async function PATCH(data: any) {
  const body = await data.json();
  try {
    const client = await clientPromise;
    const db = client.db("MovilRenta");
    const collection = db.collection("Users");

    const { _id, password } = body;

    const updatedUser = await collection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: { password } },
      { returnDocument: "after" }
    );
    if (!updatedUser) {
      return NextResponse.json({
        success: false,
        message: "No se pudo actualizar",
      });
    }

    return NextResponse.json({ success: true, message: "Usuario actualizado" });
  } catch (error) {
    console.log(error, "password reestart");
    return NextResponse.json({ success: false, message: "Error interno" });
  }
}
