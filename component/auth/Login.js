import React, { useState } from "react";
import logo from "../../public/header/logo1.jpg";
import { useDispatch } from "react-redux";
import { fetchUserInfo, login } from "@/redux/auth/authSlice";
import MiniLoader from "../reusableComponent/MiniLoader";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import ForgotPassword from "./ForgotPassword";
import { MdBackup } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";


const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [secure, setSecure] = useState(true);
  const [changepass, setchangepass] = useState(false);

  const handleSubmit = () => {
    setLoader(true);
    dispatch(login({ email, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(fetchUserInfo()); // Fetch user info after successful login
        setLoader(false);
      } else setLoader(false);
    });
  };

  return (
  <>
  { !changepass&& <div>
      <div className="text-center">
        <img src={logo.src} alt="logo" className="shadow mb-5 loginlogo" />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">Email *</label>
        <input
          type="email"
          className="form-control adjustLabel_input p-2"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </div>
      <div className="p-2 m20 position-relative">
        <label className="adjustLabel">Password *</label>
        <input
          type={secure ? "password" : "text"}
          className="form-control adjustLabel_input p-2"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        {secure ? (
          <IoIosEyeOff
            color="#555"
            className="cursor"
            size={20}
            onClick={() => setSecure(!secure)}
            style={{ position: "absolute", right: "30px", top: "48%" }}
          />
        ) : (
          <IoMdEye
            color="#555"
            className="cursor"
            size={20}
            onClick={() => setSecure(!secure)}
            style={{ position: "absolute", right: "30px", top: "48%" }}
          />
        )}
      </div>
      <div className="text-end pe-4 py-1 cursor" onClick={() => setchangepass(true)}>
        <u>ForgotPassword?</u>
      </div>
      <div className="p-2 text-center mt-4">
        <button className="login_btn" onClick={handleSubmit} disabled={loader}>
          {loader && <MiniLoader />}
          Login
        </button>
      </div>
    
    </div>}
    {changepass && <p className="p-2 cursor" onClick={() => setchangepass(false)}><FaArrowLeftLong/></p>}
      {changepass && <ForgotPassword setchangepass={setchangepass}/>}
  </>

  );
};

export default LoginPage;
