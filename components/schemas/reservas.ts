import { z } from "zod";

export const reservasSchema = z.object({
    name: z.string().min(2,{message:"El nombre es obligatorio"}).max(30, "Nombre demasiado extenso"),
    lastName: z.string().min(2,"El apellido debe contener al menos 2 caracteres").max(25,"No se admiten más de 25 caracteres"),
    email:z.string().email({message:"El correo es obligatorio"}),
    phone:z.string().min(10,{message:"El telefono es obligatorio y debe contener como minimo 10 caracteres"}),
    termyCond: z.boolean().default(false),
    mayor25: z.boolean().default(false)
  })