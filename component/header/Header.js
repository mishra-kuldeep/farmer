"use client";
import React, { useState, useEffect } from "react";
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

function Header() {
  const user = useSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const cart = useSelector((state) => state.cart);
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
    }else if(user.isLoggedIn && user?.profile){
      dispatch(getCart(user?.profile?.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoggedIn,user?.profile]);

  const handleLogout = () => {
    deleteCookie("token");
    dispatch(clearUser()); // Action to clear user data in Redux
    dispatch(clearCart()); // Action to clear user cart in Redux
    router.push("/"); // Redirect to the login page
  };

  const cls = visible ? "visible" : "hidden";
  const cls2 = !visible ? "visible" : "hidden";

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
                                router.push("/myAccount/myProfile")
                              }
                            >
                              My Profile
                            </p>
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
                      <button className="cart_login_btn " onClick={()=>router.push('/basket') }>
                        <FaShoppingCart size={18} />
                        {cart?.cart?.length > 0 ? (
                          <span className="cart-count">{cart?.cart?.length}</span>
                        ):<span className="cart-count">0</span>}
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
                    <div className="category_inline_header">
                      <p>Farmers</p>
                      <p>Buyers</p>
                      <p>Transportation</p>
                      {/* <p>Employee</p>
                      <p>Vendors</p> */}
                      <p>Farm Lands</p>
                      <p>Educational Resources</p>
                      <p>Customer Care</p>
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
                  <button className="cart_login_btn w-100" onClick={()=>router.push('/basket') }>
                    <FaShoppingCart size={18} className="me-2"  />
                    {cart?.cart?.length > 0 ? (
                          <span className="">{cart?.cart?.length}</span>
                        ):0} items
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
