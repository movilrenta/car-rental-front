import { z } from "zod";

export const NewPasswordFormSchema = z.object({
  _id: z.string(),
  actualPassword: z.string().min(8, "Debe ser mayor a 7").trim(),
  newPassword: z.string().min(8, "Debe ser mayor a 7").trim(),
  repeatNewPassword: z.string().min(8, "Debe ser mayor a 7").trim(),
}).refine((data) => data.newPassword === data.repeatNewPassword, {
  message: "Las contraseñas no coinciden",
  path: ["repeatNewPassword"],
});