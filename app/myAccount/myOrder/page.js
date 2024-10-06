// "use client";
// import React, { useEffect, useState } from "react";
// import "./orderStyle.css";
// import OrderService from "@/services/Orderservices";

// const MyOrder = () => {
//   const [status, setStatus] = useState("all");
//   const [orderList, setOrderList] = useState([]);
//   useEffect(() => {
//     OrderService.BuyerOrderList(status)
//       .then(({ data }) => {
//         setOrderList(data?.data);
//         console.log(data?.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);
//   return (
//     <div className="orderPage">
//       {orderList?.map((ele) => {
//         return (
//           <div className="orderItemWrap">
//             <div className="row m-0 align-items-center">
//               <div className="col-md-3">
//                 <h6 className="text-secondary">
//                   Total Price : ₹ {ele?.totalAmount}
//                 </h6>
//               </div>
//               <div className="col-md-3">
//                 <p className="text-secondary">
//                   Order on : {ele?.orderDate.substring(0, 10)}
//                 </p>
//               </div>

//               <div className="col-md-6">
//                 <div className="d-flex  gap-2">
//                   <p
//                     className="orderstatuscircle mt-2"
//                     style={{
//                       backgroundColor:
//                         ele.adminReview == "Pending"
//                           ? "orange"
//                           : ele.adminReview == "Rejected" && "red",
//                     }}
//                   ></p>
//                   <div>
//                     <p className="text-secondary">{ele.adminReview} by admin</p>
//                     {ele?.adminReviewDate && (
//                       <p className="text-secondary ">
//                         on {ele?.adminReviewDate?.substring(0, 10)}{" "}
//                       </p>
//                     )}
//                     <p className="text-secondary">{ele?.adminReviewComment}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default MyOrder;

"use client";
import React, { useEffect, useState } from "react";
import "./orderStyle.css";
import OrderService from "@/services/Orderservices";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { IoIosArrowDown, IoIosPerson } from "react-icons/io";
import IconButton from "@/component/reusableComponent/IconButton";
import { Image_URL } from "@/helper/common";
import Pagination from "@/component/reusableComponent/Pagination";
import { TbTruckDelivery } from "react-icons/tb";
import VehicleServices from "@/services/VehicleServices";
import OrderTracker from "@/component/smallcompo/OrderTracker";
import { MdOutlineLocationOn } from "react-icons/md";
const MyOrder = () => {
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [metaData, setmetaData] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // State to track the open div index
  const [loading, setloading] = useState(false);
  const [miniloading, setMiniloading] = useState(false);
  const [transpoterlist, setTranspoterlist] = useState([]);
  const [SelectTranspoterlist, setSelectTranspoterlist] = useState([]);
  const [orderDetailId, setorderDetailId] = useState(null);
  const [productDtlId, setProductDtlId] = useState(null);
  const [deliveryAddressId, setdeliveryAddressId] = useState(null);
  const [selectTransVehicalId, setSelectTransVehicalId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [Errrors, setErrror] = useState([]);

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
  const toggleDiv = (index, orderId) => {
    setOpenIndex(openIndex === index ? null : index);
    showfullProductList(orderId);
  };

  const handleStatusChange = (value) => {
    setPage(1)
    setStatus(value);
    setOpenIndex(null);
  };

  const handleOncloses = (value) => {
    setErrror("")
    setTranspoterlist([])
  };

  const showfullProductList = (orderId) => {
    setMiniloading(true);
    OrderService.BuyerOrderSingleList(orderId)
      .then(({ data }) => {
        setProductList(data?.data);
        setSelectTranspoterlist(data?.data.map((ele) => ele.transVehicalId));
        setMiniloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get Transpoter for Order Delivery
  const getTranspoter = (location, OrderDetailId, productDtlId, UserId, addressId, selectTransVehical) => {
    // setMiniloading(true);
    setorderDetailId(OrderDetailId)
    setProductDtlId(productDtlId)
    setUserId(UserId)
    setdeliveryAddressId(addressId)
    setSelectTransVehicalId(selectTransVehical)
    VehicleServices.getTranspoterForBuyer(location)
      .then(({ data }) => {
        setTranspoterlist(data?.data);
        setMiniloading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrror(err?.response?.data?.message)
      });
  };



  const hendleSelectTranspot = (trans_Vehical, trans_porterId) => {
    // setMiniloading(true);
    const data = {
      transVehicalId: trans_Vehical,
      transporterId: trans_porterId,
      orderDetailId: orderDetailId,
      productDtlId: productDtlId,
      deliveryAddressId: deliveryAddressId,
      sellerId: userId,
    }
    VehicleServices.selectTranspoterForOrderProduct(data)
      .then(({ data }) => {
        setSelectTransVehicalId(trans_Vehical)
        const index = productList.map((val) => (val?.orderDetailId)).indexOf(orderDetailId)
        const selectedOrder = productList[index]
        selectedOrder.transVehicalId = data?.newDetail?.transVehicalId
        setProductList(productList)
        setSelectTranspoterlist(data?.newDetail);
        setMiniloading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrror(err?.response?.data?.message)
      });
  };
  return (
    <div className="orderPage">
      <div className="d-flex">
        <div className="w-50 gap-4 d-flex m-2">
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
        <div className="w-50">
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
                          {ele?.adminReviewDate && (
                            <p className="text-secondary">
                              on {ele?.adminReviewDate?.substring(0, 10)}{" "}
                            </p>
                          )}
                          <p className="text-secondary">
                            {ele?.adminReviewComment}
                          </p>
                        </div>
                      </div>
                      <IconButton
                        onClick={() => toggleDiv(index, ele?.orderId)}
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
                        {productList?.map((ele,i) => {
                          return (
                            <div className="productorderbox " key={i}>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="d-flex gap-3">
                                    <img
                                      src={`${Image_URL}/products/${ele?.productDetail?.ProductsImages[0]?.url}`}
                                      height="100px"
                                      width="100px"
                                      alt="image"
                                    />
                                    <div>
                                      <h6 className="text-secondary">
                                        {ele?.productDetail?.productDtlName}
                                      </h6>
                                      <h6 className="mt-2">
                                        <del>₹ {ele?.productDetail?.price}/
                                          {
                                            ele?.productDetail?.ProductUnit
                                              ?.unitName
                                          }
                                        </del>
                                        {" "}
                                        ₹{" "}
                                        {ele?.productDetail?.price -
                                          (ele?.productDetail?.discountType === "fixed"
                                            ? ele?.productDetail?.discount * ele?.quantity
                                            : ((ele?.productDetail?.price *
                                              ele?.productDetail?.discount) /
                                              100)
                                          )}/{
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
                                          "fixed" && "₹"}
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
                                        <span className="fw-bold"
                                          style={{
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            color: "grey",
                                          }}
                                        >{ele?.User?.FirstName}</span>
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "bold",
                                          color: "grey",
                                        }}
                                      >
                                        <MdOutlineLocationOn size={18} />
                                        {ele?.User?.userInfo.City}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-2 text-secondary">Purchase Price: ₹{ele?.priceAtPurchase}</div>
                                <div className="col-md-2 text-secondary"> Quantity: {ele?.quantity}{" "}
                                  {
                                    ele?.productDetail?.ProductUnit
                                      ?.unitName
                                  }
                                </div>
                                {ele.status == "Pending" && <div
                                  className="col-md-2"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#offcanvasRight"
                                  aria-controls="offcanvasRight"
                                  onClick={() =>
                                    getTranspoter(
                                      ele?.User?.userInfo?.Zip,
                                      ele.orderDetailId,
                                      ele.productDtlId,
                                      ele?.User?.UserId,
                                      ele?.addressId,
                                      ele?.transVehicalId
                                    )
                                  }
                                >
                                  {ele?.transVehicalId == null ? (
                                    <p className="text-secondary transporter-text">Select Transports</p>)
                                    :
                                    (<p className="text-secondary transporter-text">Change Transports</p>)}
                                </div>
                                }
                              </div>
                              <div >
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
                      Transporter : {val?.User.FirstName}{" "}{val?.User.LastName}
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
                      Charge Per Km : {val?.chargePerKm}
                    </p>
                    <p style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "green",
                    }}>
                      You Save :{" "}{val?.availableOffers ?
                        <p className="text-secondary mt-2">
                          {val?.availableOffers}{" "}OFF
                        </p>
                        : "0 OFF"
                      }
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
                        <p className="text-secondary">

                        </p>
                      </div>
                    </div>
                    <IconButton
                      onClick={() => hendleSelectTranspot(Number(val?.transVehicalId), Number(val?.transporterId))}
                      style={{ width: "25px", height: "25px" }}
                    >
                      <input
                        className="cursor"
                        key={i}
                        type="checkbox"
                        // value={val?.transVehicalId}
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
