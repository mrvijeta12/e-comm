import { SHOW_TOAST, HIDE_TOAST } from "./ToastActionTyps";

const initialState = {
  open: false,
  message: "",
  type: "success",
};

export const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };

    case HIDE_TOAST:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
};
