import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/orderAction";
import { useNavigate } from "react-router-dom";

const DeliveryAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((store) => store);
  const auth = useSelector((store) => store.auth);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("streetAddress"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zipCode"),
      mobile: data.get("mobile"),
    };

    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  }

  return (
    <div className="grid grid-cols-3 bg-white  p-2 h-[25rem]">
      <div className="col-span-1 overflow-y-auto  space-y-2 w-full ">
        {auth.user?.address.map((item) => (
          <AddressCard key={item._id} address={item} />
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="col-span-2 bg-white p-5 space-y-3 overflow-y-auto 
      "
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <input
              type="text"
              name="firstName"
              id=""
              className="w-full p-2 border border-gray-300 rounded-md 
focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="First Name"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              name="lastName"
              id=""
              className="w-full p-2 border border-gray-300 rounded-md 
focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 ">
          <textarea
            type="text"
            name="streetAddress"
            id=""
            className="w-full p-2 border border-gray-300 rounded-md 
focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            placeholder="Address"
            rows={4}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <input
              type="text"
              name="city"
              id=""
              className="w-full p-2 border border-gray-300 rounded-md 
focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="City"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              name="state"
              id=""
              className="w-full p-2 border border-gray-300 rounded-md 
focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="State"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              name="zipCode"
              id=""
              className="w-full p-2 border border-gray-300 rounded-md 
focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Postal Code"
            />
          </div>{" "}
          <div className="col-span-1">
            <input
              type="number"
              name="mobile"
              id=""
              className="w-full p-2 border border-gray-300 rounded-md 
focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Phone No"
            />
          </div>
        </div>
        <button
          type="submit"
          className="uppercase bg-violet-500 text-white text-md font-bold p-3 rounded-md"
        >
          Deliver Here
        </button>
      </form>
    </div>
  );
};

export default DeliveryAddress;
