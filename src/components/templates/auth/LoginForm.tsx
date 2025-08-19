'use client'

import Link from 'next/link'

export default function LoginForm() {
  return (
    <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 text-white">
      <h1 className="text-3xl font-extrabold mb-6 text-center drop-shadow">
        ورود به TodoMaster
      </h1>

      <form className="space-y-5">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            رمز عبور
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg font-semibold text-white shadow-md"
        >
          ورود
        </button>
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
