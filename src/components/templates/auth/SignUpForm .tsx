// 'use client'

// import React from 'react'
// import Link from 'next/link'
// import Input from '@/components/module/Input'
// import Button from '@/components/module/Button'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { RegisterPayload } from '@/lib/Zod/login'
// import { registerSchema } from '@/lib/Zod/schemas/login'
// import { useDispatch } from 'react-redux'
// import { AppDispatch } from '@/Redux/store'
// import { userRegister } from '@/Redux/stores/user'
// import { useMutation } from '@tanstack/react-query'
// import { useRouter } from 'next/navigation'
// import ToastNotification from '@/lib/toastify/toastify'

// export default function SignUpForm() {
//   const dispatch = useDispatch<AppDispatch>()
//   const router = useRouter()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterPayload>({
//     resolver: zodResolver(registerSchema),
//     mode: 'onSubmit',
//   })

//   const mutation = useMutation({
//     mutationFn: async (payload: RegisterPayload) => {
//       console.log(payload)
//       try {
//         const result = await dispatch(userRegister(payload))
//         return result
//       } catch (err) {
//         console.log('🔥 Catch error:', err)
//         throw err
//       }
//     },
//     onSuccess: () => {
//       console.log('✅ ثبت‌ نام موفق')
//       ToastNotification(
//         'success',
//         'ثبت‌نام با موفقیت انجام شد! در حال هدایت به صفحه ورود...',
//         5000
//       )
//       router.push('/auth/sign-in')
//     },
//     onError: (err: any) => {
//       console.log('❌ خطا در ثبت‌نام:', err)
//       ToastNotification(
//         'error',
//         err?.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.',
//         5000
//       )
//     },
//   })

//   const onSubmit = async (data: RegisterPayload) => {
//     console.log('📨 فرم ارسال شد:', data)
//     try {
//       const result = await dispatch(userRegister(data)).unwrap()
//       console.log('✅ نتیجه ثبت‌نام:', result)
//       router.push('/auth/sign-in')
//     } catch (err) {
//       console.log('❌ خطا در dispatch:', err)
//     }
//   }

//   return (
//     <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 text-white">
//       <h1 className="text-3xl font-extrabold mb-6 text-center drop-shadow">
//         ثبت نام در TodoMaster
//       </h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//         <Input
//           id="username"
//           type="text"
//           label="نام کاربری"
//           placeholder="آروین قادری"
//           {...register('username')}
//           error={errors.username?.message}
//           disabled={mutation.isPending}
//         />

//         <Input
//           id="email"
//           type="email"
//           label="ایمیل"
//           placeholder="you@example.com"
//           {...register('email')}
//           error={errors.email?.message}
//           disabled={mutation.isPending}
//         />

//         <Input
//           id="password"
//           type="password"
//           label="رمز عبور"
//           placeholder="••••••••"
//           {...register('password')}
//           error={errors.password?.message}
//           disabled={mutation.isPending}
//         />

//         {mutation.error && (
//           <p className="text-red-500 text-sm text-center font-medium">
//             {(mutation.error as any)?.message || 'خطا در ثبت‌نام'}
//           </p>
//         )}

//         <Button
//           type="submit"
//           text="ثبت‌نام"
//           loading={mutation.isPending}
//           disabled={mutation.isPending}
//           className="mt-4"
//         />
//       </form>

//       <p className="mt-6 text-center text-sm text-gray-200">
//         قبلاً ثبت‌نام کردی؟{' '}
//         <Link
//           href="/auth/sign-in"
//           className="text-yellow-300 font-semibold hover:underline"
//         >
//           وارد شو
//         </Link>
//       </p>
//     </div>
//   )
// }
