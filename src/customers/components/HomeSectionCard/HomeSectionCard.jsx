import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white cursor-pointer flex flex-col overflow-hidden rounded-lg shadow-lg w-full  max-w-[15rem] mx-auto sm:mx-3 items-center"
      onClick={() => navigate(`/product-detail/${item._id}`)}
    >
      <div className="h-[13rem] w-[10rem] ">
        <img
          className="object-cover object-top w-full h-full"
          src={item?.imageUrl || item?.image}
          alt=""
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{item?.brand}</h3>
        <p className="text-sm text-gray-500">{item?.title}</p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
