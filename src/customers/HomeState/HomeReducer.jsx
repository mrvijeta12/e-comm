import {
  HOME_PRODUCTS_REQUEST,
  HOME_PRODUCTS_SUCCESS,
  HOME_PRODUCTS_FAILURE,
} from "./HomeActionTypes";

const initialState = {
  sections: {},
  loading: false,
  error: null,
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case HOME_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        sections: action.payload,
      };
    case HOME_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
