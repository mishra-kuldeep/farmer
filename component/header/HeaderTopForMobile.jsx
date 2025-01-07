import React, { useEffect, useState } from "react";
import logo from "../../public/header/logo1.jpg";
import { IoMenu } from "react-icons/io5";
import Auth from "../auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { clearUser } from "@/redux/auth/authSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import vendorMasterServices from "@/services/vendorMasterServices";
import VehicleMasterServices from "@/services/VehicleMasterServices";
import { deleteCookie } from "@/helper/common";

const HeaderTopForMobile = () => {
  const user = useSelector((state) => state.auth);
  const router = useRouter();
  const [transporterList, setTransporterList] = useState([]);
  const [venderList, setVenderList] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [opennavs, setopennavs] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    deleteCookie("token");
    dispatch(clearUser()); // Action to clear user data in Redux
    router.push("/"); // Redirect to the login page
  };

  const toggleSubMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const initApi = () => {
    vendorMasterServices
      .getAllactiveVendor(1)
      .then(({ data }) => {
        const transformedData = data.map((service) => ({
          id: service.VendorServicesMasterId,
          title: service.type,
          goesTo: `/vender/${service.VendorServicesMasterId}`,
          status: user?.profile?.role === 4, // Assuming the role condition applies here
        }));
        setVenderList(transformedData);
      })
      .catch((err) => console.log(err));

    VehicleMasterServices.getVehicle()
      .then(({ data }) => {
        const transformedData = data.map((service) => ({
          id: service.VendorServicesMasterId,
          title: service.type,
          goesTo: `/transporter/${service.vehicleId}`,
          status: user?.profile?.role === 4, // Assuming the role condition applies here
        }));
        setTransporterList(transformedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => initApi(), []);

  const HeaderMenu = [
    {
      id: 1,
      title: "Farmers",
      // goesTo: "/myAccount/myProfile",
      status:
        !user.isLoggedIn ||
        (user?.profile?.role === 2 && user?.profile?.role !== 3),
      // subMenu:[
      //   {
      //     id: 11,
      //     title: "Vegitable and Fruit",
      //     goesTo: "/myAccount/myProfile",
      //     status: user?.profile?.role === 2,
      //   },
      //   {
      //     id: 12,
      //     title: "Plots",
      //     goesTo: "/myAccount/myProfile",
      //     status: user?.profile?.role === 2,
      //   },
      // ]
    },
    {
      id: 1,
      title: "Farm Lands",
      // goesTo: "/myAccount/myProfile",
      status:
        !user.isLoggedIn ||
        user?.profile?.role == 2 ||
        user?.profile?.role == 3 ||
        user?.profile?.role == 4,
      subMenu: [
        {
          id: 11,
          title: "Agricultural lands",
          goesTo: "/adverts/16",
          status: user?.profile?.role === 2,
        },
        {
          id: 12,
          title: "Plots",
          goesTo: "/adverts/17",
          status: user?.profile?.role === 2,
        },
        {
          id: 12,
          title: "Farm Lands",
          goesTo: "/adverts/18",
          status: user?.profile?.role === 2,
        },
      ],
    },
    {
      id: 2,
      title: "Buyer",
      // goesTo: "/myAccount/addProduct",
      status: !user.isLoggedIn || user?.profile?.role === 3,
    },

    {
      id: 4,
      title: "Transportation",
      // goesTo: "/myAccount/listAddedProduct",
      status:
        !user.isLoggedIn ||
        user?.profile?.role == 4 ||
        user?.profile?.role == 3 ||
        user?.profile?.role == 2,
      subMenu: transporterList,
    },
    {
      id: 5,
      title: "Vendor",
      // goesTo: "/myAccount/listAddedProduct",
      status:
        !user.isLoggedIn ||
        user?.profile?.role == 6 ||
        user?.profile?.role == 3 ||
        user?.profile?.role == 2,
      subMenu: venderList,
    },
    {
      id: 6,
      title: "Fertilizers & Pesticides",
      // goesTo: "/myAccount/listAddedProduct",
      status:
        !user.isLoggedIn ||
        user?.profile?.role == 4 ||
        user?.profile?.role == 3 ||
        user?.profile?.role == 2 ||
        user?.profile?.role == 9,
      subMenu: [
        {
          id: 31,
          title: "Distributors(Bulk orders)",
          goesTo: "/fertilizers-pesticides/1",
          status: user?.profile?.role == 4 || 3,
        },
        {
          id: 32,
          title: "Dealers(Small Orders)",
          goesTo: "/fertilizers-pesticides/2",
          status: user?.profile?.role == 4 || 3,
        },
        {
          id: 33,
          title: "Retailer",
          goesTo: "/fertilizers-pesticides/3",
          status: user?.profile?.role == 4 || 3,
        },
      ],
    },
    {
      id: 3,
      title: "Ads",
      goesTo: "/ads-category",
      status: true,
    },
  ];
  return (
    <div className="mobile_Header container">
      <div className="row m-0 align-items-center" style={{ height: "50px" }}>
        <div className="col-1 p-0">
          <div className="dropdown">
            <div onClick={() => setopennavs(!opennavs)}>
              <IoMenu size={20} />
            </div>
            <ul
              className={`${
                opennavs
                  ? "headerdropdownmenusclose"
                  : "headerdropdownmenusopen"
              }`}
            >
              {HeaderMenu?.map((ele, index) => (
                <div
                  key={index}
                  onClick={() => ele?.goesTo && router.push(ele?.goesTo)}
                >
                  <p
                    className={`${openMenuIndex === index ? "activee" : ""}`}
                    onClick={() => {
                      toggleSubMenu(index);
                      !ele?.subMenu && setopennavs(false);
                    }}
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      display: !ele?.status && "none",
                    }}
                  >
                    {ele?.title}
                    {ele?.subMenu && (
                      <span>
                        {openMenuIndex !== index ? (
                          <IoIosArrowDown />
                        ) : (
                          <IoIosArrowUp />
                        )}
                      </span>
                    )}
                  </p>
                  {openMenuIndex === index && (
                    <div
                      style={{ backgroundColor: "#f2f2f2", marginTop: "20px" }}
                    >
                      {ele?.subMenu?.map((subEle, subIndex) => (
                        <div
                          onClick={() => {
                            router.push(subEle?.goesTo);
                            setopennavs(false);
                          }}
                          className="px-3 py-1 cursor"
                          key={subIndex}
                        >
                          {subEle?.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* {user?.profile?.role == 2 && (
                <li className="dropdown-item">Farmers</li>
              )}
              {user?.profile?.role == 3 && (
                <li className="dropdown-item">Buyers</li>
              )}
              {(user?.profile?.role == 2 || user?.profile?.role == 3) && (
                <li className="dropdown-item">Farm Lands</li>
              )}
              <li className="dropdown-item">Transportation</li>
              <li className="dropdown-item">Employee</li>
              <li className="dropdown-item">Vendors</li>
              <li className="dropdown-item">Educational Resources</li>
              <li className="dropdown-item">Customer Care</li> */}
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
          <div className="d-flex justify-content-end align-items-center gap-2">
            {/* <button className="login_btn px-3">login / Signup</button> */}
            {user.profile === null ? (
              <Auth />
            ) : (
              <>
                <h6 className="mt-1">{user?.profile?.name.split(" ")[0]}</h6>
                <div
                  className="avtar"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.profile?.name?.substring(0, 1)}
                </div>
                <ul
                  className="dropdown-menu p-0"
                  style={{ right: "0%", width: "auto", top: "10px" }}
                >
                  <p
                    className="cat_list1"
                    onClick={() => router.push("/myAccount")}
                  >
                    My Account
                  </p>
                  <p
                    className="cat_list1"
                    onClick={() =>
                      router.push(
                        user?.profile?.role !== 2
                          ? "/myAccount/myProfile"
                          : "/myAccount/CompanyProfile"
                      )
                    }
                  >
                    My Profile
                  </p>
                  <p
                    className="cat_list1"
                    onClick={() => router.push("/basket")}
                  >
                    My Basket (0) item
                  </p>
                  <p className="cat_list1" onClick={handleLogout}>
                    logout
                  </p>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopForMobile;
