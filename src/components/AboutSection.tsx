import Image from 'next/image'
import {
  FaMobileAlt,
  FaShieldAlt,
  FaDatabase,
  FaCheckCircle,
} from 'react-icons/fa'

export default function AboutSection() {
  return (
    <section id="about" className="bg-white text-gray-800 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-right">
          <h3 className="text-4xl font-extrabold mb-6 text-indigo-700 leading-tight">
            چرا <span className="text-indigo-500">TodoMaster</span>؟
          </h3>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            TodoMaster فقط یه ابزار نیست—یه تجربه‌ی کامل برای مدیریت وظایف با
            سرعت، دقت و لذت.
          </p>
          <ul className="space-y-4 text-base text-gray-600">
            <li className="flex items-center justify-start gap-3">
              <FaMobileAlt className="text-indigo-500 text-xl" />
              <span>رابط کاربری سریع و واکنش‌گرا برای همه‌ی دستگاه‌ها</span>
            </li>
            <li className="flex items-center justify-start gap-3">
              <FaShieldAlt className="text-indigo-500 text-xl" />
              <span>اعتبارسنجی دقیق فرم‌ها با Zod برای جلوگیری از خطا</span>
            </li>
            <li className="flex items-center justify-start gap-3">
              <FaDatabase className="text-indigo-500 text-xl" />
              <span>ذخیره‌سازی امن اطلاعات با Redux و localStorage</span>
            </li>
            <li className="flex items-center justify-start gap-3">
              <FaCheckCircle className="text-indigo-500 text-xl" />
              <span>تمرکز روی انجام کارها، نه درگیری با فرم‌ها</span>
            </li>
          </ul>
        </div>

        <div className="w-full aspect-[3/2] relative rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/task-illustration.jpg"
            alt="Todo List Illustration"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  )
}
