import React, { useEffect } from "react";
import Navbar from "./customers/components/navigation/Navbar";
import Home from "./pages/home/Home";
import Footer from "./customers/components/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Product from "./customers/components/Product/Product";
import ProductDetails from "./customers/components/ProductDetails/ProductDetails";
import Cart from "./customers/components/Cart/Cart";
import Checkout from "./customers/components/Checkout/Checkout";
import Orders from "./customers/components/Orders/Orders";
import OrderDetails from "./customers/components/Orders/OrderDetails";
import CustomerRouters from "./Routers/CustomerRouters";
import AdminRoutes from "./Routers/AdminRoutes";
import { useDispatch } from "react-redux";
import { getUser } from "./State/Auth/Action";
import ToastContainer from "./customers/components/Toast/ToastContainer";

const App = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     dispatch(getUser());
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/*" element={<CustomerRouters />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
