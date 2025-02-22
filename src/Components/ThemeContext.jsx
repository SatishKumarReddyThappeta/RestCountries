import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [countriesData,setCountriesData] = useState([]);

  useEffect(() => {
    const prefersDark = JSON.parse(localStorage.getItem("dark"));
    if (prefersDark) {
      setDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDark((prevDark) => {
      const newTheme = !prevDark;
      localStorage.setItem("dark", JSON.stringify(newTheme));
      if (newTheme) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      return newTheme;
    });
  };

  const fetchData = async()=>{
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    // console.log(data);
    setCountriesData(data);
 };

    useEffect(()=>{
    fetchData();
    },[]);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme, countriesData }}>
      {children}
    </ThemeContext.Provider>
  );
};