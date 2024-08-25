import React, { useState } from "react";
import "./adminHeader.css";
import { IoMenu } from "react-icons/io5";
import logo from "../../public/header/logo1.jpg";
import { useRouter } from "next/navigation";

const AdminHeader = ({toggleidebar}) => {
  const router = useRouter()
 
  return (
    <div className="adminHeaderWrapper">
      <IoMenu fontSize={25} color="var(--adminwhite)" className="cursor" onClick={toggleidebar}/>
      <div className="centerAllDiv cursor" onClick={()=>router.push("/")}>
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
    </div>
  );
};

export default AdminHeader;
