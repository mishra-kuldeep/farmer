import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosPerson } from "react-icons/io";
import "../../app/product/[...slug]/productPage.css";
import ConfirmModel from "./ConfirmModel";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import toast from "react-hot-toast";
import { Image_URL } from "@/helper/common";
import IconButton from "./IconButton";
import { useSelector } from "react-redux";
import "../../app/basket/basket.css";
import OrderService from "@/services/Orderservices";
import { FaMinus, FaPlus } from "react-icons/fa";
import MiniLoader from "./MiniLoader";
import { MdOutlineLocationOn } from "react-icons/md";
// import "../../myAccount/customerOrder/customerOrder.css";
import "../../app/myAccount/customerOrder/customerOrder.css"
const OrderModal = ({ modalData, setActionPerformed }) => {
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [actionType, setActionType] = useState("");
  const [isLoading, setloading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [adminReviewComment, setAdminReviewComment] = useState("");
  const closeButtonRef = useRef(null);
  const [Errors, setErrors] = useState({});
  const orderDetailId = [];
  const transporterDeliveryDetailId = [];

  const onConfirmHandeler = () => {
    if (actionType == "approve") {
      setloading(true);
      OrderDetails?.forEach((val) => {
        orderDetailId.push(val.orderDetailId);
        transporterDeliveryDetailId.push(val.transVehicalId);
      });
      const data = {
        orderDetailId,
        transporterDeliveryDetailId,
        adminReviewComment
      }
      OrderService.AdminApproveOrder(modalData, data)
        .then(({ data }) => {
          setloading(false);
          setConfirm(false);
          setActionPerformed(true);
          if (closeButtonRef.current) {
            closeButtonRef.current.click();
          }
          toast(data?.message, {
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
          setloading(false);
          setErrors(errorObj);
          setConfirm(false);
        });
    }
    if (actionType == "reject") {
      if (!adminReviewComment) {
        setConfirm(false);
        return toast("Please Enter Review message", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "red",
            color: "#fff",
          },
        });
      }

      setloading(true);
      OrderService.AdminRejectOrder(modalData, adminReviewComment)
        .then(({ data }) => {
          toast(data?.message, {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "green",
              color: "#fff",
            },
          });
          setloading(false);
          setConfirm(false);
          setActionPerformed(true);
          if (closeButtonRef.current) {
            closeButtonRef.current.click();
          }
        })
        .catch((err) => {
          console.log(err);

          const errorData = err?.response?.data?.errors || [];
          const errorObj = errorData.reduce((acc, curr) => {
            acc[curr.path] = curr.msg;
            return acc;
          }, {});
          setloading(false);
          setErrors(errorObj);
          setConfirm(false);
        });
    }
  };
  const onCancelHandeler = () => {
    setConfirm(false);
  };
  useEffect(() => {
    if (modalData) {
      setIsLoadingDetails(true);
      OrderService.getOrderDetailAdmin(modalData)
        .then(({ data }) => {
          setOrderDetails(data?.data);
          setIsLoadingDetails(false);
        })
        .catch((err) => {
          console.log(err);

          setIsLoadingDetails(false);
        });
    }
  }, [modalData]);
  // Calculate total price, discount, and final total
  const totalPrice = OrderDetails.reduce((acc, item) => {
    return acc + item?.productDetail?.price * item?.quantity;
  }, 0);

  const totalDiscount = OrderDetails.reduce((acc, item) => {
    const discount =
      item?.productDetail?.discountType === "fixed"
        ? item?.productDetail?.discount * item?.quantity
        : ((item?.productDetail?.price * item?.productDetail?.discount) / 100) *
        item?.quantity;
    return acc + discount;
  }, 0);

  const finalTotal = totalPrice - totalDiscount;
  const deliveryCharges = finalTotal > 1000 ? 0 : 40;

  //To calculate the total sum of totalTranportCharge across all TransporterDeliveryDetails in this OrderDetails,
  let totalTransportCharge = 0;
  OrderDetails.forEach(order => {
    if (order.TransporterDeliveryDetails) {
      totalTransportCharge += order.TransporterDeliveryDetails.reduce(
        (sum, detail) => sum + detail.totalTranportCharge,
        0
      );
    }
  });


  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Verify Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeButtonRef}
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="row">
                  <div className="col-md-9">
                    <div className="row productlistWrapper">
                      <div className="cardBasket" style={{ padding: "10px" }}>
                        <div className="col-md-4 text-center">
                          Items (
                          {isLoadingDetails ? (
                            <MiniLoader />
                          ) : (
                            OrderDetails?.length
                          )}{" "}
                          item)
                        </div>
                        <div className="col-md-4 text-center">Quantity</div>

                        <div className="col-md-4 text-center">Sub-total</div>
                      </div>
                    </div>
                    {isLoadingDetails && <MiniLoader />}
                    <div className="productlistWrapper">
                      {OrderDetails?.map((val) =>
                      (
                        <div >
                          <div
                            style={{ padding: "10px" }}
                            className="cardBasket"
                            key={val?.productDetail?.productDtlId}
                          >
                            <img
                              src={`${Image_URL}/products/${val?.productDetail?.ProductsImages[0]?.url}`}
                              alt="Product image"
                            />
                            <div className="cartBaketDetail row">
                              <div className="col-md-6">
                                <h6>{val?.productDetail?.productDtlName}</h6>
                                <h6>
                                  ₹ {val?.productDetail?.price}/
                                  {val?.productDetail?.ProductUnit?.unitName}
                                </h6>
                                <p
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: "grey",
                                  }}
                                >
                                  {val?.productDetail?.ProductGrade?.gradeName}{" "}
                                  grade
                                </p>
                                {/* <span>{val?.productDetail?.quantity}{" "}{val?.productDetail?.ProductUnit?.unitName}</span> */}
                                <span>
                                  <IoIosPerson size={15} />
                                  <span
                                    className="fw-bold"
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                      color: "grey",
                                    }}
                                  >
                                    {val?.productDetail?.User?.FirstName}
                                  </span>
                                </span>
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: "grey",
                                  }}
                                >
                                  <MdOutlineLocationOn size={18} />
                                  {val?.productDetail?.User?.userInfo.City}
                                </span>

                              </div>

                              <div className="col-md-3">
                                <div className="d-flex justify-content-between align-items-center">
                                  {OrderDetails?.find(
                                    (item) =>
                                      item.productDtlId === val.productDtlId
                                  ) ? (
                                    <div className="quantitywrap">
                                      <span className="minus">
                                        <FaMinus size={15} />
                                      </span>
                                      <span>
                                        {
                                          OrderDetails?.find(
                                            (item) =>
                                              item.productDtlId ===
                                              val.productDtlId
                                          )?.quantity
                                        }
                                      </span>
                                      <span className="plus">
                                        <FaPlus size={15} />
                                      </span>
                                    </div>
                                  ) : (
                                    <button className="addtoCart_btn">
                                      Add
                                    </button>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-3">
                                <h6>
                                  Saved: ₹
                                  {val?.productDetail?.discountType === "fixed"
                                    ? val?.productDetail?.discount *
                                    val?.quantity
                                    : ((val?.productDetail?.price *
                                      val?.productDetail?.discount) /
                                      100) *
                                    val?.quantity}
                                </h6>
                                <h6>
                                  ₹{" "}
                                  {val?.productDetail?.price * val?.quantity -
                                    (val?.productDetail?.discountType ===
                                      "fixed"
                                      ? val?.productDetail?.discount *
                                      val?.quantity
                                      : ((val?.productDetail?.price *
                                        val?.productDetail?.discount) /
                                        100) *
                                      val?.quantity)}
                                </h6>
                              </div>
                              {val?.TransporterVehicle == null &&
                                <p style={{ color: "red" }}> No Transporter Is Select For This Product</p>}
                            </div>
                          </div>

                          <div className="row">
                            <details>
                              <summary style={{ color: "green" }}>
                                {val?.TransporterVehicle?.TransportVehicle?.type} More Details
                              </summary>
                              <div className="accordion-content">
                                <div className="d-md-flex justify-content-between">
                                  <div className="sellerAddres">
                                    <h6>Transport company Detail</h6>
                                    <p>
                                      <b>Name : </b>
                                      {val?.TransporterVehicle?.User?.FirstName}{" "}
                                      {val?.TransporterVehicle?.User?.LatName}
                                    </p>
                                    <p>
                                      <b>Phone : </b>
                                      {val?.TransporterVehicle?.User?.Phone}
                                    </p>
                                    <p>
                                      <b>Address : </b>
                                      {val?.TransporterVehicle?.User?.userInfo?.Address1},{" "}
                                      {val?.TransporterVehicle?.User?.userInfo?.City},{" "}
                                      {val?.TransporterVehicle?.User?.userInfo?.State} -
                                      {val?.TransporterVehicle?.User?.userInfo?.Zip}
                                    </p>
                                  </div>
                                  <div className="sellerAddres">
                                    <h6>Delivery Address</h6>
                                    <p>
                                      <b>Name : </b>
                                      {val?.DeliveryAddress?.FirstName}{" "}
                                      {val?.DeliveryAddress?.LatName}
                                    </p>
                                    <p>
                                      <b>Phone : </b>
                                      {val?.DeliveryAddress?.Phone}
                                    </p>
                                    <p>
                                      <b>Address : </b>
                                      {
                                        val?.DeliveryAddress?.addressLine1
                                      }, {val?.DeliveryAddress?.city},{" "}
                                      {val?.DeliveryAddress?.State} -
                                      {val?.DeliveryAddress?.postalCode}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                  {/* <div className="sellerAddres">
                                      <h6>Product detail to pickup</h6>
                                      <p>
                                        <b>Product Name : </b>
                                        {val?.productDetail?.productDtlName}
                                      </p>
                                      <p className="ordersummarytext">
                                        You have to deliver{" "}
                                        <span>
                                          {val?.quantity}{" "}
                                          {
                                            val?.productDetail?.ProductUnit
                                              ?.unitName
                                          }
                                        </span>{" "}
                                        of {val?.productDetail?.productDtlName}
                                      </p>
                                    </div> */}
                                  <div className="sellerAddres">
                                    <h6>Transport Driver Detail</h6>
                                    <p>
                                      <b>Vehicle Number : </b>
                                      {val?.TransporterVehicle?.vehicleNumber}
                                    </p>
                                    <p>
                                      <b>Driver Name : </b>
                                      {val?.TransporterVehicle?.driverName}
                                    </p>
                                    <p>
                                      <b>Driver Contact : </b>
                                      {val?.TransporterVehicle?.driverContact}
                                    </p>
                                    <p>
                                      <b>Charge PerKm : </b>
                                      {val?.TransporterVehicle?.chargePerKm}
                                    </p>
                                  </div>
                                </div>
                                {/* <OrderTracker
                                    status={ele?.orderDetail?.status}
                                  /> */}
                              </div>
                            </details>
                            {/* )} */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div
                      className="detailWrapper border p-3 rounded shadow"
                      style={{ top: "10px" }}
                    >
                      <h5 className="mb-4">Price Details</h5>
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td>Price ({OrderDetails.length} items)</td>
                            <td>₹{totalPrice}</td>
                          </tr>
                          <tr>
                            <td>Discount</td>
                            <td>− ₹{totalDiscount}</td>
                          </tr>
                          <tr>
                            <td>Delivery Charges</td>
                            <td>
                              {/* ₹{deliveryCharges > 0 ? deliveryCharges : "Free"} */}
                              {totalTransportCharge || 0}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Total Amount</strong>
                            </td>
                            <td>
                              <strong>₹{finalTotal + totalTransportCharge}</strong>
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
                      <textarea
                        className="form-control adjustLabel_input shadow-none p-2 ms-2"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="Reviewmessage"
                        placeholder="Review message"
                        value={adminReviewComment}
                        onChange={(e) => {
                          setAdminReviewComment(e.target.value);
                          setErrors({});
                        }}
                      ></textarea>
                      {Errors.adminReviewComment && (
                        <span className="error_input_text ms-3">
                          {Errors.adminReviewComment}
                        </span>
                      )}
                      {/* <button
                                                    className="CheckoutBtn w-100 mt-3"
                                                    onClick={handleCheckout}
                                                    disabled={isCheckingOut}
                                                >
                                                    {isCheckingOut ? <MiniLoader /> : "Checkout"}
                                                </button> */}
                      {/* <button className="CheckoutBtn w-100 mt-3">Checkout</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-around">
              <button
                type="button"
                disabled={OrderDetails?.some((ele) => ele.TransporterVehicle == null)}
                className="btn btn-success w-25"
                onClick={() => {
                  setConfirm(true);
                  setMessage("Are you sure to approve this order");
                  setActionType("approve");
                }}
              >
                Approve it
              </button>
              <button
                type="button"
                disabled={OrderDetails?.some((ele) => ele.TransporterVehicle == null)}
                className="btn btn-danger w-25"
                onClick={() => {
                  setConfirm(true);
                  setMessage("Are you sure to reject this order");
                  setActionType("reject");
                }}
              >
                Reject it
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModel
        show={confirm}
        onConfirm={onConfirmHandeler}
        onCancel={onCancelHandeler}
        message={message}
        loading={isLoading}
      />
    </>
  );
};

export default OrderModal;
