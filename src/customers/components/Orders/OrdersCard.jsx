import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../../../State/Cart/cartAction";

const OrdersCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/order-details/${data._id}`)}>
      <div className="p-5 mt-5">
        <div className="bg-white shadow-md rounded-md p-4 ">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Image Section */}
            <div className="col-span-3 flex items-center">
              <div className="w-[5rem] h-[5rem]">
                <img
                  src={data?.orderItems[0]?.product?.imageUrl}
                  alt=""
                  className="w-full h-full object-cover object-top rounded-md"
                />
              </div>

              {data?.orderItems?.length > 1 && (
                <span className="ml-2 font-bold text-lg">
                  +{data?.orderItems?.length - 1}
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="col-span-4">
              <p className="font-semibold line-clamp-2">
                {data?.orderItems[0]?.product?.title}
              </p>

              <p className="text-sm opacity-60 mt-1">
                Size: {data?.orderItems[0]?.size}
              </p>

              <p className="text-sm opacity-60">
                Color: {data?.orderItems[0]?.product?.color}
              </p>
            </div>

            {/* Price */}
            <div className="col-span-2">
              <p className="font-semibold text-lg">
                ₹{data?.orderItems[0]?.discountedPrice}
              </p>
            </div>

            {/* Delivery Status */}
            <div className="col-span-3">
              <div className="flex items-start gap-2">
                <AdjustIcon className="text-green-500 mt-1" fontSize="small" />
                <div>
                  <p className="font-medium">{data?.orderStatus}</p>
                  {/* <p className="text-sm opacity-60">
                    Your item has been delivered.
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;
