"use client";
import "./basket.css";
import { FaMinus, FaPlus, FaRegBookmark } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import MiniLoader from "@/component/reusableComponent/MiniLoader";
import {
  addToCart,
  clearCart,
  deleteCart,
  deleteCartBuyer,
  getCart,
  updateCart,
} from "@/redux/cart/cartSlice";
import { Image_URL } from "@/helper/common";
import CartService from "@/services/CartSevices";
import OrderService from "@/services/Orderservices";
import { useRouter } from "next/navigation";

const Basket = () => {
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const router =useRouter()
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.profile?.id) dispatch(getCart(user?.profile?.id));
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

  const handleCheckout = async () => {
    if (!user?.isLoggedIn) {
      toast("Please login to proceed with the checkout!", {
        icon: "😢",
        style: { borderRadius: "10px", background: "red", color: "#fff" },
      });
      return;
    }
    const deliveryCharges = finalTotal > 1000 ? 0 : 40;
    const totalAmount = finalTotal + deliveryCharges;

    const products = cart.cart.map((item) => ({
      productDtlId: item.productDtlId,
      quantity: item.quantity,
      price: item.productDetail.price,
      discount: item.productDetail.discount,
      discountType: item.productDetail.discountType,
    }));

    const checkoutData = {
      buyerId: user?.profile?.id,
      totalAmount,
      products,
    };

    try {
      setIsCheckingOut(true);
      const response = await OrderService.checkoutCart(checkoutData);
      const res = await CartService.DeleteCartBuyer(user?.profile?.id);
      toast.success("Your Order is Placed for review successful!");
      dispatch(clearCart()); 
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
      console.error("Checkout Error:", error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };
  console.log();

  return (
    <div className="container">
      {cart?.cart?.length > 0 ? (
        <div className="row">
          <div>
            <h4>Your Basket</h4>
          </div>
          <div className="col-md-9">
            <div className="row ">
              <div className="cardBasket">
                <div className="col-md-4 text-center">
                  Items {cart?.cart?.length}
                </div>
                <div className="col-md-4 text-center">Quantity</div>

                <div className="col-md-4 text-center">Sub-total</div>
              </div>
            </div>
            <div className="productlistWrapper">
              {cart?.cart?.map((val) => (
                <div className="cardBasket" key={val.productDtlId}>
                  <img
                    src={`${Image_URL}/Products/${val?.productDetail?.ProductsImages[0].url}`}
                    alt="image"
                  />
                  <div className="cartBaketDetail row">
                    <div className="col-md-6">
                      <h6>{val?.productDetail?.productDtlName}</h6>
                      <h6>₹ {val?.productDetail?.price}</h6>
                    </div>

                    <div className="col-md-3">
                      <div className="d-flex justify-content-between align-items-center">
                        {cart?.cart?.find(
                          (item) => item.productDtlId === val.productDtlId
                        ) ? (
                          <div className="quantitywrap">
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
                                  (item) =>
                                    item.productDtlId === val.productDtlId
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

                    <div className="col-md-3">
                      <h6>
                        Saved: ₹
                        {val?.productDetail?.discountType === "fixed"
                          ? val?.productDetail?.discount * val?.quantity
                          : ((val?.productDetail?.price *
                              val?.productDetail?.discount) /
                              100) *
                            val?.quantity}
                      </h6>
                      <h6>
                        ₹{" "}
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
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <div className="detailWrapper border p-3 rounded shadow">
              <h5 className="mb-4">Price Details</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Price ({cart?.cart?.length} items)</td>
                    <td>₹{totalPrice}</td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>− ₹{totalDiscount}</td>
                  </tr>
                  <tr>
                    <td>Delivery Charges</td>
                    <td>₹{deliveryCharges > 0 ? deliveryCharges : "Free"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Amount</strong>
                    </td>
                    <td>
                      <strong>₹{finalTotal + deliveryCharges}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ textAlign: "right" }}>
                      <span style={{ color: "green" }}>
                        You will save ₹{totalDiscount} on this order
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className="CheckoutBtn w-100 mt-3"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? <MiniLoader /> : "Checkout"}
              </button>
              {/* <button className="CheckoutBtn w-100 mt-3">Checkout</button> */}
            </div>
          </div>
        </div>
      ) : (
        <div  style={{ height: "80vh",display:"flex",justifyContent:"center" }}>
          <div style={{ height: "50vh", width: "50vh", textAlign: "center" }}>
            <img
              // src="https://cdn-icons-png.flaticon.com/512/11010/11010851.png"
              src="https://static.vecteezy.com/system/resources/previews/005/006/007/non_2x/no-item-in-the-shopping-cart-click-to-go-shopping-now-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
              height="100%"
              width="100%"
            />
            <h6 className="mb-4 text-secondary">Your cart is empty!</h6>
            <button className="gohomeforshop" onClick={()=>router.push("/")}>Shop Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
