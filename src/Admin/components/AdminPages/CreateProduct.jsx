import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../State/Admin/AdminProduct/AdminProductAction";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

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

const CreateProduct = () => {
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

  const selectedCategory = thirdLevelCategory.find(
    (item) => item.label === product.topLevelCategory,
  );
  // console.log("selectedCategory", selectedCategory);

  const options = selectedCategory?.[product.secondLevelCategory] || [];
  // console.log("options:", options);

  const dispatch = useDispatch();

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
    console.log("product", product);

    try {
      await dispatch(createProduct(product));
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <CardHeader
        title="Add New Product"
        sx={{
          color: "#111827",
          borderBottom: "1px solid #e5e7eb",
        }}
      />

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-3">
            <input
              type="text"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Enter Image URL"
            />
          </div>

          <div className="w-full mb-3 flex flex-col md:flex-row gap-3">
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Enter Brand Name"
            />

            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Enter Product Title"
            />
          </div>

          <div className="w-full mb-3 flex flex-col md:flex-row gap-3">
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Enter Color"
            />

            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Enter Total Quantity"
            />
          </div>

          <div className="w-full mb-3 flex flex-col md:flex-row gap-3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Enter Original Price"
            />

            <input
              type="number"
              name="discountedPrice"
              value={product.discountedPrice}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Enter Discounted Price"
            />
          </div>

          <div className="w-full mb-3 flex flex-col md:flex-row gap-3">
            <input
              type="number"
              name="discountedPercent"
              value={product.discountedPercent}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Enter Discount Percentage"
            />

            <select
              name="topLevelCategory"
              value={product.topLevelCategory}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            >
              <option value="">Select Category</option>
              {topLevelCategory.map((c) => (
                <option value={c.value} key={c.value}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mb-3 flex flex-col md:flex-row gap-3">
            <select
              name="secondLevelCategory"
              value={product.secondLevelCategory}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
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
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            >
              <option value="">Select Item</option>

              {options.map((c) => (
                <option value={c.value} key={c.value}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mb-3">
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Enter Product Description"
            />
          </div>

          <div className="mb-5">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Product Sizes
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {product.sizes.map((size, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md p-3"
                >
                  <input
                    type="text"
                    name="name"
                    value={size.name}
                    onChange={(e) => handleSizeChange(e, index)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
                    placeholder="Size (S, M, L)"
                  />

                  <input
                    type="number"
                    name="size_quantity"
                    value={size.quantity}
                    onChange={(e) => handleSizeChange(e, index)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
                    placeholder="Quantity"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-violet-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-violet-700 transition"
          >
            Add New Product
          </button>
        </form>
      </div>
    </Card>
  );
};

export default CreateProduct;
