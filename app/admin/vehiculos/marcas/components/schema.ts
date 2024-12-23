import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const brandSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
})

export const resolver = zodResolver(brandSchema)

export type BrandForm = z.infer<typeof brandSchema>