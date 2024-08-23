import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email()
})

export type SignInForm = z.infer<typeof signInSchema>