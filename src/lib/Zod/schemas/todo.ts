import { z } from 'zod'

export const todoSchema = z.object({
  todo: z
    .string()
    .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
    .max(50, 'عنوان نباید بیشتر از ۵۰ کاراکتر باشد'),
})
