import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(data: any) {
  const body = await data.json();
  try {
    const client = await clientPromise;
    const db = client.db("MovilRenta");
    const collection = db.collection("Users");
    const user = await collection.findOne({ _id: new ObjectId(body._id) });

    const { _id, actualPassword, newPassword } = body;
    if (actualPassword !== user?.password) {
      return NextResponse.json({
        success: false,
        message: "No se pudo actualizar, verificar informacion",
      });
    }

    const updatedUser = await collection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: { password: newPassword } }
    );
    if (!updatedUser) {
      return NextResponse.json({
        success: false,
        message: "No se pudo actualizar",
      });
    }

    return NextResponse.json({ success: true, message: "Contraseña actualizada" });
  } catch (error) {
    console.log(error, "password reestart");
    return NextResponse.json({ success: false, message: "Error interno" });
  }
}
