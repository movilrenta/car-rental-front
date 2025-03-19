import { z } from "zod";

export const FechaFormSchema = z.object({
  id: z.number().optional(),
  reason: z.string().trim(),
  multiplier: z.coerce.number().min(0, "No puede ser un numero negativo"),
  start_date: z.string().trim()
});