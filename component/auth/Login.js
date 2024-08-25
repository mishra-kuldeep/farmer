import React, { useState } from "react";
import logo from "../../public/header/logo1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, login } from "@/redux/auth/authSlice";

const LoginPage = () => {
  const user = useSelector(state=>state.auth)
  const dispatch = useDispatch()
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleSubmit = () => {
  dispatch(login({ email, password })).then((result) => {
    console.log("first")
    if (result.meta.requestStatus === 'fulfilled') {
      console.log('first2')
      dispatch(fetchUserInfo()); // Fetch user info after successful login
    }
  });
}

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
          onChange={(e)=>setEmail(e.target.value)}
          name="email"
        />
      </div>
      <div className="p-2 m20">
      <label className="adjustLabel">password *</label>
        <input
          type="text"
          className="form-control adjustLabel_input p-2"
           onChange={(e)=>setPassword(e.target.value)}
          name="password"
        />
      </div>
      <div className="p-2 text-center mt-4">
        <button className="login_btn" onClick={handleSubmit}>login</button>
      </div>
     
    </div>
  );
};

export default LoginPage;
