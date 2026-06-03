import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  findAdminProductById,
  updateProduct,
} from "../../../State/Admin/AdminProduct/AdminProductAction";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useNavigate, useParams } from "react-router-dom";
import { findProductById } from "../../../State/Product/Action";

const initialSize = [
  {
    name: "S",
    quantity: 0,
  },
  {
    name: "M",
    quantity: 0,
  },
  {
    name: "L",
    quantity: 0,
  },
];
const topLevelCategory = [
  {
    name: "Men",
    value: "men",
  },
  {
    name: "Women",
    value: "women",
  },
];
const secondLevelCategory = [
  {
    name: "Clothing",
    value: "clothing",
  },
  {
    name: "Accessories",
    value: "accessories",
  },
];
const thirdLevelCategory = [
  {
    label: "women",
    clothing: [
      { name: "Top", value: "top" },
      { name: "Jeans", value: "women_jeans" },
      { name: "Lehenga", value: "lehenga" },
      { name: "Saree", value: "saree" },
    ],
    accessories: [
      { name: "Sunglasses", value: "sunglasses" },
      { name: "Bags", value: "bags" },
    ],
  },

  {
    label: "men",
    clothing: [
      { name: "Shirts", value: "mens_shirts" },
      { name: "Jeans", value: "mens_jeans" },
      { name: "T-Shirt", value: "t-shirts" },
      { name: "Kurta", value: "mens_kurta" },
    ],
    accessories: [
      { name: "Wallets", value: "wallets" },
      { name: "Watches", value: "watches" },
    ],
  },
];

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountedPercent: "",
    sizes: initialSize,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  });

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findAdminProductById(data));
  }, [dispatch, params.productId]);

  //! populate form data
  const fetchedproduct = useSelector((state) => state.adminProducts.product);

  useEffect(() => {
    console.log("product", fetchedproduct);
    if (fetchedproduct) {
      setProduct({
        imageUrl: fetchedproduct.imageUrl || "",
        brand: fetchedproduct.brand || "",
        title: fetchedproduct.title || "",
        color: fetchedproduct.color || "",
        discountedPrice: fetchedproduct.discountedPrice || "",
        price: fetchedproduct.price || "",
        discountedPercent: fetchedproduct.discountedPercent || "",
        sizes: fetchedproduct.sizes || initialSize,
        quantity: fetchedproduct.quantity || "",
        topLevelCategory: fetchedproduct.topLevelCategory || "",
        secondLevelCategory: fetchedproduct.secondLevelCategory || "",
        thirdLevelCategory: fetchedproduct.thirdLevelCategory || "",
        description: fetchedproduct.description || "",
      });
    }
  }, [fetchedproduct]);

  const selectedCategory = thirdLevelCategory.find(
    (item) => item.label === product.topLevelCategory,
  );
  const options = selectedCategory?.[product.secondLevelCategory] || [];

  const handleChange = (e) => {
    let { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    if (name === "size_quantity") {
      name = "quantity";
    }
    // copy the array
    const sizes = [...product.sizes];
    //sizes[0]["quantity"] = 25;
    sizes[index][name] = value;
    setProduct((prev) => ({ ...prev, sizes: sizes }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { productId: params.productId, product };
      await dispatch(updateProduct(data));

      setProduct({
        imageUrl: "",
        brand: "",
        title: "",
        color: "",
        discountedPrice: "",
        price: "",
        discountedPercent: "",
        sizes: initialSize,
        quantity: "",
        topLevelCategory: "",
        secondLevelCategory: "",
        thirdLevelCategory: "",
        description: "",
      });

      navigate("/admin/products", { replace: true });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className="p-2 rounded-md shadow-md">
      <h4 className="text-xl font-semibold py-3">Update Product</h4>
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-2">
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Enter Image URL"
          />
        </div>
        <div className="w-full mb-2 flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Enter Brand Name"
          />
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Enter Product Title"
          />
        </div>
        <div className="w-full mb-2 flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Enter Color"
          />
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Image Url"
            placeholder="Enter Total Quantity"
          />
        </div>
        <div className="w-full mb-2 flex flex-col md:flex-row gap-2">
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Image Url"
            placeholder="Enter Original Price"
          />
          <input
            type="number"
            name="discountedPrice"
            value={product.discountedPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Image Url"
            placeholder="Enter Discounted Price"
          />
        </div>
        <div className="w-full mb-2 flex flex-col md:flex-row gap-2">
          <input
            type="number"
            name="discountedPercent"
            value={product.discountedPercent}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Image Url"
            placeholder="Enter Discount Percentage"
          />
          <select
            name="topLevelCategory"
            value={product.topLevelCategory}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {topLevelCategory.map((c) => (
              <option value={c.value} key={c.value}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full mb-2 flex flex-col md:flex-row gap-2">
          <select
            name="secondLevelCategory"
            value={product.secondLevelCategory}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            onChange={handleChange}
          >
            <option value="">Select Sub Category</option>
            {secondLevelCategory.map((c) => (
              <option value={c.value} key={c.value}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            name="thirdLevelCategory"
            value={product.thirdLevelCategory}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            onChange={handleChange}
          >
            <option value="">Select Items</option>

            {options.map((c) => (
              <option value={c.value} key={c.value}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full mb-2 flex flex-col md:flex-row gap-2">
          <textarea
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Enter Product Description"
            rows={3}
          />
        </div>

        <div className="w-full mb-4">
          <p className="font-medium mb-2">Sizes</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {product.sizes.map((size, index) => (
              <div key={index} className="flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  value={size.name}
                  onChange={(e) => handleSizeChange(e, index)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
                  placeholder="Size (e.g. S, M, L)"
                />

                <input
                  type="number"
                  name="size_quantity"
                  value={size.quantity}
                  onChange={(e) => handleSizeChange(e, index)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
                  placeholder="Enter Quantity"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mb-2 flex flex-col md:flex-row gap-2">
          <button
            type="submit"
            className=" bg-violet-600 font-semibold p-2 rounded-md text-white hover:bg-violet-700 transition cursor-pointer w-fit"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
