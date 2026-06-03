import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
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

const initialState = {
  adminProducts: [],
  product: null,
  error: null,
  isLoading: false,
};

export const adminProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_ADMIN_PRODUCTS_REQUEST:
    case DELETE_PRODUCT_REQUEST:
    case CREATE_PRODUCT_REQUEST:
    case FIND_ADMIN_PRODUCT_BY_ID_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return { ...state, error: null, isLoading: true };
    case FIND_ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        adminProducts: action.payload,
      };

    case FIND_ADMIN_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        product: action.payload,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        adminProducts: {
          ...state.adminProducts,
          content: (state.adminProducts?.content || []).filter(
            (p) => p._id !== action.payload,
          ),
        },
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        adminProducts: {
          ...state.adminProducts,
          content: state.adminProducts?.content.map((p) =>
            p._id !== action.payload._id ? action.payload : p,
          ),
        },
      };

    case FIND_ADMIN_PRODUCTS_FAILURE:
    case DELETE_PRODUCT_FAILURE:
    case CREATE_PRODUCT_FAILURE:
    case FIND_ADMIN_PRODUCT_BY_ID_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
