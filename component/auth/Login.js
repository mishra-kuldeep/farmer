import React from "react";
import logo from "../../public/header/logo1.jpg";

const LoginPage = () => {
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
          // onChange={handleSearch}
          placeholder="User Id"
        />
      </div>
      <div className="p-2">
        <input
          type="search"
          className="form-control"
          // onChange={handleSearch}
          placeholder="Password"
        />
      </div>
      <div className="p-2 text-center mt-4">
        <button className="login_btn">login</button>
      </div>
     
    </div>
  );
};

export default LoginPage;
