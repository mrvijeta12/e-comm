import { useDispatch } from "react-redux";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_USER_ORDER_HISTORY_REQUEST,
  GET_USER_ORDER_HISTORY_SUCCESS,
  GET_USER_ORDER_HISTORY_FAILURE,
} from "./orderTypes.jsx";
import { api } from "../../config/apiConfig.jsx";

//! create order
export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const response = await api.post(`/orders`, reqData.address);
    // console.log("create order:", response.data);

    if (response.data.order) {
      reqData.navigate({
        search: `?step=3&order_id=${response.data.order}`,
      });
    }
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("ERROR MESSAGE:", error.message);
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};

//! get order by id
export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const response = await api.get(`/orders/${orderId}`);
    const order = response.data?.order;
    // console.log("order", order);

    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: order });
  } catch (error) {
    console.log("get order by id error:", error.message);

    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
  }
};

//! get user order history

export const getUserOrderHistory = () => async (dispatch) => {
  dispatch({ type: GET_USER_ORDER_HISTORY_REQUEST });
  try {
    const response = await api.get(`/orders/user`);
    const orders = response.data.orders;
    // console.log("order", order);
    // console.log(response);

    dispatch({ type: GET_USER_ORDER_HISTORY_SUCCESS, payload: orders });
  } catch (error) {
    console.log("get order by id error:", error.message);

    dispatch({ type: GET_USER_ORDER_HISTORY_FAILURE, payload: error.message });
  }
};

// export const removeCartItem = (reqData) => async (dispatch) => {
//   const id = reqData.cartItemId;
//   dispatch({ type: REMOVE_ITEM_TO_CART_REQUEST });
//   try {
//     const response = await api.delete(`/cart_items/delete/${id}`);
//     dispatch({ type: REMOVE_ITEM_TO_CART_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: REMOVE_ITEM_TO_CART_FAILURE, payload: error.message });
//   }
// };
// export const updateCartItem = (reqData) => async (dispatch) => {
//   const id = reqData.cartItemId;
//   dispatch({ type: UPDATE_ITEM_TO_CART_REQUEST });
//   try {
//     const response = await api.delete(`/cart_items/delete/${id}`, reqData.data);
//     dispatch({ type: UPDATE_ITEM_TO_CART_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: UPDATE_ITEM_TO_CART_FAILURE, payload: error.message });
//   }
// };
