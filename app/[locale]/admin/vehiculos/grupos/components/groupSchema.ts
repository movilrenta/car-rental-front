import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const groupSchema = z.object({
  id: z.coerce.number().optional(),
  name:z.string().optional(),
  description: z.string().optional(),
  rate: z.string().optional(),
  insurances: z.string().optional()
})

export const resolver = zodResolver(groupSchema)

export type GroupForm = z.infer<typeof groupSchema>