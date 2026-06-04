import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../../assets/zentric_logo.png";
import UpdateAddress from "../updateAddress/UpdateAddress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
  // border: "2px solid red",
};
const AuthModel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const isAuth =
      location.pathname === "/login" || location.pathname === "/register";

    if (isAuth && auth?.user) {
      handleClose();
    }
  }, [auth?.user, location.pathname]);

  const handleClose = () => {
    navigate(location.state?.background?.pathname || "/", {
      replace: true,
    });
  };
  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={logo} alt="zentric" style={{ width: "200px" }} />
          </div>
          {location.pathname === "/login" && <Login />}
          {location.pathname === "/register" && <Register />}
          {location.pathname.startsWith("/address/edit/") && <UpdateAddress />}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModel;
