"use client";
import "./basket.css";
import { FaMinus, FaPlus, FaRegBookmark } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import MiniLoader from "@/component/reusableComponent/MiniLoader";
import {
  addToCart,
  deleteCart,
  getCart,
  updateCart,
} from "@/redux/cart/cartSlice";
import { Image_URL } from "@/helper/common";
import { useRouter } from "next/navigation";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import AuthService from "@/services/AuthServices";

const Basket = () => {
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const [profile, setprofile] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.profile?.id) dispatch(getCart(user?.profile?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.profile]);
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
    } else if (cartItem.quantity === 1) {
      dispatch(deleteCart(cartItem?.cartId));
    }
  };

  // Set the currency symbol from the first item's product detail.
  const currencySymbol =
    (cart?.cart?.length > 0 &&
      cart?.cart[0]?.productDetail?.country?.currencySymbol) ||
    "";
  // Calculate total price, discount, and final total
  const totalPrice = cart?.cart?.reduce((acc, item) => {
    return acc + item?.productDetail?.price * item?.quantity;
  }, 0);

  const totalDiscount = cart?.cart?.reduce((acc, item) => {
    const discount =
      item?.productDetail?.discountType === "fixed"
        ? item?.productDetail?.discount * item?.quantity
        : ((item?.productDetail?.price * item?.productDetail?.discount) / 100) *
          item?.quantity;
    return acc + discount;
  }, 0);

  const finalTotal = totalPrice - totalDiscount;

  const deliveryCharges = finalTotal > 1000 ? 0 : 40;

  console.log(user);

  useEffect(() => {
    if (user?.profile?.id) {
      AuthService.getUserProfile(user?.profile?.id).then(({ data }) => {
        setprofile(data?.userProfile);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleCheckout = async () => {
    // if (!profile?.IsVerified && profile?.isUpdate) {
    //   toast("Please wait until admin verify you", {
    //     icon: "😢",
    //     style: { borderRadius: "10px", background: "red", color: "#fff" },
    //   });
    //   return;
    // }
    router.push("/basket/placeOrder");
  };

  useEffect(() => {
    if (cart?.cart == null) {
      router.push("/basket");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart?.cart]);

  console.log(cart?.cart);

  return (
    <div className="container">
      {cart?.cart?.length > 0 ? (
        <div className="row">
          <div className=" col-12 mb-2 px-2 mt-2">
            <h4 className="mobilehome_title border p-2">Your Basket</h4>
          </div>
          <div className="col-md-9 mb-2 px-2">
            <div className="row m-0 d-md-flex d-none">
              <div className="col-md-2 border p-2 text-center"></div>
              <div className="col-md-5 border p-2 text-center">
                Items {cart?.cart?.length}
              </div>
              <div className="col-md-2 border p-2 text-center">Quantity</div>

              <div className="col-md-3 border p-2 text-center">Sub-total</div>
            </div>
            <div className="productlistWrapper">
              {cart?.cart?.map((val) => (
                <div className="row m-0 mb-2" key={val.productDtlId}>
                  <div className="col-md-2 border p-2">
                    <div className="row">
                      <div className="col-md-12 col-6">
                        <img
                          src={`${Image_URL}/products/${val?.productDetail?.ProductsImages[0]?.url}`}
                          alt="image"
                          width="100%"
                        />
                      </div>
                      <div className="col-md-12 col-6 d-md-none d-block">
                        <div className="d-flex justify-content-between align-items-center my-3">
                          {cart?.cart?.find(
                            (item) => item.productDtlId === val.productDtlId
                          ) ? (
                            <div className="quantitywrap w-100">
                              <span
                                className="minus"
                                onClick={() =>
                                  decreaseQuantity(val.productDtlId)
                                }
                              >
                                {loadingProductId === val.productDtlId &&
                                loadingAction === "decrement" ? (
                                  <MiniLoader />
                                ) : (
                                  <FaMinus size={15} />
                                )}
                              </span>
                              <span>
                                {
                                  cart?.cart?.find(
                                    (item) =>
                                      item.productDtlId === val.productDtlId
                                  )?.quantity
                                }
                              </span>
                              <span
                                className="plus"
                                onClick={() =>
                                  increaseQuantity(val.productDtlId)
                                }
                              >
                                {loadingProductId === val.productDtlId &&
                                loadingAction === "increment" ? (
                                  <MiniLoader />
                                ) : (
                                  <FaPlus size={15} />
                                )}
                              </span>
                            </div>
                          ) : (
                            <button
                              className="addtoCart_btn"
                              onClick={() => addCartHandler(val.productDtlId)}
                            >
                              Add
                            </button>
                          )}
                        </div>
                        <div>
                          <h6>
                            Saved: {val.productDetail?.country?.currencySymbol}
                            {val?.productDetail?.discountType === "fixed"
                              ? val?.productDetail?.discount * val?.quantity
                              : ((val?.productDetail?.price *
                                  val?.productDetail?.discount) /
                                  100) *
                                val?.quantity}
                          </h6>
                          <h6>
                            {val.productDetail?.country?.currencySymbol}{" "}
                            {val?.productDetail?.price * val?.quantity -
                              (val?.productDetail?.discountType === "fixed"
                                ? val?.productDetail?.discount * val?.quantity
                                : ((val?.productDetail?.price *
                                    val?.productDetail?.discount) /
                                    100) *
                                  val?.quantity)}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 border p-2">
                    <h6>{val?.productDetail?.productDtlName}</h6>
                    <h6 className="mt-2 fs-6">
                      {val?.productDetail?.country?.currencySymbol}
                      {val?.productDetail?.discountType == "percentage"
                        ? val?.productDetail?.price -
                          (val?.productDetail?.price *
                            val?.productDetail?.discount) /
                            100
                        : val?.productDetail?.price -
                          val?.productDetail?.discount}
                      /{val?.productDetail?.ProductUnit?.unitName}
                      {val?.productDetail?.discount !== 0 && (
                        <sub className="ms-1">
                          <del className="text-secondary">
                            ₹{val?.productDetail?.price}/
                            {val?.productDetail?.ProductUnit?.unitName}
                          </del>
                        </sub>
                      )}
                    </h6>
                    {/* <h6>
                      {val?.productDetail?.country?.currencySymbol}
                      {val?.productDetail?.price}/
                      {val?.productDetail?.ProductUnit?.unitName}
                    </h6> */}
                    <div>
                      <span>
                        {val?.productDetail?.ProductGrade?.gradeName} grade
                      </span>{" "}
                      <span>
                        {val?.productDetail?.quantity}{" "}
                        {val?.productDetail?.ProductUnit?.unitName}
                      </span>
                    </div>
                    <div>
                      <span>
                        <IoIosPerson size={15} />
                        <span className="fw-bold">
                          {val?.productDetail?.User?.FirstName}
                        </span>
                      </span>
                      <span>
                        <MdOutlineLocationOn size={20} />
                        {val?.productDetail?.User?.userInfo?.City}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-2 border p-2 d-md-block d-none">
                    <div className="d-flex justify-content-between align-items-center">
                      {cart?.cart?.find(
                        (item) => item.productDtlId === val.productDtlId
                      ) ? (
                        <div className="quantitywrap w-100">
                          <span
                            className="minus"
                            onClick={() => decreaseQuantity(val.productDtlId)}
                          >
                            {loadingProductId === val.productDtlId &&
                            loadingAction === "decrement" ? (
                              <MiniLoader />
                            ) : (
                              <FaMinus size={15} />
                            )}
                          </span>
                          <span>
                            {
                              cart?.cart?.find(
                                (item) => item.productDtlId === val.productDtlId
                              )?.quantity
                            }
                          </span>
                          <span
                            className="plus"
                            onClick={() => increaseQuantity(val.productDtlId)}
                          >
                            {loadingProductId === val.productDtlId &&
                            loadingAction === "increment" ? (
                              <MiniLoader />
                            ) : (
                              <FaPlus size={15} />
                            )}
                          </span>
                        </div>
                      ) : (
                        <button
                          className="addtoCart_btn"
                          onClick={() => addCartHandler(val.productDtlId)}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3 border p-2 d-md-block d-none text-center">
                    <h6>
                      Saved: {val.productDetail?.country?.currencySymbol}
                      {val?.productDetail?.discountType === "fixed"
                        ? val?.productDetail?.discount * val?.quantity
                        : ((val?.productDetail?.price *
                            val?.productDetail?.discount) /
                            100) *
                          val?.quantity}
                    </h6>
                    <h6>
                      {val.productDetail?.country?.currencySymbol}{" "}
                      {val?.productDetail?.price * val?.quantity -
                        (val?.productDetail?.discountType === "fixed"
                          ? val?.productDetail?.discount * val?.quantity
                          : ((val?.productDetail?.price *
                              val?.productDetail?.discount) /
                              100) *
                            val?.quantity)}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 px-2">
            <div className="detailWrapper border p-md-3 p-2">
              <h5 className="mb-md-4 mb-2 mobilehome_title">Price Details</h5>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Price ({cart?.cart?.length} items)</td>
                    <td>
                      {currencySymbol}
                      {totalPrice}
                    </td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>
                      {" "}
                      {currencySymbol}
                      {totalDiscount}
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Delivery Charges</td>
                    <td>₹{deliveryCharges > 0 ? deliveryCharges : "Free"}</td>
                  </tr> */}
                  <tr>
                    <td>
                      <strong>Total Amount</strong>
                    </td>
                    <td>
                      <strong>
                        {currencySymbol}
                        {finalTotal}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <span style={{ color: "green" }}>
                        You will save {currencySymbol}
                        {totalDiscount} on this order
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className="CheckoutBtn w-100 mt-md-3 p-1 p-md-2"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? <MiniLoader /> : "Place Order"}
              </button>
              {/* <button className="CheckoutBtn w-100 mt-3">Checkout</button> */}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ height: "80vh", display: "flex", justifyContent: "center" }}
        >
          <div style={{ height: "50vh", width: "50vh", textAlign: "center" }}>
            <img
              // src="https://cdn-icons-png.flaticon.com/512/11010/11010851.png"
              src="https://static.vecteezy.com/system/resources/previews/005/006/007/non_2x/no-item-in-the-shopping-cart-click-to-go-shopping-now-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
              height="100%"
              width="100%"
              alt="pic"
            />
            <h6 className="mb-4 text-secondary">Your cart is empty!</h6>
            <button className="gohomeforshop" onClick={() => router.push("/")}>
              Shop Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
