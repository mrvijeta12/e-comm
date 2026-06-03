import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import Stepper from "@mui/material/Stepper";
import OrderTracking from "./OrderTracking";
import OrdersCard from "./OrdersCard";
import OrderDetailCard from "./OrderDetailCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/orderAction";
import Spinner from "../SpinnerLoader/Spinner";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const orders = useSelector((store) => store.orders);
  // console.log(orders);
  const stepMap = {
    PLACED: 0,
    CONFIRMED: 1,
    SHIPPED: 2,
    OUT_FOR_DELIVERY: 3,
    DELIVERED: 4,
  };

  const activeStep = stepMap[orders.order?.orderStatus] ?? 0;
  // console.log(activeStep);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [orderId]);

  return (
    <div className="min-h-screen">
      {orders.isLoading ? (
        <Spinner />
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  mt-10 space-y-8">
          <div className="w-full">
            <h1 className="mb-5 font-bold"> Delivery Address</h1>
            <AddressCard address={orders.order?.shippingAddress} />
          </div>
          <div className="shadow-md rounded-md bg-white px-2 py-6">
            <OrderTracking activeStep={activeStep} />
          </div>
          <div className="space-y-4">
            {orders.order?.orderItems.map((data) => (
              <OrderDetailCard key={data._id} item={data} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
