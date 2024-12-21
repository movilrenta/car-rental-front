import { z } from "zod";
// ver que date_from sea menor que dato_to
export const VehycleFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Debe ser mayor a 0"),
  brand_id: z.string().optional(),
  group_id: z.string().optional(),
  doors: z.coerce.number().min(1, "Debe ser mayor a 0"),
  seats: z.coerce.number().min(1, "Debe ser mayor a 0"),
  transmission: z.string().min(1, "Transmisión requerida"),
  luggage: z.coerce.number().min(1, "Debe ser mayor a 0"),
  fuel_type: z.string().min(1, "Tipo de combustible requerido"),
  branch_id: z.string(),
  image: z.string().optional(),
  description: z.string().optional()
});