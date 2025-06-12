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
        "La contraseña debe tener al menos 8 caracteres",
    })
});

export type LoginFormValues = z.infer<typeof loginSchema>;
