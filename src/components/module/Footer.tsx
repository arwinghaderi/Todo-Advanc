'use client'

import Link from 'next/link'
import {
  FaGithub,
  FaLinkedin,
  FaTelegramPlane,
  FaTwitter,
  FaInstagram,
  FaStore,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">
            ساخته شده با ❤️ توسط آروین قادری (توسعه‌دهنده فرانت‌اند - Next.js)
          </h2>
          <p className="text-sm text-gray-300">
            © 2025 TodoMaster. همه حقوق محفوظ است.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-sm font-semibold text-gray-200">
            سوشال‌ مدیای من
          </span>
          <div className="flex items-center gap-6 text-2xl">
            <Link
              href="https://github.com/arwinghaderi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-transform transform hover:scale-125"
              title="GitHub"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://www.linkedin.com/in/arvinghaderi/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-transform transform hover:scale-125"
              title="LinkedIn"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://t.me/arvin81"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-transform transform hover:scale-125"
              title="Telegram"
            >
              <FaTelegramPlane />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
