"use client";
import "./basket.css";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import WhyProducthoose from "@/component/productCompo/WhyProducthoose";
import AboutTheProduct from "@/component/productCompo/AboutTheProduct";
import ProductsDtlServices from "@/services/ProductsDtlServices";
import { Image_URL } from "@/helper/common";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { addToCart, getCart, updateCart } from "@/redux/cart/cartSlice";
import MiniLoader from "@/component/reusableComponent/MiniLoader";


import imagee from "../../public/product/palak1.jpg";
const array = [1, 2, 3, 4, 5, 6, 7];

const basket = () => {
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { slug } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [index, setIndex] = useState(0);
  const [loadingProductId, setLoadingProductId] = useState(null); // Track the product being updated
  const [loadingAction, setLoadingAction] = useState(null); // Track the action ('increment' or 'decrement')
  const dispatch = useDispatch();


  // Fetch cart data when user is logged in
  // useEffect(() => {
  //   if (user?.isLoggedIn) {
  //     dispatch(getCart(user?.profile?.id));
  //   }
  // }, [user?.isLoggedIn])

  
  // // Update product quantity in the cart
  // const updateCartQuantity = (productDtlId, newQuantity, action) => {
  //   const cartItem = cart?.cart?.find((item) => item.productDtlId === productDtlId);
  //   if (cartItem) {
  //     const updatedCart = {
  //       buyerId: user?.profile?.id,
  //       quantity: newQuantity,
  //       productDtlId,
  //     };
  //     setLoadingProductId(productDtlId); // Set loading state for this product
  //     setLoadingAction(action); // Set loading action (increment or decrement)
  //     dispatch(updateCart({ cartId: cartItem.cartId, data: updatedCart })).finally(() => {
  //       setLoadingProductId(null); // Reset loading state after update is done
  //       setLoadingAction(null); // Reset the action after update is done
  //     });
  //   }
  // };

  // // Handle quantity increase
  // const increaseQuantity = (productDtlId) => {
  //   const cartItem = cart?.cart?.find((item) => item.productDtlId === productDtlId);
  //   if (cartItem) {
  //     updateCartQuantity(productDtlId, cartItem.quantity + 1, 'increment');
  //   }
  // };

  // // Handle quantity decrease
  // const decreaseQuantity = (productDtlId) => {
  //   const cartItem = cart?.cart?.find((item) => item.productDtlId === productDtlId);
  //   if (cartItem && cartItem.quantity > 1) {
  //     updateCartQuantity(productDtlId, cartItem.quantity - 1, 'decrement');
  //   }
  // };

  // useEffect(() => {
  //   handleGetProduct();
  // }, [slug]);

  // const cartItem = cart?.cart?.find((item) => item.productDtlId === productDtlId);


  return (
    <div className="container">
      <div>
        <h4>Your Basket</h4>
      </div>

      <div className="row">
        <div className="col-md-9">
          <div className="row ">
            <div className="cardBasket">
              <div className="col-md-4 text-center">
                Items  (1 item)
              </div>
              <div className="col-md-4 text-center">
                Quantity
              </div>

              <div className="col-md-4 text-center">
                Sub-total
              </div>
            </div>
          </div>
          <div className="productlistWrapper">
            {/* {array?.map((val)=>{ */}
            {/* // return  */}
            <div className="cardBasket">
              <img src={imagee.src} alt="image" />
              <div className="cartBaketDetail">
                <div>
                  <h6>Cauliflower</h6>
                  <h6>₹ 80</h6>
                </div>
                <div>
                  <h6>Delete |
                    Save for later</h6>
                  <div className="quantitywrap">
                    <span className="minus">
                      <FaMinus size={15} />
                    </span>
                    <span>1</span>
                    <span className="plus">
                      <FaPlus size={15} />
                    </span>
                  </div>
                </div>

                <div>
                  <h6>Saved: ₹75.62</h6>
                  <h6>₹ 80</h6>
                </div>
              </div>
            </div>
            {/* })} */}
          </div>
        </div>
        <div className="col-md-3">
          <div className="detailWrapper border p-3 rounded shadow">
            <h5 className="mb-4">Price Details</h5>
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Price (3 items)</td>
                  <td>₹7,859</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>− ₹6,360</td>
                </tr>
                <tr>
                  <td>Delivery Charges</td>
                  <td>₹40 <span style={{ color: 'green' }}>Free</span></td>
                </tr>
                <tr>
                  <td><strong>Total Amount</strong></td>
                  <td><strong>₹1,499</strong></td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: 'right' }}>
                    <span style={{ color: 'green' }}>You will save ₹6,360 on this order</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className=" CheckoutBtn w-100 mt-3">Checkout</button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default basket;
