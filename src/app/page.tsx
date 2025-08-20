import Image from 'next/image'
import Navbar from '@/components/module/NavBar'
import Footer from '@/components/module/Footer'
import AboutSection from '@/components/module/AboutSection'
import FeaturesSection from '@/components/module/FeaturesSection'
import TypewriterText from '@/components/module/TypewriterText'
import { FaPlusCircle } from 'react-icons/fa'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <Navbar />

      <header
        id="hero"
        className="relative flex flex-col items-center justify-center flex-1 text-center px-6 py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Hero Background"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl">
            مدیریت کارها، ساده‌تر از همیشه
          </h1>

          <p className="text-lg md:text-xl mb-8 leading-relaxed drop-shadow font-medium">
            <TypewriterText />
          </p>
          <li className=" flex  items-center justify-center ">
            <Link
              href="/todo"
              className="flex items-center justify-around w-1/2 gap-2 bg-yellow-400 text-indigo-800  py-4 text-3xl  rounded-full hover:bg-yellow-300 transition   font-extrabold "
            >
              <div className=' flex items-center justify-center gap-x-4 '>
                <FaPlusCircle className=" w-7 h-8 " />
                ثبت تودو
              </div>
            </Link>
          </li>
        </div>
      </header>

      <section id="about" className="scroll-mt-32">
        <AboutSection />
      </section>

      <section id="features" className="scroll-mt-32">
        <FeaturesSection />
      </section>

      <Footer />
    </main>
  )
}
