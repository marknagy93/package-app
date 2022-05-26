import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./pages/userlogin/Userlogin";
import AdminLogin from "./pages/adminlogin/Adminlogin";
import AdminSite from "./pages/adminsite/AdminSite";
import UserSite from "./pages/usersite/Usersite";
import Home from "./pages/home/Home";

function App() {

  return (
    <div className="Container">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/userlogin" element={<UserLogin/>}/>
              <Route path="/adminlogin" element={<AdminLogin/>}/>
              <Route path="/adminsite" element={<AdminSite/>}/>
              <Route path="/usersite" element={<UserSite/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
