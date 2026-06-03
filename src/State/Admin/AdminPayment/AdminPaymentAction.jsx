import { api } from "../../../config/apiConfig";
import {
  PAYMENT_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
} from "./AdminPaymentTypes";

export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: PAYMENT_REQUEST });

  try {
    const response = await api.post(`/payments/${orderId}`);
    console.log("payments", response.data.paymentLink);

    dispatch({
      type: PAYMENT_SUCCESS,
      payload: response.data.paymentLink,
    });

    const paymentUrl = response.data.paymentLink?.paymentLinkUrl;
    console.log(paymentUrl);

    if (paymentUrl) {
      window.location.href = paymentUrl; // ✅ fixed
    }
  } catch (error) {
    dispatch({
      type: PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
