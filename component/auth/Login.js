import React, { useState } from "react";
import logo from "../../public/header/logo1.jpg";
import { useDispatch } from "react-redux";
import { fetchUserInfo, login } from "@/redux/auth/authSlice";
import MiniLoader from "../reusableComponent/MiniLoader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = () => {
    setLoader(true);
    dispatch(login({ email, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(fetchUserInfo()); // Fetch user info after successful login
        setLoader(false);
      }else setLoader(false);
    });
  };

  return (
    <div>
      <div className="text-center">
        <img
          src={logo.src}
          alt="logo"
          className="shadow mb-5"
          style={{ height: "200px", width: "200px", borderRadius: "50%" }}
        />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">User Id *</label>
        <input
          type="email"
          className="form-control adjustLabel_input p-2"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">password *</label>
        <input
          type="text"
          className="form-control adjustLabel_input p-2"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
      </div>
      <div className="p-2 text-center mt-4">
        <button className="login_btn" onClick={handleSubmit} disabled={loader}>
        {loader && <MiniLoader/>}
          login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
