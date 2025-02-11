"use client";
import React, { useEffect, useState } from "react";
import "./orderStyle.css";
import OrderService from "@/services/Orderservices";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { IoIosArrowDown, IoIosPerson } from "react-icons/io";
import IconButton from "@/component/reusableComponent/IconButton";
import { Image_URL } from "@/helper/common";
import Pagination from "@/component/reusableComponent/Pagination";
import VehicleServices from "@/services/VehicleServices";
import OrderTracker from "@/component/smallcompo/OrderTracker";
import { MdDelete, MdOutlineLocationOn } from "react-icons/md";
import "../../myAccount/customerOrder/customerOrder.css";
import { calculateDistance } from "@/helper/utils";
import { isMobile } from "react-device-detect";
import PaymentOrder from "@/component/reusableComponent/PaymentOrder";
import Link from "next/link";
import ConfirmModel from "@/component/reusableComponent/ConfirmModel";
import toast from "react-hot-toast";

const MyOrder = () => {
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [metaData, setmetaData] = useState(false);
  const [orderId, setorderId] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setloading] = useState(false);
  const [miniloading, setMiniloading] = useState(false);
  const [transpoterlist, setTranspoterlist] = useState([]);
  const [SelectTranspoterlist, setSelectTranspoterlist] = useState([]);
  const [orderDetailId, setorderDetailId] = useState(null);
  const [productDtlId, setProductDtlId] = useState(null);
  const [deliveryAddressId, setdeliveryAddressId] = useState(null);
  const [selectTransVehicalId, setSelectTransVehicalId] = useState(null);
  const [distanceArr, setDistanceArr] = useState([]);
  const [userId, setUserId] = useState(null);
  const [Errrors, setErrror] = useState([]);
  const [TransporterDelivery, setTransporterDelivery] = useState([]);
  const [isAdminReview, setIsAdminReview] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalProductChar, setTotalProductChar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [CurrencyPrefix, setCurrencyPrefix] = useState('')
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [Dloader, setDLoader] = useState(false);

  useEffect(() => {
    setloading(true);
    OrderService.BuyerOrderList(status, page)
      .then(({ data }) => {
        setOrderList(data?.data);
        setmetaData(data?.meta);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status, page]);

  // Toggle div open/close
  const toggleDiv = (index, orderId, review) => {
    setOpenIndex(openIndex === index ? null : index);
    showfullProductList(orderId);
    setIsAdminReview(review);
  };

  const handleStatusChange = (value) => {
    setPage(1);
    setStatus(value);
    setOpenIndex(null);
  };

  const handleOncloses = (value) => {
    setErrror("");
    setTranspoterlist([]);
  };
  const showfullProductList = (orderId) => {
    setMiniloading(true);
    OrderService.BuyerOrderSingleList(orderId)
      .then(({ data }) => {
        setCurrencyPrefix(data?.data[0]?.productDetail?.country?.currencySymbol)
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
        setProductList(data?.data);
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
        setMiniloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get Transpoter for Order Delivery
  const getTranspoter = (
    location,
    OrderDetailId,
    productDtlId,
    UserId,
    addressId,
    selectTransVehical,
    countryId,
    orderId
  ) => {
    const data = {
      location: location,
      countryId: countryId,
    };
    setorderDetailId(OrderDetailId);
    setProductDtlId(productDtlId);
    setUserId(UserId);
    setdeliveryAddressId(addressId);
    setSelectTransVehicalId(selectTransVehical);
    setorderId(orderId);
    VehicleServices.getTranspoterForBuyer(data)
      .then(({ data }) => {
        setTranspoterlist(data?.data);
        setMiniloading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrror(err?.response?.data?.message);
      });
  };
  const hendleSelectTranspot = (trans_Vehical, trans_porterId, perKmCharge) => {
    // setMiniloading(true);
    const selectedDistance = distanceArr.find(
      (val) => val?.productDtlId == productDtlId
    );
    const maxDistance = Math.ceil(selectedDistance?.distance);
    const data = {
      transVehicalId: trans_Vehical,
      transporterId: trans_porterId,
      orderDetailId: orderDetailId,
      productDtlId: productDtlId,
      deliveryAddressId: deliveryAddressId,
      sellerId: userId,
      totalDistance: maxDistance,
      totalTranportCharge: maxDistance * perKmCharge,
      orderId: orderId,
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
        setSelectTransVehicalId(trans_Vehical);
        const index = productList
          .map((val) => val?.orderDetailId)
          .indexOf(orderDetailId);
        const selectedOrder = productList[index];
        selectedOrder.transVehicalId = data?.newDetail?.transVehicalId;
        setProductList(productList);
        setSelectTranspoterlist(data?.newDetail);
        setMiniloading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrror(err?.response?.data?.message);
      });
  };

  //************  Opens the modal and sets the selected order ****************/
  const handleOpenModal = (order, price) => {
    setSelectedOrder(order);
    setTotalProductChar(price);
    setShowModal(true);
  };

  //**************** */ Closes the modal and resets the state   ****************/
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };


  const handleCancel = () => {
    setShowConfirm(false);
  };

  const hendledelete = (OrderId) => {
    setSelectedId(OrderId);
    setShowConfirm(true);
  }

  const handleDelete = async () => {
    setDLoader(true)
    await OrderService.deleteOrder(selectedId).then((data) => {
      setOrderList(orderList.filter((ele) => ele.OrderId !== selectedId));
      setShowConfirm(false);
      setDLoader(false)
      toast("Order deleted successfully!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "green",
          color: "#fff",
        },
      });
    }).catch((err) => {
      console.log(err)
      setShowConfirm(false);
      setDLoader(false)
      toast.error(err.response.data.message || "Order Cancellation is not possible Please contact Our Team.", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#ff4d4f",
          color: "#fff",
        },
        autoClose: 500,
      });
    });

  };

  return (
    <div className="orderPage">
      <div className="d-md-flex">
        <div className="w-100 gap-4 d-flex m-2">
          <label className="cursor">
            <input
              type="radio"
              value="All"
              checked={status == "All"}
              onChange={() => handleStatusChange("All")}
            />
            <span className="m-1">All</span>
          </label>
          <label>
            <input
              type="radio"
              value="isApproved"
              checked={status == "isApproved"}
              onChange={() => handleStatusChange("isApproved")}
            />
            <span className="m-1">Approved</span>
          </label>

          <label>
            <input
              type="radio"
              value="isPending"
              checked={status == "isPending"}
              onChange={() => handleStatusChange("isPending")}
            />
            <span className="m-1">Pending</span>
          </label>
          <label>
            <input
              type="radio"
              value="isRejected"
              checked={status == "isRejected"}
              onChange={() => handleStatusChange("isRejected")}
            />
            <span className="m-1">Rejected</span>
          </label>
        </div>
        <div className="w-100">
          <Pagination
            page={page}
            setPage={setPage}
            List={orderList}
            metaData={metaData}
          />
        </div>
      </div>
      {loading ? (
        <div style={{ height: "70vh" }} className="centerAllDiv">
          <MiniLoader />
          Loading ...
        </div>
      ) : (
        <div>
          {orderList?.map((ele, index) => {
            return (
              <div key={index}>
                <div
                  className="orderItemWrap"
                  style={{ backgroundColor: index == openIndex && "#f3f3f3" }}
                >
                  <div className="row m-0 align-items-center">
                    <div className="col-md-3">
                      <h6 className="text-secondary">
                        Total Price : ₹ {ele?.totalAmount}
                      </h6>
                    </div>
                    <div className="col-md-3">
                      <p className="text-secondary">
                        Order on : {ele?.orderDate.substring(0, 10)}
                      </p>
                    </div>
                    <div className="col-md-6 d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2">
                        <p
                          className="orderstatuscircle mt-2"
                          style={{
                            backgroundColor:
                              ele.adminReview === "Pending"
                                ? "orange"
                                : ele.adminReview === "Rejected" && "red",
                          }}
                        ></p>
                        <div>
                          <p className="text-secondary">
                            {ele.adminReview} by admin
                          </p>
                          {ele.adminReviewDate && (
                            <p className="text-secondary">
                              on {ele?.adminReviewDate?.substring(0, 10)}{" "}
                            </p>
                          )}
                          <p className="text-secondary">
                            {ele?.adminReviewComment}
                          </p>
                        </div>
                      </div>
                      {ele.adminReview == "Approved" &&
                        (ele?.paymentStatus == "Pending" ||
                          ele?.paymentStatus == "Failed") ? (
                        <>
                          {showModal && (
                            <PaymentOrder
                              selectedOrder={selectedOrder}
                              totalProductChar={totalProductChar}
                              onClose={handleCloseModal}
                            />
                          )}
                          <button
                            className="login_btn"
                            style={{ whiteSpace: "nowrap" }}
                            onClick={() =>
                              handleOpenModal(ele?.orderId, ele?.totalAmount)
                            }
                          >
                            Pay now
                          </button>
                          {ele?.paymentStatus == "Failed" && (
                            <p>
                              <span className="text-secondary">Payment </span>
                              <span className="text-danger">
                                {ele?.paymentStatus}
                              </span>
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <span className="text-secondary">Payment </span>
                          <span className="text-info">
                            {ele?.paymentStatus}
                          </span>
                        </p>
                      )}
                      {(ele?.paymentStatus == "Pending" || ele?.paymentStatus == "Failed") && (
                        <IconButton
                          onClick={() =>
                            hendledelete(ele?.orderId)
                          }
                        >
                          <MdDelete color="red" size={20} />
                        </IconButton>)}
                      <IconButton
                        onClick={() =>
                          toggleDiv(index, ele?.orderId, ele.adminReview)
                        }
                      >
                        <IoIosArrowDown
                          style={{
                            transform: index == openIndex && "rotate(180deg)",
                          }}
                        />
                      </IconButton>

                    </div>
                  </div>
                </div>

                {/* Conditionally render the new div when clicked */}
                {openIndex === index && (
                  <div className="ordardetailWrapper">
                    {miniloading ? (
                      <div className="d-flex justify-content-center">
                        <MiniLoader />
                        <span>loading ...</span>
                      </div>
                    ) : (
                      <div>
                        {productList?.map((ele, i) => {
                          return (
                            <div className="productorderbox " key={i}>
                              <p className="indexing">{i + 1}</p>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="d-md-flex gap-3">
                                    <img
                                      src={`${Image_URL}/products/${ele?.productDetail?.ProductsImages[0]?.url}`}
                                      height={isMobile ? "300px" : "150px"}
                                      width={isMobile ? "100%" : "150px"}
                                      alt="image"
                                    />
                                    <div>
                                      <h6 className="text-secondary">
                                        {ele?.productDetail?.productDtlName}
                                      </h6>
                                      <h6 className="mt-2">
                                        <del>
                                          {ele.productDetail.country?.currencySymbol}{ele?.productDetail?.price}/
                                          {
                                            ele?.productDetail?.ProductUnit
                                              ?.unitName
                                          }
                                        </del>{" "}
                                        {ele.productDetail.country?.currencySymbol}{" "}
                                        {ele?.productDetail?.price -
                                          (ele?.productDetail?.discountType ===
                                            "fixed"
                                            ? ele?.productDetail?.discount *
                                            ele?.quantity
                                            : (ele?.productDetail?.price *
                                              ele?.productDetail?.discount) /
                                            100)}
                                        /
                                        {
                                          ele?.productDetail?.ProductUnit
                                            ?.unitName
                                        }
                                      </h6>
                                      <h6
                                        className="mt-2"
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "bold",
                                          color: "green",
                                        }}
                                      >
                                        You Save :{" "}
                                        {ele?.productDetail?.discountType ===
                                          "fixed" && ele.productDetail.country?.currencySymbol}
                                        {ele?.productDetail?.discount}
                                        {ele?.productDetail?.discountType ===
                                          "percentage" && "%"}{" "}
                                        OFF
                                      </h6>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "bold",
                                          color: "grey",
                                        }}
                                      >
                                        {
                                          ele?.productDetail?.ProductGrade
                                            ?.gradeName
                                        }{" "}
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
                                          {ele?.productDetail?.User?.FirstName}
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
                                        {
                                          ele?.productDetail?.User?.userInfo?.City
                                        }
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className=" text-secondary">
                                    Distance:
                                    {Math.ceil(distanceArr[i]?.distance)}
                                  </div>
                                  {ele?.transVehicalId != null && (
                                    <div className=" text-secondary">
                                      Transportation Charges: {ele?.productDetail.country?.currencySymbol}
                                      {
                                        TransporterDelivery.find(
                                          (val) =>
                                            val?.productDtlId ==
                                            ele?.productDtlId
                                        )?.totalTranportCharge
                                      }
                                    </div>
                                  )}
                                  <div className=" text-secondary">
                                    Purchase Price: {ele?.productDetail?.country?.currencySymbol}{ele?.priceAtPurchase}
                                  </div>
                                  <div className=" text-secondary">
                                    {" "}
                                    Quantity: {ele?.quantity}{" "}
                                    {ele?.productDetail?.ProductUnit?.unitName}
                                  </div>
                                  {ele?.status == "Delivered" && (
                                    <div className=" text-secondary">
                                      <Link href={`/myAccount/rateProduct/${ele?.productDtlId}`}> ★ Rate & Review Product</Link>
                                    </div>)
                                  }
                                </div>
                                <div className="col-md-3 d-flex align-items-center">
                                  {isAdminReview == "Pending" && (
                                    <div
                                      className="col-md-2"
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#offcanvasRight"
                                      aria-controls="offcanvasRight"
                                      onClick={() =>
                                        getTranspoter(
                                          ele?.productDetail?.User?.userInfo
                                            ?.Zip,
                                          ele.orderDetailId,
                                          ele.productDtlId,
                                          ele?.productDetail?.User?.UserId,
                                          ele?.addressId,
                                          ele?.transVehicalId,
                                          ele?.productDetail?.countryId,
                                          ele?.orderId
                                        )
                                      }
                                    >
                                      {ele?.transVehicalId == null ? (
                                        <button
                                          className="login_btn"
                                          style={{ whiteSpace: "nowrap" }}
                                        >
                                          Select Transports
                                        </button>
                                      ) : (
                                        <button
                                          className="login_btn"
                                          style={{ whiteSpace: "nowrap" }}
                                        >
                                          Change Transports
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <hr />
                              <details disabled>
                                <summary style={{ color: "green" }}>
                                  Transporter More Details
                                </summary>
                                <div className="accordion-content">
                                  <div className="d-md-flex justify-content-between">
                                    <div className="sellerAddres">
                                      <h6>Transport Driver & company Detail</h6>
                                      <p>
                                        <b>Company Name : </b>
                                        {
                                          ele?.TransporterVehicle?.User
                                            ?.CompanyName
                                        }
                                        {/* {ele?.TransporterVehicle?.User?.LatName} */}
                                      </p>
                                      {/* <p>
                                        <b>Phone : </b>
                                        {ele?.TransporterVehicle?.User?.Phone}
                                      </p>
                                      <p>
                                        <b>Address : </b>
                                        {ele?.TransporterVehicle?.User?.userInfo?.Address1},{" "}
                                        {ele?.TransporterVehicle?.User?.userInfo?.City},{" "}
                                        {ele?.TransporterVehicle?.User?.userInfo?.State} -
                                        {ele?.TransporterVehicle?.User?.userInfo?.Zip}
                                      </p> */}
                                      {/* <h6>Transport Driver Detail</h6> */}
                                      <p>
                                        <b>Vehicle Number : </b>
                                        {ele?.TransporterVehicle?.vehicleNumber}
                                      </p>
                                      <p>
                                        <b>Driver Name : </b>
                                        {ele?.TransporterVehicle?.driverName}
                                      </p>
                                      <p>
                                        <b>Driver Contact : </b>
                                        {ele?.TransporterVehicle?.driverContact}
                                      </p>
                                      <p>
                                        <b>Charge PerKm : </b>
                                        {ele?.TransporterVehicle?.chargePerKm}
                                      </p>
                                    </div>
                                    <div className="sellerAddres">
                                      <h6>Delivery Address</h6>
                                      <p>
                                        <b>Name : </b>
                                        {ele?.DeliveryAddress?.FirstName}{" "}
                                        {ele?.DeliveryAddress?.LatName}
                                      </p>
                                      <p>
                                        <b>Phone : </b>
                                        {ele?.DeliveryAddress?.Phone}
                                      </p>
                                      <p>
                                        <b>Address : </b>
                                        {
                                          ele?.DeliveryAddress?.addressLine1
                                        }, {ele?.DeliveryAddress?.city},{" "}
                                        {ele?.DeliveryAddress?.State} -
                                        {ele?.DeliveryAddress?.postalCode}
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
                                    {/* <div className="sellerAddres">
                                      <h6>Transport Driver Detail</h6>
                                      <p>
                                        <b>Vehicle Number : </b>
                                        {ele?.TransporterVehicle?.vehicleNumber}
                                      </p>
                                      <p>
                                        <b>Driver Name : </b>
                                        {ele?.TransporterVehicle?.driverName}
                                      </p>
                                      <p>
                                        <b>Driver Contact : </b>
                                        {ele?.TransporterVehicle?.driverContact}
                                      </p>
                                      <p>
                                        <b>Charge PerKm : </b>
                                        {ele?.TransporterVehicle?.chargePerKm}
                                      </p>
                                    </div> */}
                                  </div>
                                </div>
                              </details>
                              <div>
                                <OrderTracker status={ele?.status} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <ConfirmModel
            show={showConfirm}
            onConfirm={handleDelete}
            onCancel={handleCancel}
            message="Are you sure you want to delete this item?"
            loading={Dloader}
          />
        </div>
      )}
      <div
        className="offcanvas offcanvas-end"
        style={{ width: "1400px" }}
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">List of Transports</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleOncloses}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {transpoterlist?.map((val, i) => (
              <div
                key={i}
                className="orderItemWrap"
                style={{ backgroundColor: "#f3f3f3" }}
              >
                <div className="row m-0 align-items-center">
                  <div className="col-md-3">
                    <h6 className="text-secondary">
                      Transporter : {val?.User.FirstName} {val?.User.LastName}
                    </h6>
                  </div>
                  <div className="col-md-2">
                    <h6 className="text-secondary">
                      {val?.TransportVehicle.type}
                    </h6>
                  </div>
                  <div className="col-md-2">
                    <h6 className="text-secondary">
                      Capacity in Ton: {val?.TransportVehicle.capacity}
                    </h6>
                  </div>
                  <div className="col-md-2">
                    <p className="text-secondary">
                      Charge Per Km :{CurrencyPrefix} {val?.chargePerKm}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "green",
                      }}
                    >
                      You Save :{" "}
                      {val?.availableOffers ? (
                        <p className="text-secondary mt-2">
                          {val?.availableOffers} OFF
                        </p>
                      ) : (
                        "0 OFF"
                      )}
                    </p>
                  </div>
                  <div className="col-md-2 d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2">
                      <p
                        className="orderstatuscircle mt-2"
                      // style={{backgroundColor:"orange"}}
                      ></p>
                      <div>
                        <p className="text-secondary">
                          {val?.vehicleAvailabilityStatus}
                        </p>
                        <p className="text-secondary"></p>
                      </div>
                    </div>
                    <IconButton
                      onClick={() =>
                        hendleSelectTranspot(
                          Number(val?.transVehicalId),
                          Number(val?.transporterId),
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
                        checked={val?.transVehicalId == selectTransVehicalId}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
            <p>{Errrors}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
