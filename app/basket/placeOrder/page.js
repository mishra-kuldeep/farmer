"use client";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../basket.css";
import { FaPlus } from "react-icons/fa6";
import AddressServices from "@/services/AddressServices";
import toast from "react-hot-toast";
import OrderService from "@/services/Orderservices";
import CartService from "@/services/CartSevices";
import { clearCart } from "@/redux/cart/cartSlice";
import { useRouter } from "next/navigation";

const Placeorder = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [errors, setErrors] = useState({});
  const [addressList, setAddressList] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [prefix, setprefix] = useState("");
  const [values, setValues] = useState({
    buyerId: user?.profile?.id,
    FirstName: "",
    Phone: "",
    AlternativePhoneNo: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: user?.profile?.country,
  });

  useEffect(() => {
    if (user?.profile && cart?.cart?.length) {
      // Set the currency symbol from the first item's product detail.
      const currencySymbol =
        cart?.cart[0]?.productDetail?.country?.currencySymbol || "";
      setprefix(currencySymbol);
      setValues((pre) => ({
        ...pre,
        ["buyerId"]: user?.profile?.id,
        ["country"]: user?.profile?.country,
      }));
    }
  }, [user?.profile]);

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

  const onchangeHandeler = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const addAddress = () => {
    setLoader(true);
    AddressServices.addAddress(values)
      .then(({ data }) => {
        setLoader(false);
        setAddressList((preval) => [...preval, data?.newAddress]);
        setValues({
          buyerId: user?.profile?.id,
          FirstName: "",
          Phone: "",
          AlternativePhoneNo: "",
          addressLine1: "",
          city: "",
          state: "",
          postalCode: "",
          country: user?.profile?.country,
        });
        setOpen(false);
        toast("Address added successfully!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        const errorData = err?.response?.data?.errors || [];
        const errorObj = errorData.reduce((acc, curr) => {
          acc[curr.path] = curr.msg;
          return acc;
        }, {});
        setErrors(errorObj);
      });
  };

  useEffect(() => {
    AddressServices.getAddressList()
      .then(({ data }) => {
        setAddressList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckout = async () => {
    const totalAmount = finalTotal;

    const products = cart.cart.map((item) => ({
      productDtlId: item.productDtlId,
      quantity: item.quantity,
      sellerId: item.productDetail.sellerId,
      price: item.productDetail.price,
      discount: item.productDetail.discount,
      discountType: item.productDetail.discountType,
    }));

    const checkoutData = {
      buyerId: user?.profile?.id,
      addressId: selectedAddressId,
      totalAmount,
      products,
    };

    try {
      setIsCheckingOut(true);
      const response = await OrderService.checkoutCart(checkoutData);
      const res = await CartService.DeleteCartBuyer(user?.profile?.id);
      toast.success("To complete this order Please add Transpoter!!");
      router.push("/myAccount/myOrder");
      dispatch(clearCart());
    } catch (error) {
      toast.error("Checkout failed. Please select Address.");
      console.error("Checkout Error:", error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    if (cart?.cart == null) {
      router.push("/basket");
    }
  }, [cart?.cart]);
  return (
    <div
      style={{ backgroundColor: "#f1f3f6", minHeight: "calc(100vh - 120px)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-9 px-md-2 px-1">
            <div className="border bg-white rounded ">
              {addressList?.map((address, i) => (
                <label className="addressWrapper p-md-2 p-1" key={i}>
                  <input
                    type="radio"
                    value="All"
                    checked={address?.addressId == selectedAddressId}
                    className="m-2"
                    onChange={() => setSelectedAddressId(address?.addressId)}
                  />
                  <div className="m-1">
                    <div className="d-flex gap-3">
                      <h6 style={{ fontSize: "13px" }}>{address?.FirstName}</h6>
                      <h6 style={{ fontSize: "13px" }}>{address?.Phone}</h6>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#777",
                        marginTop: "10px",
                      }}
                    >
                      <span>{address?.addressLine1}, </span>{" "}
                      <span>{address?.city}, </span>{" "}
                      <span>{address?.state}, </span>{" "}
                      <span className="text-dark">
                        <b> - {address?.postalCode}</b>
                      </span>
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="addAddresswrap ">
              <div
                className="d-flex justify-content-between p-3 cursor"
                onClick={() => setOpen(!open)}
              >
                <h6>Add Address</h6>
                <FaPlus
                  style={{
                    transform: open && "rotate(45deg)",
                    transition: "0.5s",
                  }}
                />
              </div>
              {/* {open && ( */}
              <div
                style={{
                  maxHeight: open ? "1000px" : "0px", // Adjust max-height based on content
                  overflow: "hidden", // Ensure content is hidden when collapsed
                  transition: "max-height 1s ease", // Smooth transition for max-height
                }}
              >
                <div className="row m-0 p-md-3 ps-md-5">
                  <div className="col-md-6 ps-4 ps-md-0">
                    <label className="adjustLabel">Name *</label>
                    <input
                      type="text"
                      className="form-control p-2 adjustLabel_input shadow-none"
                      name="FirstName"
                      onChange={onchangeHandeler}
                      value={values.FirstName}
                    />
                    {errors.FirstName && (
                      <span className="error_input_text">
                        {errors.FirstName}
                      </span>
                    )}
                  </div>
                  <div className="col-md-6 ps-4 ps-md-0">
                    <label className="adjustLabel">Phone *</label>
                    <input
                      type="text"
                      className="form-control p-2 adjustLabel_input shadow-none"
                      name="Phone"
                      onChange={onchangeHandeler}
                      value={values.Phone}
                    />
                    {errors.Phone && (
                      <span className="error_input_text">{errors.Phone}</span>
                    )}
                  </div>
                  <div className="col-md-3 ps-4 ps-md-0">
                    <label className="adjustLabel">Pincode *</label>
                    <input
                      type="text"
                      className="form-control p-2 adjustLabel_input shadow-none"
                      name="postalCode"
                      onChange={onchangeHandeler}
                      value={values.postalCode}
                    />
                    {errors.postalCode && (
                      <span className="error_input_text">
                        {errors.postalCode}
                      </span>
                    )}
                  </div>
                  <div className="col-md-9 ps-4 ps-md-0">
                    <label className="adjustLabel">
                      Address (Area and Street) *
                    </label>
                    <input
                      type="text"
                      className="form-control p-2 adjustLabel_input shadow-none"
                      name="addressLine1"
                      onChange={onchangeHandeler}
                      value={values.addressLine1}
                    />
                    {errors.addressLine1 && (
                      <span className="error_input_text">
                        {errors.addressLine1}
                      </span>
                    )}
                  </div>
                  <div className="col-md-6 ps-4 ps-md-0">
                    <label className="adjustLabel">City/District/Town *</label>
                    <input
                      type="text"
                      className="form-control p-2 adjustLabel_input shadow-none"
                      name="city"
                      onChange={onchangeHandeler}
                      value={values.city}
                    />
                    {errors.city && (
                      <span className="error_input_text">{errors.city}</span>
                    )}
                  </div>
                  <div className="col-md-6 ps-4 ps-md-0">
                    <label className="adjustLabel">State *</label>
                    <input
                      className="form-control p-2 adjustLabel_input shadow-none"
                      // aria-label="Default select example"
                      name="state"
                      onChange={onchangeHandeler}
                      value={values.state}
                    />
                    {errors.state && (
                      <span className="error_input_text">{errors.state}</span>
                    )}
                  </div>
                  <div className="col-md-6 ps-4 ps-md-0">
                    <label className="adjustLabel">AlternativePhoneNo *</label>
                    <input
                      type="text"
                      className="form-control p-2 adjustLabel_input shadow-none"
                      name="AlternativePhoneNo"
                      onChange={onchangeHandeler}
                      value={values.AlternativePhoneNo}
                    />
                  </div>
                  <div className="col-md-6 p-3 d-flex gap-4">
                    <button
                      className="CheckoutBtn w-50 p-1 rounded-0"
                      onClick={addAddress}
                      disabled={loader}
                    >
                      {loader && <MiniLoader />}
                      Save
                    </button>
                    <button
                      className="CheckoutBtn w-50 p-1 border rounded-0"
                      style={{ backgroundColor: "transparent", color: "#555" }}
                      onClick={() => {
                        setValues({
                          buyerId: user?.profile?.id,
                          FirstName: "",
                          Phone: "",
                          AlternativePhoneNo: "",
                          addressLine1: "",
                          city: "",
                          state: "",
                          postalCode: "",
                          country: user?.profile?.country,
                        });
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              {/* )} */}
            </div>
          </div>

          <div className="col-md-3 px-md-2 px-1">
            <div className="detailWrapper border p-3 ">
              <h5 className="mb-md-4 mb-2 mobilehome_title">Price Details</h5>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Price ({cart?.cart?.length} items)</td>
                    <td>
                      {prefix}
                      {totalPrice}
                    </td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>
                      {prefix}
                      {totalDiscount}
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Delivery Charges</td>
                    <td>{prefix}{deliveryCharges > 0 ? deliveryCharges : "Free"}</td>
                  </tr> */}
                  <tr>
                    <td>
                      <strong>Total Amount</strong>
                    </td>
                    <td>
                      <strong>
                        {prefix}
                        {finalTotal}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <span className="fw-bold text-success">
                        You will save {prefix}
                        {totalDiscount} on this order
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className="CheckoutBtn w-100 mt-md-3 p-md-2 p-1"
                onClick={handleCheckout}
                // disabled={isCheckingOut}
              >
                {isCheckingOut ? <MiniLoader /> : "Checkout"}
              </button>
              {/* <button className="CheckoutBtn w-100 mt-3">Checkout</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;
