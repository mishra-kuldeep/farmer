import React, { useEffect, useState } from "react";
import "./adminHeader.css";
import { IoMenu } from "react-icons/io5";
import logo from "../../public/header/logo1.jpg";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, fetchUserInfo } from "@/redux/auth/authSlice";
import { deleteCookie } from "@/helper/common";

const AdminHeader = ({ toggleidebar }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const router = useRouter();

    useEffect(() => {
      if (!user.isLoggedIn && dispatch && !user.isLoading) {
        dispatch(fetchUserInfo());
      } 
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.isLoggedIn, user?.profile]);

    const handleLogout = () => {
        deleteCookie("token");
        dispatch(clearUser()); // Action to clear user data in Redux
        router.push("/"); // Redirect to the login page
      };

  return (
    <div className="adminHeaderWrapper row m-0">
      <div className="col-md-10 d-flex jutify-content-center align-items-center">
        <IoMenu
          fontSize={25}
          color="var(--adminwhite)"
          className="cursor"
          onClick={toggleidebar}
        />
        <div className="centerAllDiv cursor" onClick={() => router.push("/")}>
          <img
            src={logo.src}
            alt="logo"
            style={{
              borderRadius: "50%",
              height: "50px",
              marginInline: "20px",
            }}
          />
          <h6 className="text-light">
            <span className="fs-4">F</span>armers
            <span className="fs-4">M</span>arket
          </h6>
        </div>
      </div>

      <div className="col-md-2 ps-5 d-flex gap-2 align-items-center">
        <h6 className="mt-1 text-light" style={{ textTransform: "capitalize" }}>
          {user?.profile?.name.split(" ")[0]}
        </h6>
        <div className="avtar bg-white text-dark d-flex jutify-content-center align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
          <p className="ms-2 ps-1">{user?.profile?.name?.substring(0, 1)}</p>
        </div>
        <ul
          className="dropdown-menu p-0"
          // style={{ right: "0px", width: "100px", top: "10px" ,inset: "0px 0 auto 0px"}}
        >
          <p className="cat_list_disable text-center" style={{height:"35px",lineHeight:"35px"}}>{user?.profile?.name}</p>
          <div className=" p-0 m-0 text-center cursor" style={{height:"35px",lineHeight:"35px"}} onClick={handleLogout}>
            logout
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
