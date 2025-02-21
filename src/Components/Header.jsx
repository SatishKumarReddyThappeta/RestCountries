import { IoMoonOutline } from "react-icons/io5";

const Header = ({toggleMode}) => {

  return (
      <header className={`w-screen flex h-[100px] justify-between items-center px-6 dark:bg-[#2b3743] dark:text-white shadow-lg dark:shadow-[#2b3743] md:px-24`}>
        <span className="text-xl font-bold dark:text-white md:text-3xl">Where in the world?</span>
       <div className="relative">
          <IoMoonOutline className="absolute top-[25%] left-[-20px] "/>
          <span className="text-sm cursor-pointer select-none md:text-[16px]" onClick={toggleMode}>Dark Mode</span>
        </div>
      </header>
  )
}

export default Header