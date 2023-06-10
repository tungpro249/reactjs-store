import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./components/About";
import SignIn from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
      <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<SignIn/>} />
          <Route path="/register" element={<Register/>} />
      </Routes>
      </>
  );
}

export default App;
