import { IoMoonOutline } from "react-icons/io5";
import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";
const Header = () => {
const {dark, toggleTheme} = useContext(ThemeContext)
  return (
      <header className={`flex h-[100px] justify-between items-center px-6 dark:bg-[#2b3743] dark:text-white shadow-lg dark:shadow-[#2b3743] md:px-24`}>
        <span className="text-xl font-bold dark:text-white md:text-3xl">Where in the world?</span>
        <section className="relative">
          <IoMoonOutline className="absolute top-[25%] left-[-20px] "/>
          <span className="text-sm cursor-pointer select-none md:text-[16px]" onClick={toggleTheme}>Dark Mode</span>
        </section>
      </header>
  )
}

export default Header