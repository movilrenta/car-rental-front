"use server";
import clientPromise from "@/lib/mongodb";

export const lockCar = async (values: any) => {
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
export const getSatusCar = async (id: number) => {
  try {
    const client = await clientPromise;
    const db = client.db("MovilRenta");
    const collection = db.collection("Data");
    const car = await collection.findOne({ id });

    return car;
  } catch (error) {
    return {
      ok: false,
      message: "Internal server error",
    };
  }
};

// export const saveCard = async (values: any) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db("MovilRenta");
//     const collection = db.collection("Data");
//     await collection.insertOne(values);
//     console.log(client, "valkyes");

//     return {
//       ok: true,
//     };
//   } catch (error) {
//     return {
//       ok: false,
//       message: "Internal server error",
//     };
//   }
// };
