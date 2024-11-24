import "./App.css";

import React, { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { loginSuccess, useAppController } from "./contexts/app";
import StoreLocation from "pages/base/store-location";

const About = React.lazy(() => import("./pages/base/about/About"));
const Blog = React.lazy(() => import("./pages/base/blog"));
const Box = React.lazy(() => import("@mui/material/Box"));
const Cart = React.lazy(() => import("./pages/base/cart"));
const Category = React.lazy(() => import("./pages/admin/category"));
const ChangePassword = React.lazy(() => import("./pages/base/auth/ChangePassword"));
const CheckoutForm = React.lazy(() => import("./pages/base/checkoutForm"));
const Collections = React.lazy(() => import("./pages/base/collections"));
const Dashboard = React.lazy(() => import("./pages/admin/dashbroad"));
const DetailProduct = React.lazy(() => import("./pages/base/detailProduct"));
const Foodter = React.lazy(() => import("./components/foodter"));
const ForgetPassword = React.lazy(() => import("./pages/base/auth/ForgetPasswod"));
const Home = React.lazy(() => import("./pages/base/home/Home"));
const Information = React.lazy(() => import("./pages/base/auth/Information"));
const LoyalCustomer = React.lazy(() => import("./pages/admin/loyalCustomer"));
const Navbar = React.lazy(() => import("./components/navbar"));
const NotFound = React.lazy(() => import("./components/notFound"));
const Order = React.lazy(() => import("./pages/admin/order"));
const OrderCustomer = React.lazy(() => import("./pages/customer/order"));
const ProductAdmin = React.lazy(() => import("./pages/admin/productAdmin"));
const ReceiveNotifyEmail = React.lazy(() => import("./components/receiveNotifiEmail"));
const Register = React.lazy(() => import("./pages/base/auth/Register"));
const ResetPassword = React.lazy(() => import("./pages/base/auth/ResetPassword"));
const SideBar = React.lazy(() => import("./components/sideBar"));
const SignIn = React.lazy(() => import("./pages/base/auth/Login"));
const VerticalTabs = React.lazy(() => import("./pages/customer/tabs"));

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
  }, []);

  const AdminRoutes = () => (
    <>
      <Route path="/" element={<Dashboard />} />
      <Route path="/product" element={<ProductAdmin />} />
      <Route path="/category" element={<Category />} />
    </>
  );

  const CustomerRoutes = () => (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/collections/san-pham-moi" element={<Collections />} />
      <Route path="/collections/sale" element={<Collections />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/account/my-order" element={<OrderCustomer />} />
      <Route path="/shipping-policy" element={<VerticalTabs />} />
      <Route path="/payment-guide" element={<VerticalTabs />} />
      <Route path="/privacy-policy" element={<VerticalTabs />} />
      <Route path="/size-guide" element={<VerticalTabs />} />
      <Route path="/return-policy" element={<VerticalTabs />} />
      <Route path="/warranty-policy" element={<VerticalTabs />} />
      <Route path="/checkout-form" element={<CheckoutForm />} />
      <Route path="/showroom" element={<StoreLocation />} />
    </>
  );

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
          {checkRole ? AdminRoutes() : CustomerRoutes()}
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </Suspense>
      {showReceiveNotifyEmail && !checkRole && <ReceiveNotifyEmail />}
      {!checkRole && <Foodter />}
    </Box>
  );
}

export default App;
