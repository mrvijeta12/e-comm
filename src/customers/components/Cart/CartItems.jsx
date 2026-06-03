import { IconButton, Rating } from "@mui/material";
import React, { useEffect } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeCartItem,
  updateCartItem,
} from "../../../State/Cart/cartAction";

const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  async function handelCartItemRemove(id) {
    dispatch(removeCartItem(id));
  }

  const handelQuantityInc = async (item) => {
    const data = {
      cartItemId: item?._id,
      updatedData: {
        quantity: item?.quantity + 1,
      },
    };

    dispatch(updateCartItem(data));
  };
  const handelQuantityDec = async (item) => {
    if (item?.quantity <= 1) return;
    const data = {
      cartItemId: item?._id,
      updatedData: {
        quantity: item?.quantity - 1,
      },
    };
    await dispatch(updateCartItem(data));
  };

  return (
    <div className="p-5  mt-5">
      <div className="flex flex-col    items-center bg-white shadow-md rounded-md p-2">
        <div className="w-full flex">
          <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
            <img
              src={item?.product?.imageUrl}
              alt={item?.product?.imageUrl}
              className="w-full h-full object-cover object-top rounded-md"
            />
          </div>
          <div className="ml-5 space-y-1.5">
            <p className="font-semibold">{item?.product?.title}</p>
            <p className="opacity-60">{item?.size}</p>
            <p className="opacity-60 mt-2">{item?.product?.color}</p>
            <div className="flex space-x-5 items-center text:lg text-gray-900 ">
              <p className="font-semibold">${item?.product?.discountedPrice}</p>
              <p className="opacity-60 line-through">${item?.product?.price}</p>
              <p className="font-semibold text-green-400">
                ${item?.product?.discountedPercent}% Off
              </p>
            </div>
            <div className="flex space-x-3">
              <div>
                <Rating
                  name="half-rating-read"
                  defaultValue={4.5}
                  precision={0.5}
                  readOnly
                />
              </div>
              <p>24500 Ratings</p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center  items-center mt-3">
          <div className="flex space-x-2 items-center mr-8">
            <IconButton
              onClick={() => handelQuantityDec(item)}
              disabled={item?.quantity <= 1}
            >
              <RemoveCircleOutlineIcon
                className={`${item?.quantity <= 1 ? "text-gray-400" : "text-violet-500 cursor-pointer"}`}
              />
            </IconButton>
            <span className="py-1 px-5 rounded-md bg-gray-100">
              {item?.quantity}
            </span>

            <IconButton onClick={() => handelQuantityInc(item)}>
              <AddCircleOutlineIcon className="cursor-pointer  text-violet-500" />
            </IconButton>
          </div>
          <div>
            <button
              className="cursor-pointer  text-violet-500"
              onClick={() => handelCartItemRemove(item?._id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
