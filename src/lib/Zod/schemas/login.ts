import { z } from 'zod'
export const loginSchema = z.object({
  username: z.string().min(3, 'نام کاربری باید حداقل ۳ حرف باشد'),
  password: z.string().min(1, 'رمز عبور نمی‌تواند خالی باشد'),
})