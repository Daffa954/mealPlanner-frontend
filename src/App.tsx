
import './App.css'
import {  Routes, Route, BrowserRouter } from "react-router-dom";

import { Home } from './pages/home';
import { AskAI } from './pages/askAi';
import { Login } from './pages/login';
import { UserView } from './pages/userView';
import { Register } from './pages/register';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<AskAI />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userView" element={<UserView />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
