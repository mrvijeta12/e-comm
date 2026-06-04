import React from "react";
import Navbar from "../customers/components/navigation/Navbar";

import Product from "../customers/components/Product/Product";
import ProductDetails from "../customers/components/ProductDetails/ProductDetails";
import Cart from "../customers/components/Cart/Cart";
import Checkout from "../customers/components/Checkout/Checkout";
import Orders from "../customers/components/Orders/Orders";
import OrderDetails from "../customers/components/Orders/OrderDetails";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../customers/components/Footer/Footer";
import Home from "../pages/home/Home";
import Login from "../customers/components/Auth/Login";
import Register from "../customers/components/Auth/Register";
import AuthModel from "../customers/components/Auth/AuthModel";
import PaymentSuccess from "../customers/components/Payment/PaymentSuccess";
import Toast from "../customers/components/Toast/Toast";

const CustomerRouters = () => {
  const location = useLocation();
  const state = location.state;

  return (
    <div>
      <Navbar />
      {/* <Toast /> */}

      {/* Main routes */}
      <Routes location={state?.background || location}>
        {/* <Route path="/toast" element={<Toast />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/:category/:section/:item" element={<Product />} />
        <Route
          path="/product-detail/:product_id"
          element={<ProductDetails />}
        />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<Orders />} />
        <Route path="order-details/:orderId" element={<OrderDetails />} />
        <Route path="/payment/:orderId" element={<PaymentSuccess />} />
      </Routes>

      {/* Modal routes */}
      {state?.background &&
        (location.pathname === "/login" ||
          location.pathname === "/register" ||
          location.pathname.startsWith("/address/edit/")) && (
          <Routes>
            <Route path="/login" element={<AuthModel />} />
            <Route path="/register" element={<AuthModel />} />
            <Route path="/address/edit/:addressId" element={<AuthModel />} />
          </Routes>
        )}

      <Footer />
    </div>
  );
};
export default CustomerRouters;
