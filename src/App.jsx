import React from 'react'
import { useState } from "react"
import Header from './Components/Header'
import HomePage from './Components/HomePage';


const App = () => {
  const [dark, setDark] = useState(false);

  const toggleMode =()=>{
    setDark(!dark)
    document.body.classList.toggle('dark')
  }

  return (
    <div className='min-h-screen dark:bg-black overflow-hidden'>
      <Header toggleMode={toggleMode}/>
      <HomePage />
    </div>
  )
}

export default App
