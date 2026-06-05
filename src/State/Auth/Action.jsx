import axios from "axios";
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
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
} from "./ActionTypes";
import { api } from "../../config/apiConfig";
import { showToast } from "../../customers/components/Toast/ToastAction";
//! token
// const token = useSelector((state) => state.auth.token);

//! register
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (data) => ({ type: REGISTER_SUCCESS, payload: data });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await api.post(`/auth/signup`, userData);
    // console.log(response);

    const user = response.data;
    // console.log("user token", user.token);
    // console.log("user ", user);

    // if (user) {
    //   localStorage.setItem("token", user.token);
    // }
    dispatch(
      registerSuccess({
        token: user.token,
        user: user.user,
      }),
    );
    dispatch(getUser());
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

//! login

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (data) => ({ type: LOGIN_SUCCESS, payload: data });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await api.post(`/auth/login`, userData);

    const user = response.data;
    // console.log("user", user);

    // if (user) {
    //   localStorage.setItem("token", user.token);
    // }
    dispatch(
      loginSuccess({
        token: user.token,
        user: user.user,
      }),
    );
    dispatch(getUser());
    dispatch(
      showToast(response.data.message || "Login Successfull", "success"),
    );
  } catch (error) {
    dispatch(loginFailure(error.message));
    dispatch(
      showToast(error.response?.data?.message || "Error while login", "error"),
    );
  }
};

//! get user

const getUserRequest = () => ({ type: GET_USER_REGISTER_REQUEST });
const getUserSuccess = (user) => ({
  type: GET_USER_REGISTER_SUCCESS,
  payload: user,
});
const getUserFailure = (error) => ({
  type: GET_USER_REGISTER_FAILURE,
  payload: error,
});

export const getUser = () => async (dispatch, getState) => {
  // console.log("api called");

  dispatch(getUserRequest());
  try {
    const response = await api.get(`/users/profile`);
    const user = response.data;
    // console.log("get user using token", user);
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

//! get all users

const getAllUserRequest = () => ({ type: GET_ALL_USER_REGISTER_REQUEST });
const getAllUserSuccess = (user) => ({
  type: GET_ALL_USER_SUCCESS,
  payload: user,
});
const getAllUserFailure = (error) => ({
  type: GET_ALL_USER_FAILURE,
  payload: error,
});

//! get all user
export const getAllUsers = () => async (dispatch, getState) => {
  // console.log("api called");

  dispatch(getAllUserRequest());
  try {
    const response = await api.get(`/users`);
    const users = response.data.users;
    // console.log("get all users", user);
    dispatch(getAllUserSuccess(users));
  } catch (error) {
    dispatch(getAllUserFailure(error.message));
  }
};

//! delete  user address
export const deleteUserAddress = (addressId) => async (dispatch) => {
  dispatch({ type: DELETE_ADDRESS_REQUEST });
  try {
    const response = await api.delete(`/addresses/${addressId}/`);
    dispatch({
      type: DELETE_ADDRESS_SUCCESS,
      payload: addressId,
    });
    dispatch(showToast(response.data.message || "Address deleted", "success"));
  } catch (error) {
    dispatch({
      type: DELETE_ADDRESS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    dispatch(
      showToast(response.data.message || "Address delete fail", "error"),
    );
  }
};

//! update  user address
export const updateUserAddress = (addressId, data) => async (dispatch) => {
  dispatch({ type: UPDATE_ADDRESS_REQUEST });
  try {
    const response = await api.put(`/addresses/${addressId}/`, data);
    dispatch({
      type: UPDATE_ADDRESS_SUCCESS,
      payload: response.data.address,
    });
    dispatch(showToast(response.data.message || "Address updated", "success"));
  } catch (error) {
    dispatch({
      type: UPDATE_ADDRESS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    dispatch(
      showToast(response.data.message || "Address update fail", "error"),
    );
  }
};

//! logout

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT, payload: null });
};
