import { z } from "zod";

export const ImageFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().trim().min(1, "Debe ingresar un dato"),
  location: z.string().trim().min(1, "Debe ingresar un dato"),
  title: z.string().trim(),
  description: z.string().trim(),
  link:z.string().trim().optional(),
  order: z.coerce.number(),
  image: z.any().optional().refine((file) => {
    if (!file || file.length === 0) return true; // Si no hay imagen, es válido (para edición)
    return (
      file[0] instanceof File &&
      file[0]?.size < 5 * 1920 * 1920 &&
      ["image/jpeg", "image/png", "image/webp"].includes(file[0]?.type)
    );
  }, "Debe ser un archivo válido menor a 5MB y en formato JPEG, PNG o WebP"),
});
