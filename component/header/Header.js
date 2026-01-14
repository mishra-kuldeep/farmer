"use client";
import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import logo from "../../public/header/logo1.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { isMobile } from "react-device-detect";
import HeaderForMobile from "./HeaderForMobile";
import HeaderTopForMobile from "./HeaderTopForMobile";
import Search from "../reusableComponent/search/Search";
import Category from "../reusableComponent/category/Category";
import Auth from "../auth/Auth";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, fetchUserInfo } from "@/redux/auth/authSlice";
import { deleteCookie } from "@/helper/common";
import { clearCart, getCart } from "@/redux/cart/cartSlice";
import { IoIosArrowDown, IoIosHeadset } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import vendorMasterServices from "@/services/vendorMasterServices";
import VehicleMasterServices from "@/services/VehicleMasterServices";
import CountryServices from "@/services/CountryServices";
import { fetchCountry } from "@/redux/country/countrySlice";
function Header() {
  const user = useSelector((state) => state.auth);
  const menuRef = useRef(null);
  const [venderList, setVenderList] = useState([]);
  const [transporterList, setTransporterList] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const cart = useSelector((state) => state.cart);
  const country = useSelector((state) => state.country);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        let moving = window.pageYOffset;
        // Show the header when at the top (position === 0), otherwise hide it
        if (moving < 80) {
          setVisible(true); // Show the header
        } else {
          setVisible(false); // Toggle visibility based on scrolling direction
        }

        setPosition(moving); // Update position state
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [position]);

  useEffect(() => {
    // if (!user.isLoggedIn && dispatch && !user.isLoading) {
    if (!user.isLoggedIn && dispatch && !user.isLoading) {
      dispatch(fetchUserInfo());
      const res = fetch("https://ipapi.co/json/").then((data) => {
        data.json().then((countrys) => {
          CountryServices.getAllCountry().then((data) => {
            const country = data.data.find(
              (ele) => ele.countryCode == countrys.country_code
            );
            dispatch(fetchCountry(country));
          });
        });
      });
      // const data = await res.;
    } else if (user.isLoggedIn && user?.profile) {
      dispatch(getCart(user?.profile?.UserCode || user?.profile?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoggedIn, user?.profile?.UserCode, user?.profile?.id]);

  const handleLogout = () => {
    deleteCookie("token");
    dispatch(clearUser()); // Action to clear user data in Redux
    dispatch(clearCart()); // Action to clear user cart in Redux
    router.push("/"); // Redirect to the login page
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
  console.log(user?.profile?.role)
  const HeaderMenu = [
    {
      id: 1,
      title: "Farmers",
      status: !user.isLoggedIn,
    },
    {
      id: 11,
      title: "Farmers",
      status: user?.profile?.role === 'RL0002' || user?.profile?.role == 2,
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
        // {
        //   id: 11,
        //   title: "Ongoing Orders",
        //   goesTo: "/myAccount/orderedProduct",
        //   status: true,
        // },
        // {
        //   id: 12,
        //   title: "Completed Orders",
        //   goesTo: "/myAccount/reports/farmarReports/totalSaleProduct",
        //   status: true,
        // },
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
      status: user?.profile?.role === 'RL0003' || user?.profile?.role == 3,
      subMenu: [
        // {
        //   id: 11,
        //   title: "My order",
        //   goesTo: "/myAccount/myOrder",
        //   status: true,
        // },
        // {
        //   id: 12,
        //   title: "My wishList",
        //   goesTo: "/myAccount/myWishList",
        //   status: true,
        // },
        // {
        //   id: 11,
        //   title: "Purchase History",
        //   goesTo: "/myAccount/reports/buyerReports/totalPurchase",
        //   status: true,
        // },
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
      id: 41,
      title: "Transporter",
      status: user?.profile?.role === 'RL0004' || user?.profile?.role == 4,
      subMenu: [
        {
          id: 42,
          title: "Add Vehicles",
          goesTo: "/myAccount/addVehicle",
          status: true,
        },
        {
          id: 43,
          title: "Vehicles List",
          goesTo: "/myAccount/vehicleList",
          status: true,
        },
        // {
        //   id: 44,
        //   title: "Customer Order",
        //   goesTo: "/myAccount/customerOrder",
        //   status: true,
        // },
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
      id: 4,
      title: "Transportation",
      status:
        !user.isLoggedIn ||
        (user?.profile?.role !== 'RL0004' && user?.profile?.role != 4) ||
        user?.profile?.role == 'RL0003' || user?.profile?.role == 3 ||
        user?.profile?.role == 'RL0002' || user?.profile?.role == 2 ||
        user?.profile?.role != 'RL0006' || user?.profile?.role != 6,
      subMenu: transporterList,
    },
    {
      id: 1,
      title: "Farm Lands",
      status:
        !user.isLoggedIn ||
        user?.profile?.role == 'RL0002' || user?.profile?.role == 2 ||
        user?.profile?.role == 'RL0003' || user?.profile?.role == 3 ||
        user?.profile?.role == 'RL0004' || user?.profile?.role == 4,
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
          status: user?.profile?.role == 'RL0002' || user?.profile?.role == 2,
        },
        {
          id: 123,
          title: "List of added ads",
          goesTo: "/myAccount/FarmLandList",
          status: user?.profile?.role == 'RL0002' || user?.profile?.role == 2,
        },
      ],
    },

    {
      id: 5,
      title: "Vendor",
      status:
        !user.isLoggedIn ||
        user?.profile?.role == 'RL0006' || user?.profile?.role == 6 ||
        user?.profile?.role == 'RL0003' || user?.profile?.role == 3 ||
        user?.profile?.role == 'RL0002' || user?.profile?.role == 2,
      subMenu: [...venderList,
      {
        id: 122,
        title: "Add Vender Services",
        goesTo: "/myAccount/addvenderServices",
        status: user?.profile?.role == 'RL0006' || user?.profile?.role == 6,
      },
      {
        id: 122,
        title: "List of added Services",
        goesTo: "/myAccount/listAddedServices",
        status: user?.profile?.role == 'RL0006' || user?.profile?.role == 6,
      },
      {
        id: 122,
        title: "Add ads",
        goesTo: "/myAccount/addFarmLands",
        status: user?.profile?.role == 'RL0006' || user?.profile?.role == 6,
      },
      {
        id: 123,
        title: "List of added ads",
        goesTo: "/myAccount/FarmLandList",
        status: user?.profile?.role == 'RL0006' || user?.profile?.role == 6,
      },]
    },
    {
      id: 6,
      title: "Fertilizers & Pesticides",
      status:
        !user.isLoggedIn ||
        user?.profile?.role == 'RL0004' || user?.profile?.role == 4 ||
        user?.profile?.role == 'RL0003' || user?.profile?.role == 3 ||
        user?.profile?.role == 'RL0002' || user?.profile?.role == 2 ||
        user?.profile?.role == 'RL0009' || user?.profile?.role == 9,
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
          status: user?.profile?.role == 'RL0009' || user?.profile?.role == 9,
        },
        {
          id: 1227,
          title: "List of Fertilizers Pesticides",
          goesTo: "/myAccount/FertilizersPesticidesList",
          status: user?.profile?.role == 'RL0009' || user?.profile?.role == 9,
        },
        {
          id: 122,
          title: "Add ads",
          goesTo: "/myAccount/addFarmLands",
          status: user?.profile?.role == 'RL0009' || user?.profile?.role == 9,
        },
        {
          id: 123,
          title: "List of added ads",
          goesTo: "/myAccount/FarmLandList",
          status: user?.profile?.role == 'RL0009' || user?.profile?.role == 9,
        },
      ],
    },
  ];

  const cls = visible ? "visible" : "hidden";
  const cls2 = !visible ? "visible" : "hidden";

  const toggleSubMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  // Detect outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null); // Close the submenu if click is outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);



  return (
    <>
      {!isMobile ? (
        <div className="mainHeaderWrapper">
          <header className={`${cls} d-block`}>
            <div style={{ backgroundColor: "var(--light)", padding: "10px" }}>
              <div className="container">
                <div className="row w-100 m-0">
                  <div
                    className="col-md-2 d-flex align-items-center p-0 cursor"
                    onClick={() => router.push("/")}
                  >
                    <img src={logo.src} alt="logo" className="logoImage" />
                    <h6 className="logoImage_title">
                      <span className="fs-4">F</span>armers
                      <span className="fs-4">M</span>arket
                    </h6>
                  </div>
                  <div className="col-md-8 p-0 px-4">
                    <Search />
                  </div>
                  <div className="col-md-2 p-0">
                    <div className="d-flex justify-content-end gap-3 align-items-center">
                      {user.profile === null ? (
                        <Auth />
                      ) : (
                        <>

                          <h6
                            className="mt-1"
                            style={{ textTransform: "capitalize" }}
                          >
                            {user?.profile?.name.split(" ")[0]}
                          </h6>
                          <div
                            className="avtar"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {user?.profile?.name?.substring(0, 1)}
                          </div>
                          <ul
                            className="dropdown-menu p-0"
                          // style={{ right: "0px", width: "100px", top: "10px" ,inset: "0px 0 auto 0px"}}
                          >
                            <p className="cat_list_disable">
                              {user?.profile?.name}
                            </p>
                            {user?.profile?.role === "RL0001" && (
                              <p
                                className="cat_list"
                                onClick={() => router.push("/admin")}
                              >
                                Dashboard
                              </p>
                            )}
                            {user?.isLoggedIn && user?.profile?.role !== "RL0001" && (
                              <>
                                <p
                                  className="cat_list"
                                  onClick={() => router.push("/myAccount")}
                                >
                                  My Account
                                </p>
                                <p
                                  className="cat_list"
                                  onClick={() =>
                                    router.push(
                                      user?.profile?.role != 'RL0002' && user?.profile?.role != 2
                                        ? "/myAccount/CompanyProfile"
                                        : "/myAccount/myProfile"
                                    )
                                  }
                                >
                                  My Profile
                                </p>
                                {user?.isLoggedIn && (
                                  <p
                                    className="cat_list"
                                    onClick={() =>
                                      router.push("/myAccount/myWishList")
                                    }
                                  >
                                    My Wishlist
                                  </p>
                                )}
                                <p
                                  className="cat_list"
                                  onClick={() => router.push("/basket")}
                                >
                                  My Basket ({cart?.cart?.length}) item
                                </p>
                              </>
                            )}
                            <p className="cat_list" onClick={handleLogout}>
                              logout
                            </p>
                          </ul>
                        </>
                      )}
                      <button
                        className="cart_login_btn "
                        onClick={() => router.push("/basket")}
                      >
                        <FaShoppingCart size={18} />
                        {cart?.cart?.length > 0 ? (
                          <span className="cart-count">
                            {cart?.cart?.length}
                          </span>
                        ) : (
                          <span className="cart-count">0</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "#fff", padding: "10px" }}>
              <div className="container">
                <div className="row m-0 w-100">
                  <div className="col-md-2 p-0">
                    <div className="btn-group">
                      <button
                        className="btn btn-secondary btn-sm dropdown-toggle px=2"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Shop by Category &ensp; &ensp;
                      </button>

                      <ul className="dropdown-menu">
                        <Category />
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-9 p-0">
                    <div className="category_inline_header" ref={menuRef}>
                      {HeaderMenu?.map((ele, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            ele?.goesTo && router.push(ele?.goesTo)
                          }
                        >
                          <p
                            className={`${openMenuIndex === index ? "activee" : ""
                              }`}
                            onClick={() => toggleSubMenu(index)}
                            style={{
                              cursor: "pointer",
                              position: "relative",
                              display: !ele?.status && "none",
                            }}
                          >
                            {ele?.title}
                            {ele?.subMenu && (
                              <span>
                                {" "}
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
                              className="shadow"
                              style={{
                                position: "absolute",
                                top: "110px",
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: "0px 0px 7px 7px",
                              }}
                            >
                              {ele?.subMenu?.map((subEle, subIndex) => (
                                subEle?.status && (
                                  <div
                                    onClick={() => {
                                      router.push(subEle?.goesTo);
                                      toggleSubMenu(index);
                                    }}
                                    className="px-3 py-1 cursor submenu"
                                    key={subIndex}
                                  >
                                    {subEle?.title}
                                  </div>)
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-1 p-0">
                    <button
                      className="offerZoneBtn centerAllDiv"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={() => router.push("/ads-category")}
                    >
                      <IoIosHeadset size={20} className="me-2" />
                      All Ads
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <header className={cls2}>
            <div className="container p-2">
              <div className="row m-0 align-items-center">
                <div className="col-md-2 d-flex align-items-center p-0">
                  <img src={logo.src} alt="logo" className="logoImage" />
                  <h6 className="logoImage_title">
                    <span className="fs-4">F</span>armers
                    <span className="fs-4">M</span>arket
                  </h6>
                </div>
                <div className="col-md-2">
                  <div className="btn-group">
                    <button
                      className="btn btn-secondary btn-sm dropdown-toggle px=2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      shop by category &ensp; &ensp;
                    </button>

                    <ul className="dropdown-menu">
                      <Category />
                    </ul>
                  </div>
                </div>
                <div className="col-md-7">
                  <Search />
                </div>
                <div className="col-md-1 p-0">
                  <button
                    className="cart_login_btn w-100"
                    onClick={() => router.push("/basket")}
                  >
                    <FaShoppingCart size={18} className="me-2" />
                    {cart?.cart?.length > 0 ? (
                      <span className="">{cart?.cart?.length}</span>
                    ) : (
                      0
                    )}{" "}
                    items
                  </button>
                </div>
              </div>
            </div>
          </header>
        </div>
      ) : (
        <>
          <HeaderTopForMobile />
          {!pathname.includes("/product") && <HeaderForMobile />}
        </>
      )}
    </>
  );
}

export default Header;
