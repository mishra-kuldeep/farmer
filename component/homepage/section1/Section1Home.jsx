"use client";
import React, { useEffect, useRef, useState } from "react";
import "./section1home.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import product1 from "../../../public/product/apple.jpg";
import { isMobile } from "react-device-detect";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import Link from "next/link";
import ProductsDtlServices from "@/services/ProductsDtlServices";
import { Image_URL } from "@/helper/common";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { addToCart, deleteCart, updateCart } from "@/redux/cart/cartSlice";
import toast from "react-hot-toast";

const Section1Home = () => {
  const router = useRouter();
  const scrollContainerRef = useRef(null);
  const [Products, setProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
  // Add product to cart
  const addCartHandler = (id) => {
    if (!user?.isLoggedIn) {
      toast("Please login to add products to the cart!", {
        icon: "😢",
        style: { borderRadius: "10px", background: "red", color: "#fff" },
      });
    } else {
      const cartObj = {
        buyerId: user?.profile?.id,
        productDtlId: id,
        quantity: 1,
      };
      dispatch(addToCart(cartObj));
    }
  };
  // Update product quantity in the cart
  const updateCartQuantity = (productDtlId, newQuantity, action) => {
    const cartItem = cart?.cart?.find(
      (item) => item.productDtlId === productDtlId
    );
    if (cartItem) {
      const updatedCart = {
        buyerId: user?.profile?.id,
        quantity: newQuantity,
        productDtlId,
      };
      setLoadingProductId(productDtlId);
      setLoadingAction(action);
      dispatch(
        updateCart({ cartId: cartItem.cartId, data: updatedCart })
      ).finally(() => {
        setLoadingProductId(null);
        setLoadingAction(null);
      });
    }
  };

  // Handle quantity increase
  const increaseQuantity = (id) => {
    const cartItem = cart?.cart?.find((item) => item.productDtlId === id);
    if (cartItem) {
      updateCartQuantity(id, cartItem.quantity + 1, "increment");
    }
  };

  // Handle quantity decrease
  const decreaseQuantity = (id) => {
    const cartItem = cart?.cart?.find((item) => item.productDtlId === id);
    if (cartItem && cartItem.quantity > 1) {
      updateCartQuantity(id, cartItem.quantity - 1, "decrement");
    } else if (cartItem.quantity == 1) {
      dispatch(deleteCart(cartItem?.cartId));
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
                  <div className="d-flex justify-content-between">
                    <div className="rating_wrap">
                      <p className="centerAllDiv rating">
                        <span className="fw-bold">{ele.averageRating}.0</span>
                        <FaStar size={10} className="ms-1" />
                      </p>
                      <span className="rating_unit">
                        {ele.averageRating} Ratings
                      </span>
                    </div>
                    <span className="rating_unit">
                      {ele?.ProductGrade?.gradeName} grade
                    </span>

                  </div>
                  <div className="d-flex justify-content-between align-items-center">

                    <h5 className="mt-2 fw-bold fs-6">
                      ₹{" "}
                      {ele.discountType == "percentage"
                        ? ele.price - (ele.price * ele.discount) / 100
                        : ele.price - ele.discount}
                      /{ele?.ProductUnit?.unitName}
                      {ele.discount !== 0 && (
                        <sub className="ms-1">
                          <del className="text-secondary fw-light">
                            ₹{ele.price}/{ele?.ProductUnit?.unitName}
                          </del>
                        </sub>
                      )}
                    </h5>
                    <p className="rating_unit">
                      {ele?.quantity}{" "}{ele?.ProductUnit?.unitName}
                    </p>
                  </div>
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
                  {cart?.cart?.find(
                    (item) => item.productDtlId === ele.productDtlId
                  ) ? (
                    <button className="quantitywrap p-0">
                      <span
                        className="minus"
                        onClick={() => decreaseQuantity(ele.productDtlId)}
                      >
                        {loadingProductId === ele.productDtlId &&
                          loadingAction === "decrement" ? (
                          <MiniLoader />
                        ) : (
                          <FaMinus size={15} />
                        )}
                      </span>
                      <span>
                        {
                          cart?.cart?.find(
                            (item) => item.productDtlId === ele.productDtlId
                          )?.quantity
                        }
                      </span>
                      <span
                        className="plus"
                        onClick={() => increaseQuantity(ele.productDtlId)}
                      >
                        {loadingProductId === ele.productDtlId &&
                          loadingAction === "increment" ? (
                          <MiniLoader />
                        ) : (
                          <FaPlus size={15} />
                        )}
                      </span>
                    </button>
                  ) : (
                    <button
                      className="addtoCart_btn"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Add to Cart"
                      onClick={() => addCartHandler(ele.productDtlId)}
                    >
                      Add
                    </button>
                  )}
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
