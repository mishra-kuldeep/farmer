import React from "react";
import logo from "../../public/header/logo1.jpg";
import { IoMenu } from "react-icons/io5";
import Auth from "../auth/Auth";

const HeaderTopForMobile = () => {
  return (
    <div className="mobile_Header container">
      <div className="row m-0 align-items-center" style={{ height: "50px" }}>
        <div className="col-1 p-0">
          <div className="dropdown">
            <div data-bs-toggle="dropdown" aria-expanded="false">
              <IoMenu size={20}/>
            </div>
            <ul className="dropdown-menu custom-dropdown-menu">
              <li className="dropdown-item">Farmers</li>
              <li className="dropdown-item">Buyers</li>
              <li className="dropdown-item">Transportation</li>
              <li className="dropdown-item">Employee</li>
              <li className="dropdown-item">Vendors</li>
              <li className="dropdown-item">Educational Resources</li>
              <li className="dropdown-item">Customer Care</li>
            </ul>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center p-0">
          <img src={logo.src} alt="logo" className="logoImage" />
          <h6 className="logoImage_title">
            <span className="fs-4">F</span>armers
            <span className="fs-4">M</span>arket
          </h6>
        </div>
        <div className="col-5 p-0">
          <div className="d-flex justify-content-end">
            {/* <button className="login_btn px-3">login / Signup</button> */}
            <Auth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopForMobile;
