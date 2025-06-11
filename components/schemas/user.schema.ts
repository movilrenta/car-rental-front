import { z } from "zod";

export const userSchema = z.object({
  _id:z.string().optional(),
  id:z.string().optional(),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").trim(),
  email: z.string().email("El correo electrónico no es válido").trim(),
  password: z
    .string()
    .trim()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .refine(
      (val) => /[A-Z]/.test(val),
      "La contraseña debe tener al menos una letra mayúscula"
    )
    .refine(
      (val) => /[a-z]/.test(val),
      "La contraseña debe tener al menos una letra minúscula"
    ).refine(
      (val) => /[0-9]/.test(val),
      "La contraseña debe tener al menos un número"
    ),
  roles: z.enum(["vendedor", "auditor", "admin", "superadmin" ], {required_error: "El rol es obligatorio"}),
  isBloqued: z.boolean().default(false)
});

export type UserFormValues = z.infer<typeof userSchema>;