"use client";
import React, { useState, useEffect } from "react";
import "./header.css";
import logo from "../../public/header/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { isMobile } from "react-device-detect";
import HeaderForMobile from "./HeaderForMobile";
import HeaderTopForMobile from "./HeaderTopForMobile";
import Search from "../homepage/Search";


function Header() {
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        let moving = window.pageYOffset;
        setVisible(position > moving);
        setPosition(moving);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [position]);

  const cls = visible ? "visible" : "hidden";
  const cls2 = !visible ? "visible" : "hidden";

  return (
    <>
      {!isMobile ? (
        <div className="mainHeaderWrapper">
          <header className={`${cls} d-block`}>
            <div style={{ backgroundColor: "#ddd", padding: "10px" }}>
              <div className="container">
                <div className="row w-100 m-0">
                  <div className="col-md-2 d-flex align-items-center p-0">
                    <img src={logo.src} alt="logo" className="logoImage" />
                    <h6 className="logoImage_title">
                      <span className="fs-4">F</span>armers
                      <span className="fs-4">M</span>arket
                    </h6>
                  </div>
                  <div className="col-md-6 p-0 px-4">
                  <Search />
                  </div>
                  <div className="col-md-4 p-0">
                    <div className="d-flex justify-content-end gap-3">
                      <button className="login_btn">login / Signup</button>
                      <button className="cart_login_btn">
                        <FaShoppingCart size={18} />
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
                        shop by category &ensp; &ensp;
                      </button>

                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-9 p-0">
                    <div className="category_inline_header">
                      <p>Exotic Fruit</p>
                      <p>Tee</p>
                      <p>Ghee</p>
                      <p>Milk</p>
                      <p>Fresh Vegetables</p>
                      <p>Meat</p>
                      <p>Egg</p>
                    </div>
                  </div>
                  <div className="col-md-1 p-0">
                    <button className="offerZoneBtn">
                      <MdOutlineLocalOffer size={20} className="me-2" />
                      offerZone
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
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-7">
                <Search />
                </div>
                <div className="col-md-1 p-0">
                  <button className="cart_login_btn w-100">
                    <FaShoppingCart size={18} className="me-2" />0 items
                  </button>
                </div>
              </div>
            </div>
          </header>
        </div>
      ) : (
        <>
          <HeaderTopForMobile />
          <HeaderForMobile />
        </>
      )}
    </>
  );
}

export default Header;
