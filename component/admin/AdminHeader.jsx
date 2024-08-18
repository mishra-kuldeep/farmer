import React, { useState } from "react";
import "./adminHeader.css";
import { IoMenu } from "react-icons/io5";
import logo from "../../public/header/logo1.jpg";

const AdminHeader = ({toggleidebar}) => {
 
  return (
    <div className="adminHeaderWrapper">
      <IoMenu fontSize={25} color="var(--adminwhite)" className="cursor" onClick={toggleidebar}/>
      <img
        src={logo.src}
        alt="logo"
        style={{ borderRadius: "50%", height: "50px", marginInline: "20px" }}
      />
      <h6 className="text-light">
        <span className="fs-4">F</span>armers
        <span className="fs-4">M</span>arket
      </h6>
    </div>
  );
};

export default AdminHeader;
