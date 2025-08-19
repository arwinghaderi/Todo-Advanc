import {
  FaShieldAlt,
  FaLock,
  FaExclamationTriangle,
  FaMobileAlt,
} from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaShieldAlt className="text-indigo-500 text-4xl mb-4" />,
      title: 'اعتبارسنجی دقیق',
      desc: 'با Zod فرم‌هات رو امن و قابل اعتماد کن.',
    },
    {
      icon: <FaLock className="text-indigo-500 text-4xl mb-4" />,
      title: 'ذخیره‌سازی امن',
      desc: 'اطلاعات با Redux و localStorage محافظت می‌شن.',
    },
    {
      icon: <FaExclamationTriangle className="text-indigo-500 text-4xl mb-4" />,
      title: 'خطاهای واضح',
      desc: 'پیام‌های خطا دقیق و قابل فهم هستن.',
    },
    {
      icon: <FaMobileAlt className="text-indigo-500 text-4xl mb-4" />,
      title: 'طراحی واکنش‌گرا',
      desc: 'ظاهر عالی در موبایل و دسکتاپ.',
    },
  ]

  return (
    <section id="features" className="bg-gray-100 py-12 px-6">
      <h3 className="text-3xl font-bold mb-10 text-center text-indigo-700">
        ویژگی‌ها
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={uuidv4()}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300"
          >
            {feature.icon}
            <h4 className="text-xl font-bold mb-2 text-indigo-600">
              {feature.title}
            </h4>
            <p className="text-gray-700">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
