import React, { useState } from "react";
import logo from "../../public/header/logo1.jpg";
import { useDispatch } from "react-redux";
import { registration } from "@/redux/auth/authSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Password: "",
    role: "",
  });

  const handleValues = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = () => {
    dispatch(registration(values));
  };

  return (
    <div>
      <div className="text-center">
        <img
          src={logo.src}
          alt="logo"
          className="shadow mb-2"
          style={{ height: "100px", width: "100px", borderRadius: "50%" }}
        />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">Firstname *</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="FirstName"
        />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">LastName</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="LastName"
        />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">Email *</label>
        <input
          type="email"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="Email"
        />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">Mobile No *</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="Phone"
        />
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">role *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          onChange={handleValues}
          name="role"
        >
          <option value=""></option>
          <option value="1">Farmers</option>
          <option value="2">Buyers</option>
          <option value="3">Transportation</option>
          <option value="4">Employee</option>
          <option value="5">Vendors</option>
          <option value="6">Educational Resources</option>
          <option value="7">Customer Care</option>
        </select>
      </div>
      <div className="p-2 m20">
        <label className="adjustLabel">Password *</label>
        <input
          type="password"
          className="form-control p-2 adjustLabel_input"
          onChange={handleValues}
          name="Password"
        />
      </div>
      <div className="p-2 text-center mt-2 ">
        <button className="login_btn" onClick={submitHandler}>
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
