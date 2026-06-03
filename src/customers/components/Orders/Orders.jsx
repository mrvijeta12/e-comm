import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrdersCard from "./OrdersCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "../../../State/Order/orderAction";
import Spinner from "../SpinnerLoader/Spinner";

const OrderSatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirm", value: "CONFIRMED" },
  { label: "Ship", value: "SHIPPED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const Orders = () => {
  const [category, setCategory] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrderHistory());
  }, [dispatch]);

  const orders = useSelector((state) => state.orders);
  const userOrder = orders.userOrders;
  const handleCategory = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategory((prev) => [...prev, value]);
    } else {
      setCategory((prev) => prev.filter((v) => v !== value));
    }
  };

  const filterOrders =
    category.length === 0
      ? userOrder
      : userOrder.filter((order) => category.includes(order.orderStatus));

  return (
    <div className="min-h-screen">
      {orders.isLoading ? (
        <Spinner />
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  mt-24">
          <div className="grid grid-cols-4 space-x-4 relative ">
            <div className="grid-cols-1 shadow-md rounded-md bg-white p-2 sticky top-24 h-fit">
              <h1 className="uppercase mb-5 font-semibold ">filters</h1>
              <div>
                {OrderSatus.map((item) => (
                  <div key={item.label} className="space-x-4 mb-2">
                    <input
                      type="checkbox"
                      name={item.value}
                      value={item.value}
                      onChange={handleCategory}
                      checked={category.includes(item.value)}
                    />
                    <label htmlFor={item.label}>{item.label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-3  bg-white  w-full space-y-4 ">
              {filterOrders?.length > 0 ? (
                filterOrders?.map((item) => (
                  <OrdersCard data={item} key={item._id} />
                ))
              ) : (
                <div className="flex justify-center items-center h-full w-full">
                  <h1 className="font-bold opacity-60 text-xl">
                    No items found.
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
