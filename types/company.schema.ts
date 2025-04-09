import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio").max(40, "El nombre no puede exceder los 40 caracteres").trim(),
  email: z.string().email("El correo electrónico es obligatorio").max(60, "El correo electrónico no puede exceder los 60 caracteres").trim(),
  phone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .max(21, "El teléfono no puede tener más de 21 dígitos")
    .trim(),
  company: z.string().min(2, "El campo es obligatorio").max(40,"El campo no puede exceder los 40 caracteres").trim(),
  description: z
    .string()
    .min(10, "El detalle es demasiado corto")
    .max(500, "El detalle es demasiado extenso"),
});