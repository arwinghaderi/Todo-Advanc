import Image from 'next/image'
import Navbar from '@/components/module/NavBar'
import Footer from '@/components/module/Footer'
import AboutSection from '@/components/module/AboutSection'
import FeaturesSection from '@/components/module/FeaturesSection'
import TypewriterText from '@/components/module/TypewriterText'

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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-white cursor-pointer text-indigo-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition w-full sm:w-auto">
              مشاهده نسخه‌ی دمو
            </button>
          </div>
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
