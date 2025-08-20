import Link from 'next/link'

export default function Header() {
  return (
    <div className=" flex items-center justify-center  gap-8">
      <header className="text-5xl font-extrabold text-white text-center py-8">
        لیست برنامه های شما
      </header>
      <Link
        href={'/'}
        className=" border-2 border-indigo-600 rounded-lg    hover:border-yellow-600  hover:bg-yellow-300  hover:text-black duration-300 transition-all  p-2 "
      >
        <span className=' font-bold '> بازگشت به خانه</span>
      </Link>
    </div>
  )
}
