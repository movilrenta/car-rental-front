import { z } from "zod";

export const BranchFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Debe ser mayor a 0").trim(),
  address_id: z.string().trim().optional()
});