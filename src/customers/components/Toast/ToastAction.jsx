import { SHOW_TOAST, HIDE_TOAST } from "./ToastActionTyps";

export const showToast = (message, type = "success") => ({
  type: SHOW_TOAST,
  payload: {
    message,
    type,
  },
});

export const hideToast = () => ({
  type: HIDE_TOAST,
});
