import React from "react";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderDetailCard from "../../../customers/components/Orders/OrderDetailCard";
import { getOrderById } from "../../../State/Order/orderAction";
import AddressCard from "../../../customers/components/AddressCard/AddressCard";
import { getAdminOrderById } from "../../../State/Admin/AdminOrder/AdminOrderAction";
import Spinner from "../../../customers/components/SpinnerLoader/Spinner";

const AdminOrderdetail = () => {
  //   console.log("AdminOrderdetail rendered");
  const dispatch = useDispatch();
  const { orderId } = useParams();
  //   console.log(orderId);

  useEffect(() => {
    dispatch(getAdminOrderById(orderId));
  }, [orderId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [orderId]);

  const adminOrders = useSelector((store) => store.adminOrders);
  // console.log("admin orders", adminOrders);

  return (
    <div className="min-h-screen">
      {adminOrders.isLoading ? (
        <Spinner />
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  mt-10 space-y-8">
          <div className="w-full">
            {/* <h1 className="mb-5 font-bold"> Delivery Address</h1> */}
            <AddressCard address={adminOrders.order?.shippingAddress} />
          </div>

          <div className="space-y-4">
            {adminOrders.order?.orderItems.map((data) => (
              <OrderDetailCard key={data?._id} item={data} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderdetail;
