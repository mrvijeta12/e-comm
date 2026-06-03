import { useDispatch } from "react-redux";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_ITEM_TO_CART_FAILURE,
  REMOVE_ITEM_TO_CART_REQUEST,
  REMOVE_ITEM_TO_CART_SUCCESS,
  UPDATE_ITEM_TO_CART_FAILURE,
  UPDATE_ITEM_TO_CART_REQUEST,
  UPDATE_ITEM_TO_CART_SUCCESS,
} from "./cartActionTypes";
import { api } from "../../config/apiConfig.jsx";

//! get user cart
export const getCart = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const response = await api.get(`/cart`);
    // console.log("fetch cart", response.data.cart);d
    dispatch({ type: GET_CART_SUCCESS, payload: response.data.cart });
  } catch (error) {
    dispatch({ type: GET_CART_FAILURE, payload: error.message });
  }
};

//! add item to cart
export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  try {
    const response = await api.post(`/cart/add`, reqData);

    console.log("add item to cart", response.data);

    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

//! remove item from cart
export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_ITEM_TO_CART_REQUEST });
  try {
    const response = await api.delete(`/cart-items/delete/${cartItemId}`);
    // console.log("deleted", response.data);
    dispatch({ type: REMOVE_ITEM_TO_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REMOVE_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

//! update cart item
export const updateCartItem = (reqData) => async (dispatch) => {
  const id = reqData.cartItemId;
  const data = reqData.updatedData;
  // console.log("data", data);

  dispatch({ type: UPDATE_ITEM_TO_CART_REQUEST });
  try {
    const response = await api.put(`/cart-items/update/${id}`, data);
    console.log("updated", response.data.updatedItem);

    dispatch({
      type: UPDATE_ITEM_TO_CART_SUCCESS,
      payload: response.data.updatedItem,
    });
  } catch (error) {
    dispatch({ type: UPDATE_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};
