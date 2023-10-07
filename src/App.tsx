import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/customer/home/Home";
import About from "./pages/customer/about/About";
import SignIn from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "./App.css";
import NotFound from "./components/notFound";
import Blog from "./pages/blog";
import Collections from "./pages/customer/collections";
import DetailProduct from "./pages/customer/detailProduct";
import Foodter from "./components/foodter";
import Navbar from "./components/navbar";
import Cart from "./pages/customer/cart";
import ReceiveNotifyEmail from "./components/receiveNotifiEmail";
import ForgetPassword from "./pages/auth/ForgetPasswod";
import Box from "@mui/material/Box";
import Dashboard from "./pages/admin/dashbroad";
import SideBar from "./components/sideBar";
import ProductAdmin from "./pages/admin/productAdmin";
import Category from "./pages/admin/category";
import VerticalTabs from "./pages/customer/tabs";
import ChangePassword from "./pages/auth/ChangePassword";

function App() {
  const location = useLocation();
  const showReceiveNotifyEmail = location.pathname === "/";

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = storedUser && storedUser.currentUser?.data?.isAdmin;
  const checkRole = isAdmin || "";

  return (
    <Box sx={{ display: checkRole ? "flex" : "" }}>
      {checkRole ? <SideBar /> : <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/account/login" element={<SignIn />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/change-password" element={<ChangePassword />} />
          <Route path={"/forget-password"} element={<ForgetPassword />} />
          {checkRole ? (
            // admin page*
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product" element={<ProductAdmin />} />
              <Route path="/category" element={<Category />} />
            </>
          ) : (
            //customer page
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/collections/san-pham-moi" element={<Collections />} />
              <Route path="/collections/sale" element={<Collections />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/product/:id" element={<DetailProduct />} />
              <Route path={"/shipping-policy"} element={<VerticalTabs />} />
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
