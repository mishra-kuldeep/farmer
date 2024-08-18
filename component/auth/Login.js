import React, { useState } from "react";
import logo from "../../public/header/logo1.jpg";
import { useDispatch } from "react-redux";
import { login } from "@/redux/auth/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch()
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleSubmit = () => {
  dispatch(login({email,password}))
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
      <div className="p-2">
        <input
          type="search"
          className="form-control"
          onChange={(e)=>setEmail(e.target.value)}
          name="email"
          placeholder="User Id"
        />
      </div>
      <div className="p-2">
        <input
          type="search"
          className="form-control"
           onChange={(e)=>setPassword(e.target.value)}
          name="password"
          placeholder="Password"
        />
      </div>
      <div className="p-2 text-center mt-4">
        <button className="login_btn" onClick={handleSubmit}>login</button>
      </div>
     
    </div>
  );
};

export default LoginPage;
