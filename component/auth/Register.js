import React from "react";
import logo from "../../public/header/logo1.jpg";

const RegisterPage = () => {
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
      <div className="p-2">
        <input
          type="text"
          className="form-control"
          // onChange={handleSearch}
          placeholder="Firstname"
        />
      </div>
      <div className="p-2">
        <input
          type="text"
          className="form-control"
          // onChange={handleSearch}
          placeholder="LastName"
        />
      </div>
      <div className="p-2">
        <input
          type="email"
          className="form-control"
          // onChange={handleSearch}
          placeholder="Email"
        />
      </div>
      <div className="p-2">
        <input
          type="number"
          className="form-control"
          // onChange={handleSearch}
          placeholder="Mobile No"
        />
      </div>
      <div className="p-2">
        <select
          className="form-select custom-select"
          aria-label="Default select example"
        >
          <option selected>Category</option>
          <option value="1">Farmers</option>
          <option value="2">Buyers</option>
          <option value="3">Transportation</option>
          <option value="4">Employee</option>
          <option value="5">Vendors</option>
          <option value="6">Educational Resources</option>
          <option value="7">Customer Care</option>
        </select>
      </div>
      <div className="p-2">
        <input
          type="password"
          className="form-control"
          // onChange={handleSearch}
          placeholder="Password"
        />
      </div>
      <div className="p-2">
        <input
          type="password"
          className="form-control"
          // onChange={handleSearch}
          placeholder="Confirm Password"
        />
      </div>
      <div className="p-2 text-center mt-2">
        <button className="login_btn">Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;
