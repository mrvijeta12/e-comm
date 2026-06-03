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
  GET_ADMIN_ORDER_BY_ID_FAILURE,
  GET_ADMIN_ORDER_BY_ID_REQUEST,
  GET_ADMIN_ORDER_BY_ID_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  OUT_FOR_DELIVERY_ORDER_FAILURE,
  OUT_FOR_DELIVERY_ORDER_REQUEST,
  OUT_FOR_DELIVERY_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./AdminOrderTypes";

const initialState = {
  orders: [],
  error: null,
  isLoading: false,
  order: null,
};

export const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
    case DELETE_ORDER_REQUEST:
    case PLACE_ORDER_REQUEST:
    case CONFIRM_ORDER_REQUEST:
    case SHIP_ORDER_REQUEST:
    case DELIVER_ORDER_REQUEST:
    case CANCEL_ORDER_REQUEST:
    case OUT_FOR_DELIVERY_ORDER_REQUEST:
    case GET_ADMIN_ORDER_BY_ID_REQUEST:
      return { ...state, error: null, isLoading: true };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        orders: action.payload,
      };
    case GET_ADMIN_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        order: action.payload,
      };

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: [...state.orders, action.payload],
      };

    case CONFIRM_ORDER_SUCCESS:
    case SHIP_ORDER_SUCCESS:
    case DELIVER_ORDER_SUCCESS:
    case CANCEL_ORDER_SUCCESS:
    case OUT_FOR_DELIVERY_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order,
        ),
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.filter((order) => order._id !== action.payload),
      };

    case GET_ORDERS_FAILURE:
    case DELETE_ORDER_FAILURE:
    case CONFIRM_ORDER_FAILURE:
    case SHIP_ORDER_FAILURE:
    case DELIVER_ORDER_FAILURE:
    case CANCEL_ORDER_FAILURE:
    case PLACE_ORDER_FAILURE:
    case OUT_FOR_DELIVERY_ORDER_FAILURE:
    case GET_ADMIN_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
