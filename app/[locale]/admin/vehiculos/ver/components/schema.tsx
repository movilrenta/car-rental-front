import { z } from "zod";
// ver que date_from sea menor que dato_to
export const VehycleFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Debe ser mayor a 0").trim(),
  brand_id: z.string().trim().optional(),
  group_id: z.string().trim().optional(),
  doors: z.coerce.number().min(1, "Debe ser mayor a 0"),
  seats: z.coerce.number().min(1, "Debe ser mayor a 0"),
  transmission: z.string().min(1, "Transmisión requerida").trim(),
  luggage: z.coerce.number().min(1, "Debe ser mayor a 0"),
  fuel_type: z.string().min(1, "Tipo de combustible requerido").trim(),
  vehicle_type: z.string().min(1, "Tipo de vehículo requerido").trim(),
  branch_id: z.string().trim(),
  image: z.string().trim(),
  description: z.string().trim().optional(),
  plate: z.string().trim().optional()
});