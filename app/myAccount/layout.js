"use client";
import React from "react";
import "./accountpage.css";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiProductHuntLine } from "react-icons/ri";
import {
  MdFormatListBulleted,
  MdOutlineCleaningServices,
} from "react-icons/md";
import { PiVan } from "react-icons/pi";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import UserProfile from "@/component/myaccount/UserProfile";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { CiBoxList } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";
import { AiTwotoneDashboard } from "react-icons/ai";
const AccountLayout = ({ children }) => {
  const user = useSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const SideBarList = [
    {
      id: 21,
      title: "Dashboard",
      icon: <AiTwotoneDashboard size={22} />,
      goesTo:"/myAccount",
      status: true,
    },
    {
      id: 0,
      title: "My Profile",
      icon: <CgProfile size={22} />,
      goesTo:
        user?.profile?.role == 2
          ? "/myAccount/myProfile"
          : "/myAccount/CompanyProfile",
      status: true,
    },
    {
      id: 4,
      title: "My Order",
      icon: <HiOutlineShoppingBag size={22} />,
      goesTo: "/myAccount/myOrder",
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
      id: 5,
      title: "Ongoing Orders",
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
    {
      id: 9,
      title: "Fertilizers Pesticides  ",
      icon: <IoIosAddCircleOutline size={22} />,
      goesTo: "/myAccount/addFertilizersPesticides",
      status: user?.profile?.role === 9,
    },
    {
      id: 11,
      title: "Fertilizers Pesticides List ",
      icon: <CiBoxList size={22} />,
      goesTo: "/myAccount/FertilizersPesticidesList",
      status: user?.profile?.role === 9,
    },
    {
      id: 14,
      title: "Completed Orders",
      icon: <CiBoxList size={22} />,
      goesTo: "/myAccount/reports/farmarReports/totalSaleProduct",
      status: user?.profile?.role === 2,
    },
    {
      id: 15,
      title: "Purchase History",
      icon: <CiBoxList size={22} />,
      goesTo: "/myAccount/reports/buyerReports/totalPurchase",
      status: user?.profile?.role === 3,
    },
    {
      id: 22,
      title: "Transportation History",
      icon: <CiBoxList size={22} />,
      goesTo: "/myAccount/reports/buyerReports/transportDetails",
      status: user?.profile?.role === 3,
    },
    {
      id: 12,
      title: "Add Ads ",
      icon: <IoMdAddCircle size={22} />,
      goesTo: "/myAccount/addFarmLands",
      status: true,
    },
    {
      id: 13,
      title: "Ads List ",
      icon: <CiBoxList size={22} />,
      goesTo: "/myAccount/FarmLandList ",
      status: true,
    },
  ];
  return (
    <>
      <div className=" pt-3">
        <div className="row m-0">
          <div className="col-md-2">
            <div className="accountsidebar ">
              <h5 className="text-center mb-0"> My Account</h5>
              <hr className="m-2 p-0"/>
              <UserProfile />

             <div className="accsidescroll">
             {SideBarList?.map((elem) => (
                <div
                  key={elem.id}
                  className={`${
                    pathname == elem.goesTo && "accListSideActive p-2"
                  } accListSide p-2`}
                  onClick={() => router.push(elem.goesTo)}
                  style={{ display: elem.status ? "flex" : "none" }}
                >
                  {elem.icon} <h6>{elem.title}</h6>
                </div>
              ))}
              </div>

            </div>
          </div>
          <div className="col-md-10">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
