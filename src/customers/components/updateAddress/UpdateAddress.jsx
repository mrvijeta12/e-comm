import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/orderAction";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserAddress } from "../../../State/Auth/Action";
import { RESET_ADDRESS_UPDATE_SUCCESS } from "../../../State/Auth/ActionTypes";

const UpdateAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addressId } = useParams();
  const auth = useSelector((store) => store.auth);
  const addressUpdateSuccess = auth.addressUpdateSuccess;
  console.log(addressUpdateSuccess);

  useEffect(() => {
    if (addressUpdateSuccess) {
      dispatch({
        type: RESET_ADDRESS_UPDATE_SUCCESS,
      });
      navigate(-1);
    }
  }, [addressUpdateSuccess]);
  const address = auth.user?.address?.find((addr) => addr._id === addressId);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobile: "",
  });
  useEffect(() => {
    if (address) {
      setFormData({
        firstName: address.firstName || "",
        lastName: address.lastName || "",
        streetAddress: address.streetAddress || "",
        city: address.city || "",
        state: address.state || "",
        zipCode: address.zipCode || "",
        mobile: address.mobile || "",
      });
    }
  }, [address]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUserAddress(addressId, formData));
  }

  return (
    <div className="grid grid-cols-3 bg-white  p-2 h-[25rem]">
      <form
        onSubmit={handleSubmit}
        className="col-span-3 bg-white p-1 space-y-3 overflow-y-auto 
      "
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3">
            <input
              type="text"
              name="firstName"
              className="w-full p-2 border border-gray-300 rounded-md 
              focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-3">
            <input
              type="text"
              name="lastName"
              id=""
              className="w-full p-2 border border-gray-300 rounded-md 
focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
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
            value={formData.streetAddress}
            onChange={handleChange}
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
              value={formData.city}
              onChange={handleChange}
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
              value={formData.state}
              onChange={handleChange}
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
              value={formData.zipCode}
              onChange={handleChange}
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
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="uppercase bg-violet-500 text-white text-md font-bold p-3 rounded-md"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateAddress;
