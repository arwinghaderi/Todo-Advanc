import z from 'zod'
import { loginSchema } from '@/lib/Zod/schemas/login'

export type RegisterPayload = z.infer<typeof loginSchema>