"use client";
import React, { useEffect, useRef, useState } from "react";
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
import ProductsDtlServices from "@/services/ProductsDtlServices";
import { Image_URL } from "@/helper/common";
import { useRouter } from "next/navigation";

const Section1Home = () => {
  const router = useRouter()
  const scrollContainerRef = useRef(null);
  const [Products, setProducts] = useState([]);

  const initApi = async () => {
    try {
      const searchResult = await ProductsDtlServices.getProductsDtl({
        page: 1,
        search: "",
      });
      setProducts(searchResult?.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    initApi();
  }, []);

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

  console.log(Products);

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
          {Products.map((ele) => (
            <div className="col-md-3 px-2 " key={ele.productDtlId}>
              <div className="bestseller_cards">
                <div onClick={() => router.push(`/product/${ele.slug}`)}>
                  <div className="image_div">
                    <img
                      src={`${Image_URL}/Products/${ele.ProductsImages[0].url}`}
                      alt="product image"
                    />
                  </div>
                  <h6 className="mt-2 mb-0">{ele.productDtlName}</h6>
                  <div className="d-flex my-2 justify-content-between kisanNamelocation">
                    <p>
                      <IoIosPerson size={15} />
                      <span className="ms-1">{ele.User.FirstName}</span>
                    </p>
                    <p>
                      <MdOutlineLocationOn size={20} />
                      <span className="ms-1">{ele.User.userInfo.City}</span>
                    </p>
                  </div>
                  <div className="rating_wrap">
                    <p className="centerAllDiv rating">
                      <span className="fw-bold">{ele.averageRating}.0</span>
                      <FaStar size={10} className="ms-1" />
                    </p>
                    <span className="rating_unit">
                      {ele.averageRating} Ratings
                    </span>
                  </div>
                  <h5 className="mt-2 fw-bold fs-6">
                    ₹ {ele.price - ele.discount}
                    {ele.discount !== 0 && (
                      <sub className="ms-1">
                        <del className="text-secondary fw-light">
                          ₹{ele.price}
                        </del>
                      </sub>
                    )}
                  </h5>
                </div>
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
