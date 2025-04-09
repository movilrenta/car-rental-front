import { z } from "zod";

export const RateFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Debe ser mayor a 0").trim(),
  description: z.string().trim().optional()
});