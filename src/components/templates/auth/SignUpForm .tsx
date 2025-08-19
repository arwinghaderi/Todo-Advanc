'use client'

import Link from 'next/link'
import Input from '@/components/module/Input'
import Button from '@/components/module/Button'

export default function SignUpForm() {
  return (
    <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 text-white">
      <h1 className="text-3xl font-extrabold mb-6 text-center drop-shadow">
        ثبت نام در TodoMaster
      </h1>

      <form className="space-y-5">
        <Input
          id="username"
          type="text"
          label="نام کاربری"
          placeholder="erwin_dev"
        />

        <Input
          id="email"
          type="email"
          label="ایمیل"
          placeholder="you@example.com"
        />

        <Input
          id="password"
          type="password"
          label="رمز عبور"
          placeholder="••••••••"
        />

        <Button type="submit" text="ثبت‌نام" />
      </form>

      <p className="mt-6 text-center text-sm text-gray-200">
        قبلاً ثبت‌نام کردی؟{' '}
        <Link
          href="/auth/sign-in"
          className="text-yellow-300 font-semibold hover:underline"
        >
          وارد شو
        </Link>
      </p>
    </div>
  )
}
