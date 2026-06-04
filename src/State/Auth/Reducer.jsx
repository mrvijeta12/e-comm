import {
  GET_ALL_USER_REGISTER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILURE,
  GET_USER_REGISTER_FAILURE,
  GET_USER_REGISTER_REQUEST,
  GET_USER_REGISTER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  RESET_ADDRESS_UPDATE_SUCCESS,
} from "./ActionTypes";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  users: [],

  addressLoading: false,
  addressError: null,
  addressUpdateSuccess: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REGISTER_REQUEST:
    case GET_ALL_USER_REGISTER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
      };
    case GET_USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        users: action.payload,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_REGISTER_FAILURE:
    case GET_ALL_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case DELETE_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        addressLoading: true,
        addressError: null,
        addressUpdateSuccess: false,
      };

    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        addressLoading: false,
        user: {
          ...state.user,
          address: state.user.address.filter(
            (addr) => addr._id !== action.payload,
          ),
        },
      };

    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        addressLoading: false,
        addressUpdateSuccess: true,
        user: {
          ...state.user,
          address: state.user.address.map((addr) =>
            addr._id === action.payload._id ? action.payload : addr,
          ),
        },
      };

    case RESET_ADDRESS_UPDATE_SUCCESS:
      return {
        ...state,
        addressUpdateSuccess: false,
      };

    case DELETE_ADDRESS_FAILURE:
    case UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        addressLoading: false,
        addressError: action.payload,
      };
    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};
