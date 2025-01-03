"use client";
import React, { useEffect, useState } from "react";
import "./accountpage.css";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiProductHuntLine } from "react-icons/ri";
import {
  MdFormatListBulleted,
  MdMenu,
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
import { RiMenuFold4Line } from "react-icons/ri";
import { isMobile } from "react-device-detect";
import { RxCross2 } from "react-icons/rx";

const AccountLayout = ({ children }) => {
  const user = useSelector((state) => state.auth);
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const SideBarList = [
    {
      id: 0,
      title: "Dashboard",
      icon: <AiTwotoneDashboard size={22} />,
      goesTo: "/myAccount",
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
      id: 15,
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
  useEffect(() => {
    isMobile && setOpen(false);
  }, []);
  return (
    <>
      <div className=" pt-3">
        <div className="row m-0">
          {open && (
            <div className="col-md-2 pe-0">
              <div className="accountsidebar ">
                <div className="d-flex justify-content-between">
                  <h5 className="text-center mb-0"> My Account</h5>
                  <div
                    onClick={() => setOpen(false)}
                    className="cursor p-1 me-2"
                    style={{ backgroundColor: "#999" }}
                  >
                    <RxCross2 size={20} color="#fff" />
                  </div>
                </div>
                <hr className="m-2 p-0" />
                <UserProfile />

                <div className="accsidescroll">
                  {SideBarList?.map((elem) => (
                    <div
                      key={elem.id}
                      className={`${
                        pathname == elem.goesTo && "accListSideActive p-2"
                      } accListSide p-2`}
                      onClick={() => {
                        router.push(elem.goesTo);
                       isMobile&& setOpen(false);
                      }}
                      style={{ display: elem.status ? "flex" : "none" }}
                    >
                      {elem.icon} <h6>{elem.title}</h6>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div
            className={`${
              open ? "col-md-10" : "col-md-12 px-md-5"
            } position-relative`}
          >
            {!open && (
              <span
                className="p-2 cursor"
                style={{
                  backgroundColor: "#999",
                  position: "absolute",
                  left: "0px",
                  top: "-16px",
                  zIndex:800
                }}
                onClick={() => setOpen(true)}
              >
                <RiMenuFold4Line size={20} color="#fff" />
              </span>
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
