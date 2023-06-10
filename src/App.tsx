import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./components/About";
import SignIn from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/account/login" element={<SignIn />} />
        <Route path="/account/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
