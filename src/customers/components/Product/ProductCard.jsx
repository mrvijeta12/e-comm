import React, { useEffect } from "react";
import Styles from "../Product/Product.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findProductById } from "../../../State/Product/Action";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${Styles.productCard} m-3 w-[15rem] cursor-pointer`}
      onClick={() => navigate(`/product-detail/${product._id}`)}
    >
      <div className="h-[15rem]">
        <img
          src={product.imageUrl}
          className="h-full w-full object-cover object-top-left"
          alt={product.brand}
        />
      </div>
      <div className={`${Styles.textPart} bg-white p-3`}>
        <div>
          <p className="font-bold opacity-60">{product.brand}</p>
          <p>{product.title}</p>
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">${product.discountedPrice}</p>
            <p className="line-through opacity-60">${product.price}</p>
            <p className="text-green-600 font-semibold">
              {product.discountPersent}% Off
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
