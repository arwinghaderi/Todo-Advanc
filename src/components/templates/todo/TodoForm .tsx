import { FaPlusCircle } from 'react-icons/fa'
import Input from '../../module/Input'
import CustomSelect from './CustomSelect'

export default function Form() {
  return (
    <form className="flex flex-col md:flex-row items-center justify-center gap-4 px-4 w-full">
      <div className="w-full md:w-[20rem]">
        <Input placeholder="«افزودن مورد جدید به لیست…»" />
      </div>

      <button
        type="submit"
        className="bg-white text-yellow-400 hover:bg-yellow-400 hover:text-white transition-all px-2 py-2 rounded-full flex items-center justify-evenly gap-2 w-full md:w-[10rem]"
        disabled
      >
        <FaPlusCircle className=" w-6 h-6 pointer-events-none" />
        <span className="text-xl font-bold ">افزودن</span>
      </button>

      <CustomSelect />
    </form>
  )
}
