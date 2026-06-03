import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import CartItems from "../Cart/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrderById } from "../../../State/Order/orderAction";
import { createPayment } from "../../../State/Admin/AdminPayment/AdminPaymentAction";
import OrderDetailCard from "../Orders/OrderDetailCard";
import Spinner from "../SpinnerLoader/Spinner";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("order_id");

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  function handleCheckout() {
    dispatch(createPayment(orderId));
  }

  const orders = useSelector((store) => store.orders);
  // console.log(orders);

  return (
    <div className="min-h-screen">
      {orders.isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-10">
          <div className="w-full">
            <AddressCard address={orders.order?.shippingAddress} />
          </div>

          <div className="grid grid-cols-3  relative gap-4">
            <div className="col-span-2">
              {orders?.order?.orderItems?.map((item) => (
                <OrderDetailCard item={item} key={item?._id} />
              ))}
            </div>
            <div className="col-span-1 bg-white shadow-md rounded-md mt-5 p-5 h-fit sticky top-0  mb-5">
              <h4 className="uppercase opacity-60 font-semibold text-md pb-2 ">
                Price details
              </h4>
              <hr className="text-gray-400" />
              <div className="flex justify-between font-semibold m-2 text-sm ">
                <h6>Price</h6>
                <h6 className=" text-green-500 line-through">
                  ${orders.order?.totalPrice}
                </h6>
              </div>
              <div className="flex justify-between font-semibold m-2 text-sm">
                <h6>Discounted Price</h6>
                <h6 className=" text-green-500">
                  {" "}
                  ${orders.order?.totalDiscountedPrice}
                </h6>
              </div>
              <div className="flex justify-between font-semibold m-2 text-sm">
                <h6>Quantity</h6>
                <h6 className=" text-green-500"> {orders.order?.totalItems}</h6>
              </div>
              <hr className="text-gray-400" />
              <div className="flex justify-between font-bold m-2 text-lg">
                <h2>Total amount</h2>
                <h6 className=" text-green-500">
                  $ {orders.order?.totalDiscountedPrice}
                </h6>
              </div>
              <button
                className=" cursor-pointer uppercase bg-violet-500 text-white w-full p-3 rounded-md font-bold"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
