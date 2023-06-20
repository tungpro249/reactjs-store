import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./components/About";
import SignIn from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "./App.css";
import NotFound from "./components/notFound";
import Blog from "./pages/blog";
import Collections from "./pages/collections";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account/login" element={<SignIn />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/collections/san-pham-moi" element={<Collections api={"san pham moi"} />} />
          <Route path="/collections/sale" element={<Collections api={"sale"} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
