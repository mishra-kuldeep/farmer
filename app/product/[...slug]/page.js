"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./productPage.css";
import { FaHome, FaMinus, FaPlus, FaStar } from "react-icons/fa";
import WhyProducthoose from "@/component/productCompo/WhyProducthoose";
import AboutTheProduct from "@/component/productCompo/AboutTheProduct";
import ProductsDtlServices from "@/services/ProductsDtlServices";
import { Image_URL } from "@/helper/common";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import {
  addToCart,
  deleteCart,
  getCart,
  updateCart,
} from "@/redux/cart/cartSlice";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { MdProductionQuantityLimits } from "react-icons/md";
import ProductRating from "@/component/productCompo/ProductRating";

const Product = () => {
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { slug } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [index, setIndex] = useState(0);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const dispatch = useDispatch();
  // Access messages and errors from the Redux store
  const { message, error } = useSelector((state) => state.cart);
  // Fetch product details
  const handleGetProduct = async () => {
    try {
      const singleProductResult =
        await ProductsDtlServices.getsingleProductsDtl(slug);
      setSingleProduct(singleProductResult?.data?.singleproduct);
    } catch (error) {
      console.error("Error fetching product:", error);
      setSingleProduct({});
    }
  };

  // Fetch cart data when user is logged in
  useEffect(() => {
    if (user?.isLoggedIn && user?.profile) {
      dispatch(getCart(user?.profile?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.isLoggedIn, user?.profile]);

  // Add product to cart
  const addCartHandler = () => {
    if (!user?.isLoggedIn) {
      toast("Please login to add products to the cart!", {
        icon: "😢",
        style: { borderRadius: "10px", background: "red", color: "#fff" },
      });
    } else {
      const cartObj = {
        buyerId: user?.profile?.id,
        productDtlId: singleProduct?.productDtlId,
        quantity: 1,
      };
      dispatch(addToCart(cartObj));
    }
  };
  // Show messages or errors using toast
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);
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
  const increaseQuantity = () => {
    const cartItem = cart?.cart?.find(
      (item) => item.productDtlId === singleProduct?.productDtlId
    );
    if (cartItem) {
      updateCartQuantity(
        singleProduct?.productDtlId,
        cartItem.quantity + 1,
        "increment"
      );
    }
  };

  // Handle quantity decrease
  const decreaseQuantity = () => {
    const cartItem = cart?.cart?.find(
      (item) => item.productDtlId === singleProduct?.productDtlId
    );
    if (cartItem && cartItem.quantity > 1) {
      updateCartQuantity(
        singleProduct?.productDtlId,
        cartItem.quantity - 1,
        "decrement"
      );
    } else if (cartItem.quantity == 1) {
      dispatch(deleteCart(cartItem?.cartId));
    }
  };

  useEffect(() => {
    handleGetProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const cartItem = cart?.cart?.find(
    (item) => item.productDtlId === singleProduct?.productDtlId
  );
  return (
    <div className="container">
      <div className="w-100 overflow-auto">
        <div className="product_categories_navigation">
          <FaHome />
          <span className="cursor">Home</span>
          <span>/</span>
          <span className="cursor">{singleProduct?.productDtlName}</span>
        </div>
      </div>

      <div className="product_basic_detail">
        <div
          style={{ height: "500px", overflowY: "auto", overflowX: "hidden" }}
          className="scrollThumbStyle px-2"
        >
          <div className="product_imageList">
            {singleProduct?.ProductsImages?.map((image, i) => (
              <img
                src={`${Image_URL}/products/${image?.url}`}
                alt="image"
                key={i}
                onClick={() => setIndex(i)}
                className={index === i ? "cursor imageborderedGreen" : "cursor"}
              />
            ))}
          </div>
        </div>
        <div className="product_singleImage">
          {singleProduct?.ProductsImages?.length > 0 && (
            <img
              src={`${Image_URL}/products/${singleProduct?.ProductsImages[index]?.url}`}
              alt="image"
            />
          )}
        </div>
        <div className="product_details">
          <h3 className="mb-3">{singleProduct?.productDtlName}</h3>
          <div className="rating_wrap">
            <p className="centerAllDiv rating">
              <span className="fw-bold">
                {singleProduct?.averageRating?.toFixed(1)}
              </span>
              <FaStar size={10} className="ms-1" />
            </p>
            <span className="rating_unit">
              {singleProduct.numberOfRatings} Ratings
            </span>
          </div>
          <p className="mb-3">
            MRP:{" "}
            <del>
              ₹{singleProduct?.price}.00/{singleProduct?.ProductUnit?.unitName}
            </del>
          </p>
          <h6 className="fw-bold  mb-3">
            Price: ₹{" "}
            {singleProduct.discountType == "percentage"
              ? singleProduct.price -
                (singleProduct.price * singleProduct.discount) / 100
              : singleProduct.price - singleProduct.discount}
            /{singleProduct?.ProductUnit?.unitName}
            {/* <sub>(₹{singleProduct?.price}/{singleProduct?.ProductUnit?.unitName})</sub> */}
          </h6>
          <h6 className="fw-bold text-success">
            You Save : {singleProduct?.discountType === "fixed" && "₹"}
            {singleProduct?.discount}
            {singleProduct?.discountType === "percentage" && "%"} OFF
          </h6>
          <p className="text-secondary mb-3">(inclusive of all taxes)</p>
          <p>
            <IoIosPerson size={15} />
            <span className="fw-bold">{singleProduct?.User?.FirstName}</span>
          </p>
          <p>
            <MdOutlineLocationOn size={20} />
            {singleProduct?.User?.userInfo?.City}
          </p>
          <p>
            <MdProductionQuantityLimits size={20} />
            {singleProduct?.quantity} {singleProduct?.ProductUnit?.unitName}
          </p>
          <p>{singleProduct?.ProductGrade?.gradeName} Grade</p>

          <div className="d-flex my-md-5 d-none d-md-flex w-100">
            {cartItem ? (
              <button className="quantitywrap w-50">
                <span className="minus" onClick={decreaseQuantity}>
                  {loadingProductId === singleProduct?.productDtlId &&
                  loadingAction === "decrement" ? (
                    <MiniLoader />
                  ) : (
                    <FaMinus size={15} />
                  )}
                </span>
                <span>{cartItem?.quantity}</span>
                <span className="plus" onClick={increaseQuantity}>
                  {loadingProductId === singleProduct?.productDtlId &&
                  loadingAction === "increment" ? (
                    <MiniLoader />
                  ) : (
                    <FaPlus size={15} />
                  )}
                </span>
              </button>
            ) : (
              <button
                className="addtocartProductBtn w-50"
                onClick={addCartHandler}
                disabled={!singleProduct?.available}
              >
                {singleProduct?.available ? "Add to basket" : "Out of stock"}
              </button>
            )}
            <button
              className="saveforLaterProductBtn w-50"
              disabled={!singleProduct}
            >
              Save for Later
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex my-3 addandlaterbuttonfixed d-block d-md-none">
        <button className="addtocartProductBtn" onClick={addCartHandler}>
          {singleProduct?.available ? "Add to basket" : "Out of stock"}
        </button>
        <button className="saveforLaterProductBtn">Save for Later</button>
      </div>
      <hr />
      <WhyProducthoose />
      <ProductRating />
      <h6 className="mt-3">{slug[1]}</h6>
      <AboutTheProduct about={singleProduct?.productDtl} />
    </div>
  );
};

export default Product;
