import { FaUserCircle, FaTasks } from 'react-icons/fa'

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3 text-2xl font-extrabold tracking-tight hover:text-indigo-200 transition"
        >
          <FaTasks className="text-white text-3xl" />
          TodoMaster
        </a>

        <div className="hidden md:flex items-center gap-10">
          <a
            href="#about"
            className="hover:text-indigo-200 transition font-medium text-lg"
          >
            درباره‌ی اپلیکیشن
          </a>
          <a
            href="#features"
            className="hover:text-indigo-200 transition font-medium text-lg"
          >
            امکانات کلیدی
          </a>
          <button className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-gray-100 transition font-semibold text-sm">
            <FaUserCircle className="text-xl" />
            ورود / ثبت‌نام
          </button>
        </div>

        {/* منوی موبایل */}
        <div className="md:hidden">
          <button className="text-white hover:text-indigo-300 transition text-2xl">
            ☰
          </button>
        </div>
      </div>
    </nav>
  )
}
