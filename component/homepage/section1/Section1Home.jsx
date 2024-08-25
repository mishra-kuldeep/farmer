"use client";
import React, { useRef } from "react";
import "./section1home.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import product1 from "../../../public/product/apple.jpg";
import { isMobile } from "react-device-detect";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import Link from "next/link";

const Section1Home = () => {
  const scrollContainerRef = useRef(null);
  const array = [
    {
      id: "111",
      title: "Seasonal Fruit Vegetable 111",
    },
    {
      id: "112",
      title: "Seasonal Fruit Vegetable 112",
    },
    {
      id: "113",
      title: "Seasonal Fruit Vegetable 113",
    },
    {
      id: "121",
      title: "Seasonal Fruit Vegetable 121",
    },
    {
      id: "122",
      title: "Seasonal Fruit Vegetable 122",
    },
    {
      id: "123",
      title: "Seasonal Fruit Vegetable 123",
    },
    {
      id: "131",
      title: "Seasonal Fruit Vegetable 131",
    },
    {
      id: "132",
      title: "Seasonal Fruit Vegetable 132",
    },
    {
      id: "133",
      title: "Seasonal Fruit Vegetable 133",
    },
  ];

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      if (direction === "left") {
        scrollContainerRef.current.scrollLeft -= isMobile
          ? containerWidth
          : (containerWidth * 50) / 100;
      } else if (direction === "right") {
        scrollContainerRef.current.scrollLeft += isMobile
          ? containerWidth
          : (containerWidth * 50) / 100;
      }
    }
  };

  return (
    <div className="container">
      <div className="bestSellerWrapper p-md-3 p-0">
        <div className="headerbestSeller p-2">
          <h5>Best Sellers</h5>
          <div className="arrowBtn_bestSeller">
            <p className="Show_More_bestSeller">Show More</p>
            <p
              className="next_btn_bestSeller"
              onClick={() => handleScroll("left")}
            >
              <IoIosArrowBack />
            </p>
            <p
              className="next_btn_bestSeller"
              onClick={() => handleScroll("right")}
            >
              <IoIosArrowForward />
            </p>
          </div>
        </div>
        <div
          className="bestseller_cards_wrap overflowscrollhidden row m-0"
          ref={scrollContainerRef}
        >
          {array.map((ele) => (
            <div className="col-md-3 px-2 col-6" key={ele.id}>
              <div className="bestseller_cards">
                <Link
                  href={`/product/${ele.id}/${ele.title.split(" ").join("-")}`}
                  className="custom-link"
                >
                  <div className="image_div">
                    <img src={product1.src} alt="product image" />
                  </div>
                  <h6 className="mt-2 mb-0">Seasonal Fruit Vegetable</h6>
                  <div className="d-flex my-2 justify-content-between kisanNamelocation">
                    <p>
                      <IoIosPerson size={15} />
                      <span className="ms-1">jai kisan bahadur</span>
                    </p>
                    <p>
                      <MdOutlineLocationOn size={20} />
                      <span className="ms-1">Ghazipur</span>
                    </p>
                  </div>
                  <div className="rating_wrap">
                    <p className="centerAllDiv rating">
                      <span className="fw-bold">4.2</span>
                      <FaStar size={10} className="ms-1" />
                    </p>
                    <span className="rating_unit">210 Ratings</span>
                  </div>
                  <h5 className="mt-2 fw-bold fs-6">
                    ₹ 199
                    <sub>
                      <del className="text-secondary fw-light">₹299</del>
                    </sub>
                  </h5>
                </Link>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="bookmark_btn"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Save for Later"
                  >
                    <FaRegBookmark size={15} />
                  </button>
                  <button
                    className="addtoCart_btn"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Add to Cart"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section1Home;
