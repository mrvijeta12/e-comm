import React, { useEffect, useMemo } from "react";
import achievment from "../../../assets/achievment.png";
import { getAllOrder } from "../../../State/Admin/AdminOrder/AdminOrderAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AchievementCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrder());
  }, []);

  const allOrders = useSelector((state) => state.adminOrders);
  // console.log("all order:", allOrders);

  const total = useMemo(() => {
    return allOrders.orders?.reduce(
      (acc, curr) => acc + curr.totalDiscountedPrice,
      0,
    );
  }, [allOrders]);

  const formatted = total > 1000 ? (total / 1000).toFixed(3) + "k" : total;

  return (
    <div className="flex flex-col w-full h-full bg-[#111F35] text-white p-4 shadow-md rounded-md">
      <div className="mb-4">
        <h3 className=" text-xl">Shop With Trend</h3>
        <h4 className="text-sm font-semibold">Congratulations</h4>
      </div>
      <div className="flex justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl text-violet-500">{formatted}</h3>
          <button
            className="bg-violet-500 p-1.5 text-white rounded-md text-sm"
            onClick={() => navigate("/admin/orders")}
          >
            View Sales
          </button>
        </div>
        <div>
          <img src={achievment} alt={achievment} className="w-20 h-20 " />
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
