import { StarIcon } from "@heroicons/react/20/solid";
import { LinearProgress, Rating } from "@mui/material";
import UserRatings from "../UserRatings/UserRatings";
import { mens_kurta } from "../../../Data/Men/men_kurta";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  findProductById,
  findSimilarProducts,
} from "../../../State/Product/Action";
import { useEffect, useState } from "react";
import { addItemToCart } from "../../../State/Cart/cartAction";
import Spinner from "../SpinnerLoader/Spinner";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    {
      id: "white",
      name: "White",
      classes: "bg-white checked:outline-gray-400",
    },
    {
      id: "gray",
      name: "Gray",
      classes: "bg-gray-200 checked:outline-gray-400",
    },
    {
      id: "black",
      name: "Black",
      classes: "bg-gray-900 checked:outline-gray-900",
    },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const ratings = [
  { label: "Excellent", value: 80, count: 546, color: "#22c55e" },
  { label: "Very Good", value: 65, count: 420, color: "#4ade80" },
  { label: "Good", value: 45, count: 210, color: "#facc15" },
  { label: "Average", value: 25, count: 98, color: "#fb923c" },
  { label: "Poor", value: 10, count: 32, color: "#ef4444" },
];

const testimonials = [
  {
    name: "Ram",
    date: "April 5 2026",
    defaultValue: 4.5,
    precision: 0.5,
    comment: "Excellent Product",
  },
  {
    name: "Amit",
    date: "May 1 2026",
    defaultValue: 5,
    precision: 0.5,
    comment: "Nice Product",
  },
  {
    name: "Sunny",
    date: "April 28 2026",
    defaultValue: 4,
    precision: 0.5,
    comment: "Love the  Product",
  },
];

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);
  const location = useLocation();

  //! get state
  const products = useSelector((store) => store.products);
  console.log("products", products.isLoading);

  const auth = useSelector((store) => store.auth);

  // console.log(products.product);

  //! get id
  useEffect(() => {
    const data = { productId: params.product_id };
    // console.log(data);

    dispatch(findProductById(data));
    dispatch(findSimilarProducts(data));
  }, [params.product_id]);

  //! scroll to top when page open
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.product_id]);

  async function handleAddToCart(e) {
    e.preventDefault();
    if (!selectedSize) {
      alert("Please select size");
      return;
    }
    if (!auth.user) {
      navigate("/login", {
        state: {
          background: location,
        },
      });
      return;
    }
    const data = {
      productId: params.product_id,
      size: selectedSize,
    };
    // console.log("data", data);

    await dispatch(addItemToCart(data));
    navigate("/cart");
  }
  return (
    <div className="min-h-screen">
      {products.isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-white mt-10 ">
          <div className="pt-6">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 pt-10 ">
              {/* Image gallery */}

              <div className="flex flex-col items-center ">
                <div className="overflow-hidden max-w-[30rem] max-h-[30rem] ">
                  <img
                    alt={products?.product?.title}
                    src={products?.product?.imageUrl}
                    className="
                row-span-2 aspect-3/4 size-full rounded-lg object-cover object-top"
                  />
                </div>
                {/* <div className="flex space-x-3 mt-6">
              {product.images.map((image) => (
                <div
                  className="flex-1 w-24 h-30 overflow-hidden rounded-lg object-cover object-top "
                  key={image.src}
                >
                  <img
                    alt={image.alt}
                    src={image.src}
                    className="col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
                  />
                </div>
              ))}
            </div> */}
              </div>

              {/* Product info */}
              <div className="flex flex-col  px-6">
                {/* Options */}
                <div className="mt-4 ">
                  <h1 className="text-lg lg:text-xl text-gray-900 font-semibold">
                    Brand
                  </h1>

                  <h1 className="text-lg  text-gray-900 opacity-60 pt-1">
                    {products?.product?.name}
                  </h1>

                  <div className="mt-3">
                    <div className="flex space-x-5 items-center text:lg text-gray-900 ">
                      <p className="font-semibold">
                        $ {products?.product?.discountedPrice}
                      </p>
                      <p className="opacity-60 line-through">
                        $ {products?.product?.price}
                      </p>
                      <p className="font-semibold text-green-400">
                        {" "}
                        {products?.product?.discountedPercent}% Off
                      </p>
                    </div>
                    {/* Reviews */}
                    <div className="flex items-center mt-3 space-x-3">
                      <div>
                        <Rating
                          name="half-rating-read"
                          defaultValue={4.5}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <p className="text-sm opacity-60">3240 Ratings</p>
                      <p className="text-sm text-violet-500"> 1020 Reviews</p>
                    </div>
                  </div>

                  <form className="mt-10">
                    {/* Sizes */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Size
                        </h3>
                      </div>

                      <fieldset aria-label="Choose a size" className="mt-4">
                        <div className="grid grid-cols-12 gap-3">
                          {products.product?.sizes.map((size) => (
                            <label
                              key={size._id}
                              aria-label={size.name}
                              className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-violet-600 has-checked:bg-violet-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-violet-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                            >
                              <input
                                defaultChecked={selectedSize === size.name}
                                name="size"
                                type="radio"
                                // disabled={!size.inStock}
                                className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                                value={size.name}
                                onChange={() => setSelectedSize(size.name)}
                              />
                              <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                                {size.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    <button
                      type="submit"
                      className="mt-10  flex w-fit items-center justify-center rounded-md border border-transparent bg-violet-500 px-8 py-3 text-base font-medium text-white hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-hidden"
                      onClick={handleAddToCart}
                    >
                      Add to bag
                    </button>
                  </form>
                </div>
                {/* Description  */}
                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {products?.product?.description}
                      </p>
                    </div>
                  </div>

                  {/* <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}

                  {/* <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div> */}
                </div>
              </div>
            </section>

            {/* recent reviews and rating  */}
            <section className=" max-w-6xl  mx-auto mt-10 px-6">
              <h4 className="font-semibold border-b border-gray-200 w-full pb-3">
                Recent Reviews & Ratings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  {testimonials.map((testimonial, index) => (
                    <UserRatings key={index} data={testimonial} />
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-lg  w-full pb-3 mt-6">
                    Product Ratings
                  </h4>
                  <div className="flex space-x-3">
                    <div>
                      <Rating
                        name="half-rating-read"
                        defaultValue={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <p>24500 Ratings</p>
                  </div>
                  <div className="mt-3">
                    {ratings.map((r) => (
                      <div
                        key={r.label}
                        className="flex items-center gap-3 mb-3"
                      >
                        <p className="w-24 text-sm opacity-60">{r.label}</p>

                        <LinearProgress
                          variant="determinate"
                          value={r.value}
                          sx={{
                            flex: 1,
                            height: 8,
                            borderRadius: 5,
                            backgroundColor: "#e5e7eb",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: r.color,
                            },
                          }}
                        />

                        <span className="text-sm w-10 text-right">
                          {r.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* similar products  */}
            <section className=" max-w-6xl px-6  mx-auto pt-10 flex flex-col space-y-5">
              <h1 className="text-lg font-bold">Similar products</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.similarProducts?.map((item) => (
                  <HomeSectionCard key={item.src} item={item} />
                ))}
              </div>
            </section>
          </div>
          ;
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
