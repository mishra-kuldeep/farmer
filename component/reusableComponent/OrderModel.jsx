import React, { useEffect, useRef, useState } from "react";
import { IoIosPerson } from "react-icons/io";
import "../../app/product/[...slug]/productPage.css";
import ConfirmModel from "./ConfirmModel";
import toast from "react-hot-toast";
import { Image_URL } from "@/helper/common";
import IconButton from "./IconButton";
import "../../app/basket/basket.css";
import OrderService from "@/services/Orderservices";
import { FaMinus, FaPlus } from "react-icons/fa";
import MiniLoader from "./MiniLoader";
import { MdOutlineLocationOn } from "react-icons/md";
import "../../app/myAccount/customerOrder/customerOrder.css"
import VehicleServices from "@/services/VehicleServices";
import { calculateDistance } from "@/helper/utils";

const OrderModal = ({ modalData, setActionPerformed, isHide }) => {
  const [confirm, setConfirm] = useState(false);
  const [isAddTransporter, setIsAddTransporter] = useState(false);
  const [message, setMessage] = useState("");
  const [actionType, setActionType] = useState("");
  const [isLoading, setloading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [transpoterlist, setTranspoterlist] = useState([]);
  const [adminReviewComment, setAdminReviewComment] = useState("");
  const closeButtonRef = useRef(null);
  const [Errors, setErrors] = useState({});
  const [Transdata, setTransdata] = useState({});
  const orderDetailId = [];
  const transporterDeliveryDetailId = [];
  const [distanceArr, setDistanceArr] = useState([]);
  const [TransporterDelivery, setTransporterDelivery] = useState([]);


  const getTranspoter = (TransData,) => {
    const data = {
      location: TransData?.zip,
      countryId: TransData?.countryId,
    };

    VehicleServices.getTranspoterForBuyer(data)
      .then(({ data }) => {
        setTranspoterlist(data?.data);
      })
      .catch((err) => {
        console.log(err);
        // setErrror(err?.response?.data?.message);
      });
  };
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
  const onHandelerAddTran = (isOpen, TransData) => {
    setIsAddTransporter(isOpen);
    setTransdata(TransData)
    getTranspoter(TransData)
  };

  useEffect(() => {
    if (modalData) {
      setIsLoadingDetails(true);
      OrderService.getOrderDetailAdmin(modalData)
        .then(({ data }) => {
          setDistanceArr([]);
          setTransporterDelivery([]);
          data?.data.map((ele) => {
            if (ele.transVehicalId) {
              OrderService.getTransporterDetailForOrderDetails(ele.orderDetailId)
                .then(({ data }) => {
                  setTransporterDelivery((pre) => [...pre, data]);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
          setOrderDetails(data?.data);
          setIsLoadingDetails(false);
          if (data?.data?.length > 0) {
            setDistanceArr([]);
            for (let index = 0; index < data?.data?.length; index++) {
              calculateDistance(
                data?.data[index]?.DeliveryAddress?.postalCode,
                data?.data[index]?.productDetail?.User?.userInfo?.Zip
              )
                .then((distance) => {
                  const obj = {
                    productDtlId: data?.data[index]?.productDetail?.productDtlId,
                    distance,
                  };
                  setDistanceArr((pre) => [...pre, obj]);
                })
                .catch((error) => console.error(error));
            }
          }
        })
        .catch((err) => {
          console.log(err);

          setIsLoadingDetails(false);
        });
    }
  }, [modalData,isAddTransporter]);


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




  const hendleSelectTranspot = (trans_Vehical, trans_porterId, perKmCharge) => {
    const selectedDistance = distanceArr.find((val) => val?.productDtlId == Transdata.productDtlId);
    const maxDistance = Math.ceil(selectedDistance?.distance);
    const data = {
      transVehicalId: trans_Vehical,
      transporterId: trans_porterId,
      orderDetailId: Transdata?.orderDetailId,
      productDtlId: Transdata?.productDtlId,
      deliveryAddressId: Transdata?.addressId,
      sellerId: Transdata?.UserId,
      totalDistance: maxDistance,
      totalTranportCharge: maxDistance * perKmCharge,
      orderId: Transdata?.orderId,
    };
    VehicleServices.selectTranspoterForOrderProduct(data)
      .then(({ data }) => {
        if (data?.newDetail?.orderDetailId) {
          OrderService.getTransporterDetailForOrderDetails(
            data?.newDetail?.orderDetailId
          )
            .then(({ data }) => {
              setTransporterDelivery((pre) => [...pre, data]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        setTransdata((pre) => ({ ...pre, transVehicalId: trans_Vehical }));
        const index = productList
          .map((val) => val?.orderDetailId)
          .indexOf(orderDetailId);
        const selectedOrder = productList[index];
        selectedOrder.transVehicalId = data?.newDetail?.transVehicalId;
        setProductList(productList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      < div className="modal fade" id="exampleModal" tabIndex="-1" >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              {!isAddTransporter ?
                <h5 className="modal-title" id="exampleModalLabel"> Verify Order</h5> :
                <>
                  <button
                    type="button"
                    className="btn btn-success mx-2 px-3 p-0"
                    onClick={() => onHandelerAddTran(false)}
                  >Back</button>
                  <h5 className="modal-title" id="exampleModalLabel">{" "}Transporter list</h5>
                </>
              }
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onHandelerAddTran(false)}
                ref={closeButtonRef}
              ></button>
            </div>
            {!isAddTransporter ?
              <>
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
                          {OrderDetails?.map((val, i) =>
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
                                  <div className=" text-secondary">
                                    Distance:
                                    {Math.ceil(distanceArr[i]?.distance)} km
                                  </div>
                                  {val?.transVehicalId != null && (
                                    <div className=" text-secondary">
                                      Transportation Charges: {val?.productDetail.country?.currencySymbol}
                                      {
                                        TransporterDelivery.find(
                                          (vals) =>
                                            vals?.productDtlId ==
                                            val?.productDtlId
                                        )?.totalTranportCharge
                                      }
                                    </div>
                                  )}
                                  {val?.TransporterVehicle != null ?
                                    <p style={{ color: "red", marginTop: "5px" }}>
                                      <button
                                        type="button"
                                        // disabled
                                        className="btn btn-success m-1 p-1"
                                        onClick={() => onHandelerAddTran(
                                          true,
                                          {
                                            orderId: val.orderId,
                                            orderDetailId: val.orderDetailId,
                                            productDtlId: val.productDtlId,
                                            UserId: val?.productDetail?.User?.UserId,
                                            addressId: val?.addressId,
                                            transVehicalId: val.transVehicalId,
                                            zip: val?.productDetail?.User?.userInfo?.Zip,
                                            countryId: val?.productDetail?.countryId
                                          }
                                        )}
                                      >
                                        Change Transports
                                      </button>
                                    </p>
                                    :
                                    <p style={{ color: "red", marginTop: "5px" }}>
                                      <button
                                        type="button"
                                        // disabled
                                        className="btn btn-success m-1 p-1"
                                        onClick={() => onHandelerAddTran(
                                          true,
                                          {
                                            orderId: val.orderId,
                                            orderDetailId: val.orderDetailId,
                                            productDtlId: val.productDtlId,
                                            UserId: val?.productDetail?.User?.UserId,
                                            addressId: val?.addressId,
                                            transVehicalId: val.transVehicalId,
                                            zip: val?.productDetail?.User?.userInfo?.Zip,
                                            countryId: val?.productDetail?.countryId
                                          }
                                        )}
                                      >
                                        Add Transport
                                      </button>
                                      No Transport Is Select For This Product
                                    </p>}
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

                                  </div>
                                </details>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {!isHide &&
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
                  </div>}

              </>
              :
              <div>
                <div style={{ display: "flex", flexDirection: "column" }}>

                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Transporter Name</th>
                        <th className="text-center">Vehicle Type</th>
                        <th className="text-center">Capacity</th>
                        <th className="text-center">Charge Per Km</th>
                        <th className="text-center">Avialability</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>

                    {transpoterlist?.map((val, i) => (

                      <tbody>
                        <tr>
                          <td >{i + 1}</td>
                          <td>{val?.User.FirstName} {val?.User.LastName}</td>
                          <td className="text-center">{val?.TransportVehicle.type}</td>
                          <td className="text-center"> {val?.TransportVehicle.capacity} Ton</td>
                          <td className="text-center">{val?.chargePerKm} Km {" "}
                            <span className="text-success">
                              You Save :{" "}
                              {val?.availableOffers ? (
                                <p className="text-secondary mt-2">
                                  {val?.availableOffers} OFF
                                </p>
                              ) : (
                                "0 OFF"
                              )}</span></td>
                          <td className="text-center"> {val?.vehicleAvailabilityStatus}</td>
                          <td className="text-center" style={{ paddingLeft: "40px" }}>  <IconButton
                            onClick={() =>
                              hendleSelectTranspot(
                                val?.transVehicalId,
                                val?.transporterId,
                                Number(val?.chargePerKm)
                              )
                            }
                            style={{ width: "25px", height: "25px" }}
                          >
                            <input
                              type="radio"
                              className="radio"
                              name="vehicle"
                              value={val?.transVehicalId}
                              checked={val?.transVehicalId == Transdata?.transVehicalId}
                              style={{ width: "20px", height: "20px" }}
                            />
                          </IconButton></td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            }
          </div>
        </div>
      </div >
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
