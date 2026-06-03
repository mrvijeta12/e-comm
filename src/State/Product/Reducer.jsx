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

const initialState = {
  products: [],
  product: null,
  similarProducts: [],
  error: null,
  isLoading: false,
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
    case FIND_SIMILAR_PRODUCTS_REQUEST:
      return { ...state, error: null, isLoading: true };
    case FIND_PRODUCTS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        products: action.payload,
      };
    case FIND_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        product: action.payload,
      };
    case FIND_SIMILAR_PRODUCTS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        similarProducts: action.payload,
      };

    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
    case FIND_SIMILAR_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
