import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const formSchema = z.object({
  code: z.string().min(9,"El código de la reserva debe tener al menos 9 caracteres").trim(),
})

export const resolver = zodResolver(formSchema);
export type FormMiReserva = z.infer<typeof formSchema>;