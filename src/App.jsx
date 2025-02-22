import React from 'react';
import { ThemeProvider } from './Components/ThemeContext';
import LayOut from './Components/LayOut';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IncorrectURL from './Components/IncorrectURL';
import Header from './Components/Header';
import EachCountryInformation from './Components/EachCoutryInformation';
const App = () => {
  return (
    <ThemeProvider>
        {/* <LayOut/> */}
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayOut />}/>
            <Route path="country/:name" element={<EachCountryInformation />} />
            <Route path='*' element={<IncorrectURL />}/>
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
