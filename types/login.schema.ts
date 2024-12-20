import { z } from "zod";
export const loginSchema = z.object({
  user: z
    .string()
    .min(1, "El campo es obligatorio")
    .max(15, "Demasiados caracteres, el máximo es 15"),
  password: z
    .string()
    .min(8, {
      message:
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
    })
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
});