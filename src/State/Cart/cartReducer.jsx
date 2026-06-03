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

const initialState = {
  cart: null,
  error: null,
  isLoading: false,
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: [...state.cartItems, action.payload.cartItems],
      };
    case ADD_ITEM_TO_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
        cartItems: action.payload.cartItems,
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_ITEM_TO_CART_REQUEST:
    case REMOVE_ITEM_TO_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REMOVE_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deletedCartItem: action.payload,
      };
    case UPDATE_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updatedCartItems: action.payload,
      };
    case REMOVE_ITEM_TO_CART_FAILURE:
    case UPDATE_ITEM_TO_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
