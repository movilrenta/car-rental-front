import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const formSchema = z.object({
  code: z.string().min(6,"El código de la reserva debe tener al menos 6 caracteres").trim(),
})

export const resolver = zodResolver(formSchema);
export type FormMiReserva = z.infer<typeof formSchema>;