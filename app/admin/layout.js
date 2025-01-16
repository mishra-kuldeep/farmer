"use client";
import AdminHeader from "@/component/admin/AdminHeader";
import AdminSidebar from "@/component/admin/AdminSidebar";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";

const AdminLayout = ({ children }) => {
  const [sideOpen, setSideOpen] = useState(true);

  const toggleidebar = (data) => {
    setSideOpen(data);
  };
  return (
    <>
      <AdminHeader toggleidebar={toggleidebar} sideOpen={sideOpen}/>
      <div className="d-flex">
        <div><AdminSidebar sideOpen={sideOpen} toggleidebar={toggleidebar} /></div>
      <div className="p-md-3 p-2"  style={{ flexGrow: 1 }}>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
