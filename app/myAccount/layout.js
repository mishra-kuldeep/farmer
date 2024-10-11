"use client";
import React from "react";
import "./accountpage.css";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiProductHuntLine } from "react-icons/ri";
import { MdFormatListBulleted ,MdOutlineCleaningServices} from "react-icons/md";
import { PiVan } from "react-icons/pi";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import UserProfile from "@/component/myaccount/UserProfile";

import { FiHeart } from "react-icons/fi";

const AccountLayout = ({ children }) => {
  const user = useSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const SideBarList = [
    {
      id: 0,
      title: "My Profile",
      icon: <CgProfile size={22} />,
      goesTo: "/myAccount/myProfile",
      status: true,
    },
    {
      id: 1,
      title: "My Wishlist",
      icon: <FiHeart size={22} />,
      goesTo: "/myAccount/myWishList",
      status: true,
    },
    {
      id: 16,
      title: "Add Services",
      icon: <MdOutlineCleaningServices size={22} />,
      goesTo: "/myAccount/addvenderServices",
      status: user?.profile?.role === 6,
    },
    {
      id: 17,
      title: "Services List",
      icon: <MdFormatListBulleted size={22} />,
      goesTo: "/myAccount/listAddedServices",
      status: user?.profile?.role === 6,
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
      title: "Product List",
      icon: <MdFormatListBulleted size={22} />,
      goesTo: "/myAccount/listAddedProduct",
      status: user?.profile?.role === 2,
    },
    {
      id: 4,
      title: "My Order",
      icon: <HiOutlineShoppingBag size={22} />,
      goesTo: "/myAccount/myOrder",
      status: true,
    },
    {
      id: 5,
      title: "Ordered Product",
      icon: <PiVan size={22} />,
      goesTo: "/myAccount/orderedProduct",
      status: user?.profile?.role === 2,
    },
    {
      id: 6,
      title: "Add Vehicles",
      icon: <PiVan size={22} />,
      goesTo: "/myAccount/addVehicle",
      status: user?.profile?.role === 4,
    },
    {
      id: 7,
      title: "Vehicles List",
      icon: <PiVan size={22} />,
      goesTo: "/myAccount/vehicleList",
      status: user?.profile?.role === 4,
    },
    {
      id: 8,
      title: "Customer Order",
      icon: <HiOutlineShoppingBag size={22} />,
      goesTo: "/myAccount/customerOrder",
      status: user?.profile?.role === 4,
    },
  ];
  return (
    <>
      <div className=" pt-3">
        <div className="row px-md-3 m-0">
          <div className="col-md-2">
            <div className="accountsidebar pe-md-3">
              <h2> My Account</h2>
              <hr />
              <UserProfile />

              {SideBarList?.map((elem) => (
                <div
                  key={elem.id}
                  className={`${
                    pathname == elem.goesTo && "accListSideActive"
                  } accListSide`}
                  onClick={() => router.push(elem.goesTo)}
                  style={{ display: elem.status ? "flex" : "none" }}
                >
                  {elem.icon} <h6>{elem.title}</h6>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-10">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
