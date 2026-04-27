import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(6, 'Senha inválida'),
})

export type LoginFormData = z.infer<typeof loginSchema>