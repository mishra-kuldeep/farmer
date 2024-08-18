"use client";
import AdminHeader from "@/component/admin/AdminHeader";
import AdminSidebar from "@/component/admin/AdminSidebar";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";

const AdminLayout = ({ children }) => {
  const [sideOpen, setSideOpen] = useState(true);

  const toggleidebar = () => {
    setSideOpen(!sideOpen);
  };
  return (
    <>
      <AdminHeader toggleidebar={toggleidebar} />
      <div className="d-flex">
        <div><AdminSidebar sideOpen={sideOpen} /></div>
        <div className="p-md-3 p-2 d-flex"  style={{ flexGrow: 1 }}>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
