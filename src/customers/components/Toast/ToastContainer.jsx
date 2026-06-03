import React from "react";
import { useSelector } from "react-redux";
import Toast from "./Toast";

const ToastContainer = () => {
  const toast = useSelector((store) => store.toast);
  if (!toast.open) return null;
  return (
    <div>
      <Toast msg={toast.message} type={toast.type} />
    </div>
  );
};

export default ToastContainer;
