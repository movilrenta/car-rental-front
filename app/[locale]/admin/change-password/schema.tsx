import { z } from "zod";

export const NewPasswordFormSchema = z
  .object({
    _id: z.string(),
    actualPassword: z.string().min(8, "Debe ser mayor a 7").trim(),
    newPassword: z
      .string()
      .min(8, "Debe ser mayor a 7")
      .trim()
      .refine(
      (val) => /[A-Z]/.test(val),
      "La contraseña debe tener al menos una letra mayúscula"
      )
      .refine(
        (val) => /[a-z]/.test(val),
        "La contraseña debe tener al menos una letra minúscula"
      )
      .refine(
        (val) => /[0-9]/.test(val),
        "La contraseña debe tener al menos un número"
      ),
    repeatNewPassword: z.string().min(8, "Debe ser mayor a 7").trim(),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatNewPassword"],
  });
