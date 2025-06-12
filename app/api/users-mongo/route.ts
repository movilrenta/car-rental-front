import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
   const client = await clientPromise;
    const db = client.db("MovilRenta");
    const collection = db.collection("Users");
    const users = await collection.find({}).toArray();
    //const usersToShow = users.filter((user) => user?.role !== "supseradmin");
    return NextResponse.json(users);
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
    const { _id, name, email, password, roles, isBloqued} = userBody;
    const updatedUser = await collection.findOneAndUpdate(
      {_id: new ObjectId(_id)},
      {$set: {name, email, password, role: roles, isBloqued}}
    )

    return NextResponse.json(updatedUser);
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: 'Failed to fetch data' ,
      status: 500 },
    );
  }
}

