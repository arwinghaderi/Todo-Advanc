'use client'

import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* متن اصلی */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">ساخته شده با ❤️ توسط آروین قادری</h2>
          <p className="text-sm text-gray-300">
            © 2025 TodoMaster. همه حقوق محفوظ است.
          </p>
        </div>

        {/* آیکون‌های شبکه اجتماعی */}
        <div className="flex items-center gap-6 text-2xl">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-transform transform hover:scale-125"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-transform transform hover:scale-125"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-transform transform hover:scale-125"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  )
}
