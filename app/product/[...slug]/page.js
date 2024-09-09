"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./productPage.css";
import { FaHome } from "react-icons/fa";
import WhyProducthoose from "@/component/productCompo/WhyProducthoose";
import AboutTheProduct from "@/component/productCompo/AboutTheProduct";
import ProductsDtlServices from "@/services/ProductsDtlServices";
import { Image_URL } from "@/helper/common";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";

const Product = () => {
  const user = useSelector((state) => state.auth);
  const { slug } = useParams();
  const [sigleSearchProduct, setsigleSearchProduct] = useState({});
  const [Index, setIndex] = useState(0);

  console.log(slug);
  const handleGetProduct = async () => {
    try {
      const singleProducthResult =
        await ProductsDtlServices.getsingleProductsDtl(slug);
      setsigleSearchProduct(singleProducthResult?.data?.singleproduct);
    } catch (error) {
      console.error("Error fetching products:", error);
      setsigleSearchProduct({});
    }
  };

  const addCartHandeler = () => {
    if (!user?.isLoggedIn) {
      toast("Please login to add products in cart!", {
        icon: "😢",
        style: {
          borderRadius: "10px",
          background: "red",
          color: "#fff",
        },
      });
    }else{
      console.log("first")
    }
  };
  console.log(user);

  useEffect(() => {
    handleGetProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  console.log(sigleSearchProduct);
  return (
    <div className="container">
      <div className="w-100 overflow-auto">
        <div className="product_categories_navigation">
          <FaHome />
          <span className="cursor">Home</span>
          <span>/</span>
          <span className="cursor">{sigleSearchProduct?.productDtlName}</span>
        </div>
      </div>

      <div className="product_basic_detail">
        <div
          style={{ height: "500px", overflowY: "auto", overflowX: "hidden" }}
          className="scrollThumbStyle px-2"
        >
          <div className="product_imageList ">
            {sigleSearchProduct?.ProductsImages?.map((image, i) => (
              <img
                src={`${Image_URL}/products/${image?.url}`}
                alt="image"
                key={i}
                onClick={() => setIndex(i)}
                className={`${
                  Index == i ? "cursor imageborderedGreen" : "cursor"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="product_singleImage">
          {sigleSearchProduct?.ProductsImages?.length > 0 && (
            <img
              src={`${Image_URL}/products/${sigleSearchProduct?.ProductsImages[Index]?.url}`}
              alt="image"
            />
          )}
        </div>
        <div className="product_details">
          <h3 className="mb-3">{sigleSearchProduct?.productDtlName}</h3>
          <p className="mb-3">
            MRP: <del>₹{sigleSearchProduct?.price}.00</del>
          </p>
          <h6 className="fw-bold  mb-3">
            Price: ₹{sigleSearchProduct?.price}{" "}
            <sub>
              (₹{sigleSearchProduct?.price}/{sigleSearchProduct?.unit})
            </sub>
          </h6>
          <h6 className="fw-bold text-success">
            You Save : {sigleSearchProduct?.discountType == "fixed" && "₹"}
            {sigleSearchProduct?.discount}
            {sigleSearchProduct?.discountType == "percentage" && "%"} OFF
          </h6>
          <p className="text-secondary mb-5">(inclusive of all taxes)</p>
          <p>
            <IoIosPerson size={15} />
            <span className="fw-bold">
              {sigleSearchProduct?.User?.FirstName}
            </span>
          </p>
          <p>
            <MdOutlineLocationOn size={20} />
            {sigleSearchProduct?.User?.userInfo.City}
          </p>

          <div className="d-flex my-md-5 d-none d-md-block">
            <button className="addtocartProductBtn" onClick={addCartHandeler}>
              {sigleSearchProduct?.available ? "Add to basket" : "Out of stock"}
            </button>
            <button className="saveforLaterProductBtn">Save for Later</button>
          </div>
        </div>
      </div>
      <div className="d-flex my-3 addandlaterbuttonfixed  d-block d-md-none">
        <button className="addtocartProductBtn" onClick={addCartHandeler}>
          {sigleSearchProduct?.available ? "Add to basket" : "Out of stock"}
        </button>
        <button className="saveforLaterProductBtn">Save for Later</button>
      </div>
      <hr />
      <WhyProducthoose />
      <h6 className="mt-3">{slug[1]}</h6>
      <AboutTheProduct about={sigleSearchProduct?.productDtl} />
    </div>
  );
};

export default Product;
