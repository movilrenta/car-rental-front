"use server"
import { buildResponse } from "@/utils/build-response";
import axios from "axios";

export const getUsers = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/users-mongo")
    //console.log(res.data);
    return res.data
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