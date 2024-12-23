import { z } from "zod";

export const AddressFormSchema = z.object({
  id: z.number().optional(),
  street: z.string().trim().min(1, { message: "La calle es requerida" }),
  city: z.string().trim().min(1, { message: "La ciudad es requerida" }),
  state: z.string().trim().min(1, { message: "El estado es requerido" }),
  postal_code: z.string().trim().min(1, { message: "El código postal es requerido" }),
  latitude: z.string().trim().min(1, { message: "La latitud es requerida" }),
  longitude: z.string().trim().min(1, { message: "La longitud es requerida" }),
});