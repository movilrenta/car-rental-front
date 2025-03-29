import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio").trim(),
  email: z.string().email("El correo electrónico es obligatorio").trim(),
  phone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .trim(),
  company: z.string().min(2, "El campo es obligatorio").trim(),
  description: z
    .string()
    .min(10, "El detalle es demasiado corto")
    .max(500, "El detalle es demasiado extenso"),
});