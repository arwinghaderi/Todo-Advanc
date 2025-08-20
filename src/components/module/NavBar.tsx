'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  FaUserCircle,
  FaTasks,
  FaPlusCircle,
  FaSignOutAlt,
} from 'react-icons/fa'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/Redux/store'
import { userLogout } from '@/Redux/stores/user'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners'

const sections = ['hero', 'about', 'features']

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  const { user, isUserLoaded } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await dispatch(userLogout()).unwrap()
    },
    onSuccess: () => {
      router.push('/auth/sign-in')
    },
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 180)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showHighlight = activeSection !== 'hero'

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all ${
          scrolled
            ? 'bg-white shadow-md text-black'
            : 'bg-indigo-600 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-2xl font-extrabold tracking-tight hover:text-indigo-300 transition"
          >
            <FaTasks className="text-3xl" />
            TodoMaster
          </Link>

          <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
            <li>
              <a
                href="#about"
                className={`transition hover:text-indigo-300 ${
                  showHighlight && activeSection === 'about'
                    ? 'text-yellow-400 font-bold'
                    : ''
                }`}
              >
                درباره‌ی اپلیکیشن
              </a>
            </li>
            <li>
              <a
                href="#features"
                className={`transition hover:text-indigo-300 ${
                  showHighlight && activeSection === 'features'
                    ? 'text-yellow-400 font-bold'
                    : ''
                }`}
              >
                امکانات کلیدی
              </a>
            </li>
            <li>
              <Link
                href="/todo"
                className="flex items-center gap-2 bg-yellow-400 text-indigo-800 px-4 py-2 rounded-full hover:bg-yellow-300 transition font-semibold text-sm"
              >
                <FaPlusCircle className="text-xl" />
                ثبت تودو
              </Link>
            </li>
            {!isUserLoaded ? (
              <div className="flex items-center gap-2 px-4 py-2">
                <ClipLoader color="#6366f1" size={24} />
                <span className="text-sm text-white font-semibold">
                  در حال بررسی...
                </span>
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold text-sm">
                  <FaUserCircle className="text-xl" />
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition"
                >
                  <FaSignOutAlt className="text-xl" />
                  خروج
                </button>
              </div>
            ) : (
              <Link
                href="/auth/sign-in"
                className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-gray-100 transition font-semibold text-sm"
              >
                <FaUserCircle className="text-xl" />
                ورود / ثبت‌نام
              </Link>
            )}
          </ul>

          <button
            className="md:hidden text-2xl transition-transform duration-300 text-white hover:text-yellow-300"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span
              className={`inline-block transition-transform duration-300 ${
                isOpen ? 'rotate-90 scale-110' : 'rotate-0'
              }`}
            >
              {isOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 border-l-indigo-600 border-4 rounded-2xl bg-white z-[1000] shadow-lg transform transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          {user ? (
            <div className="flex flex-col gap-2 text-indigo-700 font-semibold text-sm">
              <div className="flex items-center gap-2">
                <FaUserCircle className="text-xl" />
                <span>{user.username}</span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false)
                  handleLogout()
                }}
                className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition"
              >
                <FaSignOutAlt className="text-xl" />
                خروج از حساب
              </button>
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition"
              onClick={() => setIsOpen(false)}
            >
              <FaUserCircle className="text-xl" />
              ورود / ثبت‌نام
            </Link>
          )}

          <IoCloseCircleOutline
            className="text-indigo-600 text-3xl cursor-pointer hover:text-indigo-800 transition"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <ul className="flex flex-col gap-6 px-6 py-6 text-lg font-semibold text-indigo-700">
          <li>
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className={`transition hover:text-primary ${
                showHighlight && activeSection === 'about'
                  ? 'text-primary font-bold'
                  : ''
              }`}
            >
              درباره‌ی اپلیکیشن
            </a>
          </li>
          <li>
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className={`transition hover:text-primary ${
                showHighlight && activeSection === 'features'
                  ? 'text-primary font-bold'
                  : ''
              }`}
            >
              امکانات کلیدی
            </a>
          </li>
          <li>
            <Link
              href="/todo"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 bg-yellow-400 text-indigo-800 px-3 py-2 rounded-full text-sm font-semibold hover:bg-yellow-300 transition"
            >
              <FaPlusCircle className="text-xl" />
              ثبت تودو
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
