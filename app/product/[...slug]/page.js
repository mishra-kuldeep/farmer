"use client";
import { useParams } from "next/navigation";
import React from "react";
import "./productPage.css";
import { FaHome } from "react-icons/fa";
import palakImage from "../../../public/product/palak.jpg";
import palakImage1 from "../../../public/product/palak1.jpg";
import WhyProducthoose from "@/component/productCompo/WhyProducthoose";
import AboutTheProduct from "@/component/productCompo/AboutTheProduct";
const imagelist = [palakImage, palakImage, palakImage, palakImage, palakImage];

const about ="In the rich tapestry of Indian cuisine, cauliflower holds a cherished place as a versatile and widely used vegetable. Known as Gobi in Hindi, it features prominently in various regional dishes. From the iconic Punjabi favourite Aloo Gobi (potato and cauliflower curry) to the spicy Maharashtrian Gobi Masala, it adapts seamlessly to different cooking styles and flavours. Cauliflower is also enjoyed battered and fried as Gobi Pakoras or as a delicious addition to biryanis and pulavs. Its ability to absorb spices and its unique texture make it a beloved ingredient, offering a hearty and satisfying element to Indian meals."

const Product = () => {
  const { slug } = useParams();

  return (
    <div className="container">
      <div className="product_categories_navigation">
        <FaHome />
        <span className="cursor">Home</span>
        <span>/</span>
        <span className="cursor">{slug[0]}</span>
        <span>/</span>
        <span className="cursor">Seasonal-vegiee</span>
      </div>

      <div className="product_basic_detail">
        <div className="product_imageList">
          {imagelist.map((image) => (
            <img src={image.src} alt="image" />
          ))}
        </div>
        <div className="product_singleImage">
          <img src={palakImage1.src} alt="image" />
        </div>
        <div className="product_details">
          <h3>fresho! Palak - Cleaned, without roots, 250 g</h3>
          <p>MRP: <del>₹34.25</del></p>
          <h6 className="fw-bold">Price: ₹25 (₹0.1 / g)</h6>
          <p className="text-success fw-bold">You Save: 27% OFF</p>
          <div className="d-flex my-md-5 gap-4 d-none d-md-block">
            <button className="addtocartProductBtn">Add to basket</button>
            <button className="saveforLaterProductBtn">Save for Later</button>
          </div>
        </div>
      </div>
      <div className="d-flex my-3 addandlaterbuttonfixed  d-block d-md-none">
            <button className="addtocartProductBtn">Add to basket</button>
            <button className="saveforLaterProductBtn">Save for Later</button>
          </div>
          <hr/>
          <WhyProducthoose/>
          <h6 className="mt-3">{slug[1]}</h6>
          <AboutTheProduct about={about}/>
    </div>
  );
};

export default Product;
