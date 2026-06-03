import React, { useEffect } from "react";
import CartItems from "./CartItems";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeCartItem } from "../../../State/Cart/cartAction";
import Spinner from "../SpinnerLoader/Spinner";

const Cart = () => {
  useEffect(() => {
    document.title = "Zentric | Cart";
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);

  const cart = useSelector((store) => store.cart);
  // console.log(cart);

  useEffect(() => {
    dispatch(getCart());
  }, [cart.deletedCartItem, cart.updatedCartItems]);

  return (
    <div className="min-h-screen">
      {cart.isLoading ? (
        <Spinner />
      ) : (
        <div style={{ marginTop: "64px" }}>
          <div className="grid grid-cols-3  relative">
            <div className="col-span-2 ">
              {cart?.cart?.cartItems?.length > 0 ? (
                cart?.cart?.cartItems.map((item) => (
                  <CartItems key={item?._id} item={item} />
                ))
              ) : (
                <div className="flex justify-center items-center h-full w-full">
                  <h1 className="font-bold opacity-60 text-xl">
                    No items found in the cart.
                  </h1>
                </div>
              )}
            </div>
            <div className="col-span-1 bg-white shadow-md rounded-md mt-5 p-5 h-fit sticky top-0  mb-5">
              <h4 className="uppercase opacity-60 font-semibold text-md pb-2 ">
                Price details
              </h4>
              <hr className="text-gray-400" />
              <div className="flex justify-between font-semibold m-2 text-sm ">
                <h6>Price</h6>
                <h6 className=" text-green-500 line-through">
                  {" "}
                  ${cart?.cart?.totalPrice}
                </h6>
              </div>
              <div className="flex justify-between font-semibold m-2 text-sm">
                <h6>Discount</h6>
                <h6 className=" text-green-500">${cart?.cart?.discount}</h6>
              </div>
              <div className="flex justify-between font-semibold m-2 text-sm">
                <h6>Delivery</h6>
                <h6 className=" text-green-500">Free</h6>
              </div>
              <hr className="text-gray-400" />
              <div className="flex justify-between font-bold m-2 text-lg">
                <h2>Total amount</h2>
                <h6 className=" text-green-500">
                  ${cart?.cart?.totalDiscountedPrice}
                </h6>
              </div>
              <button
                className="uppercase bg-violet-500 text-white w-full p-3 rounded-md font-bold "
                onClick={() => navigate("/checkout")}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
