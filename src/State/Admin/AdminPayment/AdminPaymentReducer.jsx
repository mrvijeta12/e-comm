import {
  PAYMENT_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
} from "./AdminPaymentTypes";

const initialState = {
  loading: false,
  payment: null,
  error: null,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payment: action.payload,
      };

    case PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
