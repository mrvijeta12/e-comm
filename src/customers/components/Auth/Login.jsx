import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../../State/Auth/Action";
import Toast from "../Toast/Toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  function handelSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(login(userData));
    // e.target.reset();
  }
  const auth = useSelector((store) => store.auth);
  // console.log("auth", auth);

  return (
    <div className="w-full">
      <form onSubmit={handelSubmit} className="w-full">
        <div className="mb-4 w-full">
          <input
            type="email"
            placeholder="email"
            className="p-2 border border-gray-200 w-full rounded-md outline-0 focus:border-violet-400 "
            autoComplete="email"
            name="email"
          />
        </div>
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="p-2 border border-gray-200 w-full rounded-md outline-0 focus:border-violet-400"
            autoComplete="current-password"
            name="password"
          />
          {showPassword ? (
            <span
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-violet-500"
              onClick={() => setShowPassword(false)}
            >
              <VisibilityIcon fontSize="small" />
            </span>
          ) : (
            <span
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-violet-500"
              onClick={() => setShowPassword(true)}
            >
              <VisibilityOffIcon fontSize="small" />
            </span>
          )}
        </div>
        <button
          className={`w-full rounded-md bg-violet-500 p-3 font-bold text-white uppercase out ${auth.isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
          type="submit"
          disabled={auth.isLoading}
        >
          Login
        </button>
      </form>

      <div className="mt-3">
        <p>
          Don't have an account ?{" "}
          <span
            className="text-violet-500 cursor-pointer "
            onClick={() =>
              navigate("/register", {
                state: { background: location.state?.background },
              })
            }
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
