import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string()
})

export type SignUpForm = z.infer<typeof signUpSchema>