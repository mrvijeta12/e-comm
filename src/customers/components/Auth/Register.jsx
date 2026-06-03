import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../State/Auth/Action";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((store) => store.auth);
  // console.log("auth", auth);

  function handelSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(register(userData));
    // e.target.reset();
  }

  return (
    <div className="w-full">
      <form onSubmit={handelSubmit} className="w-full">
        <div className="flex space-x-2 mb-4 justify-between">
          <input
            type="text"
            placeholder="First Name"
            className="p-2 border border-gray-200 w-full rounded-md outline-0 focus:border-violet-400"
            autoComplete="given-name"
            name="firstName"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-2 border border-gray-200 w-full rounded-md outline-0 focus:border-violet-400"
            autoComplete="family-name"
            name="lastName"
          />
        </div>
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
          className="w-full rounded-md bg-violet-500 p-3 font-bold text-white uppercase out"
          type="submit"
          disabled={auth.isLoading}
        >
          Register
        </button>
      </form>
      <div className="mt-3">
        <p>
          Already have an account ?{" "}
          <span
            className="text-violet-500 cursor-pointer "
            onClick={() =>
              navigate("/login", {
                state: { background: location.state?.background },
              })
            }
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
