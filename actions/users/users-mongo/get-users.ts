"use server"

import { buildResponse } from "@/utils/build-response";
import { MongoClient, ObjectId } from "mongodb";

// const uri =
//   "mongodb+srv://juanignaciomunozok:Morrison241408@cluster0.h573vbi.mongodb.net/";

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   if (!(global as any)._mongoClientPromise) {
//     client = new MongoClient(uri!);
//     (global as any)._mongoClientPromise = client.connect();
//   }
//   clientPromise = (global as any)._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri!);
//   clientPromise = client.connect();
// }

export const getUsers = async () => {
  // console.log("userget")
  // const client = await clientPromise;
  // const db = client.db('MovilRenta');
  try {
    // const users = await db.collection("Users").find({}).toArray()
    // return users.map(u => ({...u, id: u._id.toString()}))
  } catch (error) {
    console.log("Error al realizar la peticion",error)
    return {message:"Error interno", code: 500}
  }
}

export const getUserById = async (id:string) => {
// const client = await clientPromise;
  try {
    // const db = client.db(process.env.MONGO_URL);
    // const user = await db.collection("Users").findOne({
    //   _id: new ObjectId(id)
    // })
    // if(!user)return buildResponse({message:"No se encontró el usuario", code: 404})
    // return {...user, id: user._id.toString()}
  } catch (error) {
    console.log("Error al realizar la peticion",error)
    return {message:"Error interno", code: 500}
  }
}