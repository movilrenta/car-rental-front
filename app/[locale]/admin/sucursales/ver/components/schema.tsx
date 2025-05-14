import { z } from "zod";

export const BranchFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Debe ser mayor a 0").trim(),
  address_id: z.number(),
  distance_to_main_branch: z.coerce.number().min(0, "Debe ser mayor a cero")
});