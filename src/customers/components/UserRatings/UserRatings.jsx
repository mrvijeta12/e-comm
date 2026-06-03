import { Rating } from "@mui/material";
import React from "react";

const UserRatings = ({ data }) => {
  return (
    <div className="flex space-x-10 items-center mt-6  ">
      <div className="flex justify-center items-center rounded-full bg-violet-500 text-lg font-bold text-white h-12 w-12">
        <h1>{data.name.charAt(0).toUpperCase()}</h1>
      </div>
      <div>
        <h4 className="font-semibold">{data.name}</h4>
        <p className="text-gray-900 opacity-60 text-sm">April 5, 2023</p>
        <div>
          <Rating
            name="half-rating-read"
            defaultValue={data.defaultValue}
            precision={data.precision}
            readOnly
          />
        </div>
        <p className="text-gray-900 opacity-60 text-sm">{data.comment}</p>
      </div>
    </div>
  );
};

export default UserRatings;
