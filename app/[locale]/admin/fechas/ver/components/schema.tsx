import { z } from "zod";

export const FechaFormSchema = z.object({
  id: z.number().optional(),
  reason: z.string().trim(),
  multiplier: z.coerce.number(),
  start_date: z.string().trim(),
  end_date: z.string().trim(),
});
