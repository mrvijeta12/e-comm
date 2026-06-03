import { useDispatch } from "react-redux";
import { api } from "../../config/apiConfig.jsx";
import {
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_SIMILAR_PRODUCTS_FAILURE,
  FIND_SIMILAR_PRODUCTS_REQUEST,
  FIND_SIMILAR_PRODUCTS_SUCCESS,
} from "./ActionType";

//! get all product
export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  const {
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  // console.log("reqData", reqData);

  try {
    const response = await api.get("/products", {
      params: {
        color,
        sizes,
        minPrice,
        maxPrice,
        minDiscount,
        category,
        stock,
        sort,
        pageNumber,
        pageSize,
      },
    });
    // console.log(response.data);

    const data = response?.data?.products;
    // console.log("products", data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

//! get product by id

export const findProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;

  try {
    const response = await api.get(`/products/id/${productId}`);
    const data = response.data.product;
    // console.log("product by id ", data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

//! get similar products

export const findSimilarProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_SIMILAR_PRODUCTS_REQUEST });
  const { productId } = reqData;
  try {
    const response = await api.get(`/products/similar/${productId}`);
    const data = response.data.products;
    // console.log("product similar pro ", data);
    dispatch({ type: FIND_SIMILAR_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_SIMILAR_PRODUCTS_FAILURE, payload: error.message });
  }
};
