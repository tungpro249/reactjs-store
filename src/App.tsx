import React, { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/base/home/Home";
import About from "./pages/base/about/About";
import SignIn from "./pages/base/auth/Login";
import Register from "./pages/base/auth/Register";
import "./App.css";
import NotFound from "./components/notFound";
import Blog from "./pages/base/blog";
import Collections from "./pages/base/collections";
import DetailProduct from "./pages/base/detailProduct";
import Foodter from "./components/foodter";
import Navbar from "./components/navbar";
import Cart from "./pages/base/cart";
import ReceiveNotifyEmail from "./components/receiveNotifiEmail";
import ForgetPassword from "./pages/base/auth/ForgetPasswod";
import Box from "@mui/material/Box";
import Dashboard from "./pages/admin/dashbroad";
import SideBar from "./components/sideBar";
import ProductAdmin from "./pages/admin/productAdmin";
import Category from "./pages/admin/category";
import VerticalTabs from "./pages/customer/tabs";
import ChangePassword from "./pages/base/auth/ChangePassword";
import Order from "./pages/admin/order";
import CheckoutForm from "./pages/base/checkoutForm";
import { loginSuccess, useAppController } from "./contexts/app";
import Information from "./pages/base/auth/Information";
import ResetPassword from "./pages/base/auth/ResetPassword";
import LoyalCustomer from "./pages/admin/loyalCustomer";
import OrderCustomer from "./pages/customer/order";

function App() {
  const location = useLocation();
  const showReceiveNotifyEmail = location.pathname === "/";

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = storedUser && storedUser.currentUser?.data?.isAdmin;
  const checkRole = isAdmin || "";

  const isResetPasswordPage = location.pathname === "/reset-password";

  // @ts-ignore
  const [userController, userDispatch] = useAppController();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      loginSuccess(userDispatch, JSON.parse(user));
    }
  }, [localStorage.getItem("user")]);

  return (
    <Box sx={{ display: checkRole ? "flex" : "" }}>
      {checkRole ? <SideBar /> : <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/account/login" element={<SignIn />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/change-password" element={<ChangePassword />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/customer" element={<LoyalCustomer />} />
          <Route
            path="/reset-password"
            element={isResetPasswordPage ? <ResetPassword /> : <NotFound />}
          />
          <Route path="/account/information" element={<Information />} />
          <Route path="/order" element={<Order />} />
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
              <Route path={"/account/my-order"} element={<OrderCustomer />} />
              {/*tab rows*/}
              <Route path="/shipping-policy" element={<VerticalTabs />} />
              <Route path="/payment-guide" element={<VerticalTabs />} />
              <Route path="/privacy-policy" element={<VerticalTabs />} />
              <Route path="/size-guide" element={<VerticalTabs />} />
              <Route path="/return-policy" element={<VerticalTabs />} />
              <Route path="/warranty-policy" element={<VerticalTabs />} />

              <Route path="/checkout-form" element={<CheckoutForm />} />
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
