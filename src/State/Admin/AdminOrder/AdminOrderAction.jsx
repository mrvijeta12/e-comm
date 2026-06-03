import {
  CANCEL_ORDER_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVER_ORDER_FAILURE,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
  OUT_FOR_DELIVERY_ORDER_REQUEST,
  OUT_FOR_DELIVERY_ORDER_SUCCESS,
  OUT_FOR_DELIVERY_ORDER_FAILURE,
  GET_ADMIN_ORDER_BY_ID_REQUEST,
  GET_ADMIN_ORDER_BY_ID_SUCCESS,
  GET_ADMIN_ORDER_BY_ID_FAILURE,
} from "./AdminOrderTypes";
import { api } from "../../../config/apiConfig.jsx";

//! get all orders
export const getAllOrder = () => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQUEST });
  try {
    const { data } = await api.get(`/admin/orders`);
    // console.log("data", data);

    dispatch({ type: GET_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
  }
};
//! get order by id
export const getAdminOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ADMIN_ORDER_BY_ID_REQUEST });
  try {
    const response = await api.get(`/orders/${orderId}`);
    const order = response.data?.order;
    // console.log("admin order detail", order);

    dispatch({ type: GET_ADMIN_ORDER_BY_ID_SUCCESS, payload: order });
  } catch (error) {
    console.log("get order by id error:", error.message);

    dispatch({ type: GET_ADMIN_ORDER_BY_ID_FAILURE, payload: error.message });
  }
};

//! delete order
export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });
  try {
    const { data } = await api.delete(`/admin/orders/${orderId}/delete`);
    console.log("data", data);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
  }
};

//! place order
export const placeOrder = (orderId) => async (dispatch) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  try {
    const { data } = await api.post(`/admin/orders/${orderId}`);
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: PLACE_ORDER_FAILURE, payload: error.message });
  }
};

//! confirm order
export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRM_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/admin/orders/${orderId}/confirm`);
    dispatch({ type: CONFIRM_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: CONFIRM_ORDER_FAILURE, payload: error.message });
  }
};

//! ship order
export const shipOrder = (orderId) => async (dispatch) => {
  // console.log("ship clicked");
  dispatch({ type: SHIP_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/admin/orders/${orderId}/ship`);
    dispatch({ type: SHIP_ORDER_SUCCESS, payload: data.order });
    // console.log("ship:", data);
  } catch (error) {
    console.log(error.message);
    dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message });
  }
};

//! out for delivery order
export const outForDeliveryOrder = (orderId) => async (dispatch) => {
  // console.log("ship clicked");
  dispatch({ type: OUT_FOR_DELIVERY_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/admin/orders/${orderId}/out-for-delivery`);
    dispatch({ type: OUT_FOR_DELIVERY_ORDER_SUCCESS, payload: data.order });
    // console.log("ship:", data);
  } catch (error) {
    console.log(error.message);
    dispatch({ type: OUT_FOR_DELIVERY_ORDER_FAILURE, payload: error.message });
  }
};

//! deliver order
export const deliverOrder = (id) => async (dispatch) => {
  dispatch({ type: DELIVER_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/admin/orders/${id}/deliver`);
    dispatch({ type: DELIVER_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: DELIVER_ORDER_FAILURE, payload: error.message });
  }
};

//! cancel order
export const cancelOrder = (id) => async (dispatch) => {
  dispatch({ type: CANCEL_ORDER_REQUEST });
  try {
    const { data } = await api.patch(`/admin/orders/${id}/cancel`);
    dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: CANCEL_ORDER_FAILURE, payload: error.message });
  }
};
