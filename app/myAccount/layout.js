"use client";
import React from "react";
import "./accountpage.css";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiProductHuntLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import UserProfile from "@/component/myaccount/UserProfile";

const AccountLayout = ({ children }) => {
  const user = useSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();

  const SideBarList = [
    {
      id: 1,
      title: "My Profile",
      icon: <CgProfile size={22} />,
      goesTo: "/myAccount/myProfile",
      status: true,
    },
    {
      id: 2,
      title: "Add Product",
      icon: <RiProductHuntLine size={22} />,
      goesTo: "/myAccount/addProduct",
      status: user?.profile?.role === 2,
    },
    {
      id: 3,
      title: "My Order",
      icon: <HiOutlineShoppingBag size={22} />,
      goesTo: "/myAccount/myOrder",
      status: true,
    },
  ];
  return (
    <>
      <div className="container pt-md-4">
        <div className="row ">
          <div className="col-md-3">
            <div className="accountsidebar">
              <h2> My Account</h2>
              <hr />
              <UserProfile/>
              
              {SideBarList?.map((elem) => (
                <div
                  key={elem.id}
                  className={`${
                    pathname == elem.goesTo && "accListSideActive"
                  } accListSide`}
                  onClick={() => router.push(elem.goesTo)}
                  style={{display:elem.status?"flex":"none"}}
                >
                  {elem.icon} <h6>{elem.title}</h6>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-9">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
