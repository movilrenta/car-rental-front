import { z } from "zod";

// los aditionals_array deben ser asi aditionals_array: [{id: 1, amount: 10}, { id: 2, amount: 5} o []
export const reservasSchema = z.object({
    firstName: z.string().min(2,{message:"El nombre es obligatorio"}).max(30, "Nombre demasiado extenso"),
    lastName: z.string().min(2,"El apellido debe contener al menos 2 caracteres").max(25,"No se admiten más de 25 caracteres"),
    email:z.string().email({message:"El correo es obligatorio"}),
    phone:z.string().min(10,{message:"El telefono es obligatorio y debe contener como minimo 10 caracteres"}),

    document_type: z.enum(["DNI", "Pasaporte"]),
    document_number:z.string().trim().min(7, "El campo es obligatorio"),
    license_number:z.string().trim().min(6, "El campo es obligatorio"),
    license_expiration_date:z.string().trim().min(1, "El campo es obigatorio"),
    drivers_address:z.string().trim().min(1, "El campo es obigatorio"),
    drivers_city:z.string().trim().min(1, "El campo es obigatorio"),
    flight_number:z.string().trim().optional(),

    observation: z.string().max(200, "No se admiten más de 200 caracteres").optional(),
    termyCond: z.boolean().default(false),
    mayor25: z.boolean().default(false),
    aditionals_array: z.array(z.object({
      id: z.number(),
      amount: z.number()
    })).optional(),
  })