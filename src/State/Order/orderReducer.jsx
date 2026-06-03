import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_USER_ORDER_HISTORY_FAILURE,
  GET_USER_ORDER_HISTORY_REQUEST,
  GET_USER_ORDER_HISTORY_SUCCESS,
} from "./orderTypes";

const initialState = {
  order: null,
  error: null,
  isLoading: false,
  orders: [],
  userOrders: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_BY_ID_REQUEST:
    case CREATE_ORDER_REQUEST:
    case GET_USER_ORDER_HISTORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_ORDER_BY_ID_FAILURE:
    case CREATE_ORDER_FAILURE:
    case GET_USER_ORDER_HISTORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        order: action.payload,
        isLoading: false,
        error: null,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_USER_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        userOrders: action.payload,
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
};
