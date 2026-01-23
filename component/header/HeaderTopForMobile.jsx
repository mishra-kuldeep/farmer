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
          status: true, // Assuming the role condition applies here
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
          status: true, // Assuming the role condition applies here
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
      status:
        !user.isLoggedIn,
    },
    {
      id: 11,
      title: "Farmers",
      status: user?.profile?.role === 2,
      subMenu: [
        {
          id: 11,
          title: "Sell product",
          goesTo: "/myAccount/addProduct",
          status: true,
        },
        {
          id: 12,
          title: "List of sell product",
          goesTo: "/myAccount/listAddedProduct",
          status: true,
        },
        {
          id: 11,
          title: "Ongoing Orders",
          goesTo: "/myAccount/orderedProduct",
          status: true,
        },
        {
          id: 12,
          title: "Completed Orders",
          goesTo: "/myAccount/reports/farmarReports/totalSaleProduct",
          status: true,
        },
        {
          id: 122,
          title: "Add FarmLand",
          goesTo: "/myAccount/addFarmLands",
          status: true,
        },
        {
          id: 123,
          title: "Farm Land List",
          goesTo: "/myAccount/FarmLandList",
          status: true,
        },
      ],
    },
    {
      id: 2,
      title: "Buyer",
      status: !user.isLoggedIn,
    },
    {
      id: 11,
      title: "Buyer",
      status: user?.profile?.role === 3,
      subMenu: [
        {
          id: 11,
          title: "My order",
          goesTo: "/myAccount/myOrder",
          status: true,
        },
        {
          id: 12,
          title: "My wishList",
          goesTo: "/myAccount/myWishList",
          status: true,
        },
        {
          id: 11,
          title: "Purchase History",
          goesTo: "/myAccount/reports/buyerReports/totalPurchase",
          status: true,
        },
        {
          id: 122,
          title: "Add ads",
          goesTo: "/myAccount/addFarmLands",
          status: true,
        },
        {
          id: 123,
          title: "List of added ads",
          goesTo: "/myAccount/FarmLandList",
          status: true,
        },
      ],
    },
    {
      id: 1,
      title: "Farm Lands",
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
          status: true,
        },
        {
          id: 12,
          title: "Plots",
          goesTo: "/adverts/17",
          status: true,
        },
        {
          id: 12,
          title: "Farm Lands",
          goesTo: "/adverts/18",
          status: true,
        },
        {
          id: 122,
          title: "Add ads",
          goesTo: "/myAccount/addFarmLands",
          status: user?.profile?.role == 2,
        },
        {
          id: 123,
          title: "List of added ads",
          goesTo: "/myAccount/FarmLandList",
          status: user?.profile?.role == 2,
        },
      ],
    },


    {
      id: 4,
      title: "Transportation",
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
      status:
        !user.isLoggedIn ||
        user?.profile?.role == 6 ||
        user?.profile?.role == 3 ||
        user?.profile?.role == 2,
      subMenu: [...venderList,
      {
        id: 122,
        title: "Add Vender Services",
        goesTo: "/myAccount/addvenderServices",
        status: user?.profile?.role == 6,
      },
      {
        id: 122,
        title: "List of added Services",
        goesTo: "/myAccount/listAddedServices",
        status: user?.profile?.role == 6,
      },
      {
        id: 122,
        title: "Add ads",
        goesTo: "/myAccount/addFarmLands",
        status: user?.profile?.role == 6,
      },
      {
        id: 123,
        title: "List of added ads",
        goesTo: "/myAccount/FarmLandList",
        status: user?.profile?.role == 6,
      },]
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
          status: true,
        },
        {
          id: 32,
          title: "Dealers(Small Orders)",
          goesTo: "/fertilizers-pesticides/2",
          status: true,
        },
        {
          id: 33,
          title: "Retailer",
          goesTo: "/fertilizers-pesticides/3",
          status: true,
        },

        {
          id: 1225,
          title: " Add Fertilizers Pesticides",
          goesTo: "/myAccount/addFertilizersPesticides",
          status: user?.profile?.role == 9,
        },
        {
          id: 1227,
          title: "List of Fertilizers Pesticides",
          goesTo: "/myAccount/FertilizersPesticidesList",
          status: user?.profile?.role == 9,
        },
        {
          id: 122,
          title: "Add ads",
          goesTo: "/myAccount/addFarmLands",
          status: user?.profile?.role == 9,
        },
        {
          id: 123,
          title: "List of added ads",
          goesTo: "/myAccount/FarmLandList",
          status: user?.profile?.role == 9,
        },
      ],
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
              className={`${opennavs
                ? "headerdropdownmenusclose"
                : "headerdropdownmenusopen"
                }`}
            >
              {HeaderMenu?.map((ele, index) => (
                ele?.status && (
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
                      // display: !ele?.status && "none",
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
                      style={{ backgroundColor: "#f2f2f2", marginTop: "15px" }}
                    >
                      {ele?.subMenu?.map((subEle, subIndex) => (
                        subEle?.status && (
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
                        )
                      ))}
                    </div>
                  )}
                </div>)
              ))}
            </ul>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center p-0" onClick={() => router.push("/")}>
          <img src={logo.src} alt="logo" className="logoImage" />
          <h6 className="logoImage_title">
            <span className="fs-4">F</span>armers
            <span className="fs-4">M</span>arket
          </h6>
        </div>
        <div className="col-5 p-0">
          <div className="d-flex justify-content-end align-items-center gap-2">
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
                  {/* My Basket link removed */}
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
