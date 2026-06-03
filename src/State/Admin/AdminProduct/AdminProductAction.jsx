import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FIND_ADMIN_PRODUCT_BY_ID_FAILURE,
  FIND_ADMIN_PRODUCT_BY_ID_REQUEST,
  FIND_ADMIN_PRODUCT_BY_ID_SUCCESS,
  FIND_ADMIN_PRODUCTS_FAILURE,
  FIND_ADMIN_PRODUCTS_REQUEST,
  FIND_ADMIN_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "./AdminProductActionType";
import { api } from "../../../config/apiConfig.jsx";

export const findAdminProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_ADMIN_PRODUCTS_REQUEST });
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
    const data = response?.data?.products;
    console.log("products", response.data);
    dispatch({ type: FIND_ADMIN_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_ADMIN_PRODUCTS_FAILURE, payload: error.message });
  }
};

//! create product
export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  // console.log(product);

  try {
    const { data } = await api.post(`/admin/products/`, product);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    console.log("product created", data);
  } catch (error) {
    console.log(error.message);
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

//! update product
export const updateProduct = (data) => async (dispatch) => {
  const { productId, product } = data;
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  console.log(productId, product);

  try {
    const { data } = await api.put(
      `/admin/products/update/${productId}`,
      product,
    );
    console.log("product updated", data);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
  }
};

//! get product by id

export const findAdminProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_ADMIN_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;

  try {
    const response = await api.get(`/products/id/${productId}`);
    const data = response.data.product;
    // console.log("product by id ", data);
    dispatch({ type: FIND_ADMIN_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_ADMIN_PRODUCT_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteProductById = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    const { data } = await api.delete(`/admin/products/delete/${id}`);
    // console.log("data", data);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};
