
import './App.css'
import {  Routes, Route, BrowserRouter } from "react-router-dom";

import { Home } from './pages/home';
import { AskAI } from './pages/askAi';
import { Login } from './pages/login';
import { UserViews } from './pages/userViews';
import { Register } from './pages/register';
// import { AskAI2 } from './pages/tesform';
import { AddChild } from './pages/addChild';
import { NotFound } from './pages/notFound';
import { ListChildView } from './pages/listChild';
import { ListScheduleView } from './pages/listSchedulle';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userViews" element={<UserViews />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/tesform" element={<AskAI2 />} /> */}
        <Route path="/addChild" element={<AddChild />} />
        <Route path="/listChild" element={<ListChildView />} />
        <Route path="/askAi/:childId" element={<AskAI />} />
        <Route path="/listSchedulle" element = {<ListScheduleView />}/>
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
