'use client'

import Link from 'next/link'
import Input from '@/components/module/Input'
import Button from '@/components/module/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/Zod/schemas/login'
import { RegisterPayload } from '@/lib/Zod/types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/Redux/store'
import { userLogin } from '@/Redux/stores/user'
import { useMutation } from '@tanstack/react-query'
import ToastNotification from '@/lib/toastify/toastify'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>()
  // const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })

  const mutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      try {
        const result = await dispatch(userLogin(payload)).unwrap()
        return result
      } catch (err) {
        throw err
      }
    },
    onSuccess: (result) => {
      ToastNotification('success', `خوش آمدی ${result.username} 👋`, 5000)
      // router.push('/dashboard')
    },
    onError: (err: any) => {
      ToastNotification(
        'error',
        err?.message || 'ورود ناموفق بود. لطفاً دوباره تلاش کن.',
        5000
      )
    },
  })

  const onSubmit = (data: RegisterPayload) => {
    mutation.mutate(data)
  }

  return (
    <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 text-white">
      <h1 className="text-3xl font-extrabold mb-6 text-center drop-shadow">
        ورود به TodoMaster
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          id="username"
          type="text"
          label="نام کاربری"
          placeholder="emilys"
          {...register('username')}
          error={errors.username?.message}
          disabled={mutation.isPending}
        />
        <Input
          id="password"
          type="password"
          label="رمز عبور"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
          disabled={mutation.isPending}
        />

        {mutation.error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {(mutation.error as any)?.message || 'خطا در ورود'}
          </p>
        )}

        <Button
          type="submit"
          text="ورود"
          loading={mutation.isPending}
          disabled={mutation.isPending}
        />
      </form>

      <p className="mt-6 text-center text-sm text-gray-200">
        حساب کاربری نداری؟{' '}
        <Link
          href="/auth/sign-up"
          className="text-yellow-300 font-semibold hover:underline"
        >
          ثبت‌نام کن
        </Link>
      </p>
    </div>
  )
}
