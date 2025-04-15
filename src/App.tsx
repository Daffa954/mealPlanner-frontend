
import './App.css'
import {  Routes, Route, BrowserRouter } from "react-router-dom";

import { Home } from './pages/home';
import { AskAI } from './pages/askAi';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<AskAI />} />

      </Routes>
    </BrowserRouter>
   
  )
}

export default App
