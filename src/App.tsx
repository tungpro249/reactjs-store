import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import ReceiveNotifyEmail from "./components/receiveNotifiEmail";
import ForgetPassword from "./pages/auth/ForgetPasswod";
import Box from "@mui/material/Box";
import Dashboard from "./pages/dashbroad";
import SideBar from "./components/sideBar";
import ProductAdmin from "./pages/productAdmin";

function App() {
  const location = useLocation();
  const showReceiveNotifyEmail = location.pathname === "/";

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = storedUser && storedUser.currentUser?.data?.isAdmin;
  const checkRole = isAdmin || "";

  return (
    <Box sx={{ display: checkRole ? "flex" : "none" }}>
      {checkRole ? <SideBar /> : <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/account/login" element={<SignIn />} />
          <Route path="/account/register" element={<Register />} />
          <Route path={"/forget-password"} element={<ForgetPassword />} />
          {checkRole ? (
            // admin page*
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product" element={<ProductAdmin />} />
            </>
          ) : (
            //customer page
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/collections/san-pham-moi"
                element={<Collections api={"san pham moi"} />}
              />
              <Route path="/collections/sale" element={<Collections api={"sale"} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/product/:id" element={<DetailProduct />} />
            </>
          )}
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </Suspense>
      {showReceiveNotifyEmail && !checkRole && <ReceiveNotifyEmail />}
      {!checkRole && <Foodter />}
    </Box>
  );
}

export default App;
