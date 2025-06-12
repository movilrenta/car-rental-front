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

interface UserDb {
  name: string;
  email: string;
  role: string;
  isBloqued: boolean;
  password: string;
}

export async function POST(values: any) {
  try {
    const data = await values.json();
    const client = await clientPromise;
    const db = client.db("MovilRenta");
    const collection = db.collection<UserDb>("Users");
    const userdb = await collection.findOne({ email: data.user });
    if (!userdb) {
      return NextResponse.json({
        message: "El usuario y/o contraseña no coinciden",
        success: false,
      });
    }
    if (userdb.isBloqued) {
      return NextResponse.json({
        message: "Su usuario se encuentra bloqueado",
        success: false,
      });
    }
    if (data.password !== userdb.password) {
      return NextResponse.json({
        message: "El usuario y/o contraseña no coinciden",
        success: false,
      });
    }
    const user = {
      _id: userdb._id,
      role: userdb.role,
      name: userdb.name,
    };
    return NextResponse.json({
      message: "Sesión iniciada con éxito",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Hubo un problema al iniciar sesión, reintente nuevamente",
    });
  }
}
