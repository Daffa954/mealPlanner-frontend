
import './App.css'
import {  Routes, Route, BrowserRouter } from "react-router-dom";

import { Home } from './pages/home';
import { AskAI } from './pages/askAi';
import { Login } from './pages/login';
import { UserViews } from './pages/userViews';
import { Register } from './pages/register';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<AskAI />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userViews" element={<UserViews />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
