import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./components/about/About";
import SignIn from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "./App.css";
import NotFound from "./components/notFound";
import Blog from "./pages/blog";
import Collections from "./pages/collections";
import DetailProduct from "./pages/detailProduct";
import Foodter from "./components/foodter";
import Navbar from "./components/navbar";
import Cart from "./pages/cart";

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account/login" element={<SignIn />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/collections/san-pham-moi" element={<Collections api={"san pham moi"} />} />
          <Route path="/collections/sale" element={<Collections api={"sale"} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product/:id" element={<DetailProduct />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </Suspense>
      <Foodter />
    </>
  );
}

export default App;
