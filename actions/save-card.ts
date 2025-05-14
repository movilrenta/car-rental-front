"use server";

import { z } from 'zod';
import { formSchema, formSchemaGetToken } from '../types/payway-form.schema';
import clientPromise from '@/lib/mongodb'

export const saveCard = async (values:z.infer<typeof formSchemaGetToken>) => {
  try {
    const schema = formSchema();
    const resultParsed = await schema.safeParseAsync(values);
    if(!resultParsed.success){
      return {
        ok:false,
        message:"no se pudo realizar la peticion"
      }
    }

    const client = await clientPromise;
    const db = client.db("MovilRenta")
    const collection = db.collection('card')
    await collection.insertOne(resultParsed.data)

    return {
      ok: true
    }
  } catch (error) {
    return {
      ok:false,
      message:"Internal server error"
    }
  }
}