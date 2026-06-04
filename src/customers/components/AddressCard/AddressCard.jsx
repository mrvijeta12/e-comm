import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { createOrder } from "../../../State/Order/orderAction";
import { deleteUserAddress } from "../../../State/Auth/Action";

const AddressCard = ({ address, setUpdateAddrId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeliverHere = (address) => {
    const orderData = {
      address,
      navigate,
    };
    dispatch(createOrder(orderData));
  };

  function handleDelete(addressId) {
    dispatch(deleteUserAddress(addressId));
  }

  function handleEdit(addressId) {
    navigate(`/address/edit/${addressId}`, {
      state: {
        background: location,
      },
    });
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const step = Number(searchParams.get("step"));
  // console.log(step);

  const isOrderDetailsPage = location.pathname.startsWith("/order-details");
  const isAdminOrderDetailsPage = location.pathname.startsWith(
    "/admin/orders-details",
  );

  return (
    <div className=" bg-white shadow-md rounded-md  p-3  ">
      <h4 className="text-md font-bold">{`${address?.firstName} ${address?.lastName}`}</h4>
      <p>
        {`${address?.streetAddress} ${address?.city} ${address?.state} ${address?.zipCode} `}
      </p>

      <p>{address?.mobile}</p>
      {step !== 3 && !isOrderDetailsPage && !isAdminOrderDetailsPage && (
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="uppercase bg-violet-500 text-white text-sm font-semibold p-1.5 rounded-md"
            onClick={() => handleDeliverHere(address)}
          >
            Deliver Here
          </button>

          <button
            type="submit"
            className="uppercase bg-violet-500 text-white text-sm font-semibold p-1.5 rounded-md"
            onClick={() => handleEdit(address._id)}
          >
            Edit
          </button>
          <button
            type="submit"
            className="uppercase bg-violet-500 text-white text-sm font-semibold p-1.5 rounded-md"
            onClick={() => handleDelete(address._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
