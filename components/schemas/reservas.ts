import { z } from "zod";

export const reservasSchema = z.object({
    name: z.string().min(2,{message:"El nombre es obligatorio"}),
    email:z.string().email({message:"El correo es obligatorio"}),
    phone:z.string().min(10,{message:"El telefono es obligatorio y debe contener como minimo 10 caracteres"}),
    company:z.string().optional(),
    coments:z.string().max(500).optional(),
    termyCond: z.boolean().default(false),
    mayor25: z.boolean().default(false)
  })