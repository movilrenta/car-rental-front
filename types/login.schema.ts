import { z } from "zod";
export const loginSchema = z.object({
  user: z
    .string()
    .min(1, "El campo es obligatorio")
    .max(35, "Demasiados caracteres, el máximo es 35"),
  password: z
    .string()
    .min(8, {
      message:
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula",
    })
    .refine(
      (val) => /[a-z]/.test(val),
      "La contraseña debe tener al menos una letra minúscula"
    ),
    // .refine(
    //   (val) => /[A-Z]/.test(val),
    //   "La contraseña debe tener al menos una letra mayúscula"
    // )
  // .refine(
  //   (val) => /[0-9]/.test(val),
  //   "La contraseña debe tener al menos un número"
  // ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
