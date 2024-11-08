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
import { IoIosArrowDown } from "react-icons/io";
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
            dispatch(fetchCountry(country))
            console.log(country);
            
          });
        });
      });
      // const data = await res.;
    } else if (user.isLoggedIn && user?.profile) {
      dispatch(getCart(user?.profile?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoggedIn, user?.profile]);

  const handleLogout = () => {
    deleteCookie("token");
    dispatch(clearUser()); // Action to clear user data in Redux
    dispatch(clearCart()); // Action to clear user cart in Redux
    router.push("/"); // Redirect to the login page
  };

  const initApi = () => {
    vendorMasterServices
      .getAllVendor()
      .then(({ data }) => {
        console.log(data);
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
          goesTo: "/myAccount/myProfile",
          status: user?.profile?.role === 4, // Assuming the role condition applies here
        }));
        setTransporterList(transformedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => initApi(), []);

  console.log(venderList);

  const HeaderMenu = [
    {
      id: 1,
      title: "Farmers",
      goesTo: "/myAccount/myProfile",
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
      goesTo: "/myAccount/myProfile",
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
      goesTo: "/myAccount/addProduct",
      status: !user.isLoggedIn || user?.profile?.role === 3,
    },
    {
      id: 3,
      title: "Transportation",
      goesTo: "/myAccount/listAddedProduct",
      status:
        !user.isLoggedIn ||
        user?.profile?.role == 4 ||
        user?.profile?.role == 3 ||
        user?.profile?.role == 2,
      subMenu: transporterList,
    },
    {
      id: 4,
      title: "Vendor",
      goesTo: "/myAccount/listAddedProduct",
      status: !user.isLoggedIn || user?.profile?.role == 6 ||user?.profile?.role == 3,
      subMenu: venderList,
      //  [
      //   {
      //     id: 31,
      //     title: "Cold Storage",
      //     goesTo: "/myAccount/myProfile",
      //     status: user?.profile?.role == 4,
      //   },
      //   {
      //     id: 32,
      //     title: "Machinary",
      //     goesTo: "/myAccount/myProfile",
      //     status: user?.profile?.role == 4,
      //   },
      // ],
    },
    {
      id: 6,
      title: "Fertilizers & Pesticides",
      goesTo: "/myAccount/listAddedProduct",
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
  console.log(
    user?.profile?.role === 2
      ? "/myAccount/myProfile"
      : "/myAccount/CompanyProfile"
  );
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
                          {/* <button
                              className="btn btn-secondary btn-sm dropdown-toggle px=2"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              shop by category &ensp; &ensp;
                            </button> */}
                          <h6
                            className="mt-1"
                            style={{ textTransform: "capitalize" }}
                          >
                            {user?.profile?.name}
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
                            style={{ right: "0%", width: "300px", top: "10px" }}
                          >
                            {user?.profile?.role === 1 && (
                              <p
                                className="cat_list"
                                onClick={() => router.push("/admin")}
                              >
                                Dashboard
                              </p>
                            )}
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
                                  user?.profile?.role != 2
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
                              My Basket (0) item
                            </p>
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
                        <div key={index}>
                          <p
                            className={`${
                              openMenuIndex === index ? "activee" : ""
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
                                <div
                                  onClick={() => router.push(subEle?.goesTo)}
                                  className="px-3 py-1 cursor submenu"
                                  key={subIndex}
                                >
                                  {subEle?.title}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* {(user?.profile?.role == 2 ||
                        user?.profile?.role == 4) && <p>Farmers</p>}
                      {(user?.profile?.role == 3 ||
                        user?.profile?.role == 4) && <p>Buyers</p>}
                      {(user?.profile?.role == 2 ||
                        user?.profile?.role == 3 ||
                        user?.profile?.role == 4) && <p>Farm Lands</p>}
                      {user?.profile?.role == 6 && <p>Cold Storage</p>}
                      {user?.profile?.role == 6 && <p>Machinery</p>}
                      <p>Transportation</p>
                      {user?.profile?.role != 6 && <p>Vendors</p>}
                      <p>Fertilizers & Pesticides</p>
                      <p>Educational Resources</p> */}
                    </div>
                  </div>
                  <div className="col-md-1 p-0">
                    <button className="offerZoneBtn centerAllDiv">
                      <MdOutlineLocalOffer size={20} className="me-2" />
                      Offer Zone
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
