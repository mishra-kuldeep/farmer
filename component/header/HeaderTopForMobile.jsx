import React from "react";
import logo from "../../public/header/logo.jpg";
import { IoMenu } from "react-icons/io5";

const HeaderTopForMobile = () => {
  return (
    <div className="mobile_Header container">
      <div className="row m-0 align-items-center" style={{height:"50px"}}>
        <div className="col-6 d-flex align-items-center p-0">
          <img src={logo.src} alt="logo" className="logoImage" />
          <h6 className="logoImage_title">
            <span className="fs-4">F</span>armers
            <span className="fs-4">M</span>arket
          </h6>
        </div>
        <div className="col-6 p-0">
          <div className="d-flex justify-content-end">
            <button className="login_btn px-3">login / Signup</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopForMobile;
