"use server";

import { z } from 'zod';
import { formSchema } from '../types/payway-form.schema';
import clientPromise from '@/lib/mongodb'

export const saveCard = async (values:z.infer<typeof formSchema>) => {
  try {
    const resultParsed = await formSchema.safeParseAsync(values)
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