import z from 'zod'
import { loginSchema } from '@/lib/Zod/schemas/login'
import { todoSchema } from '@/lib/Zod/schemas/todo'

export type RegisterPayload = z.infer<typeof loginSchema>
export type TodoPayload = z.infer<typeof todoSchema>
