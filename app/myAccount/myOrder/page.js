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
import { IoIosArrowDown } from "react-icons/io";
import IconButton from "@/component/reusableComponent/IconButton";
import { Image_URL } from "@/helper/common";
import Pagination from "@/component/reusableComponent/Pagination";

const MyOrder = () => {
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [metaData, setmetaData] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // State to track the open div index
  const [loading, setloading] = useState(false);
  const [miniloading, setMiniloading] = useState(false);

  useEffect(() => {
    setloading(true);
    OrderService.BuyerOrderList(status,page)
      .then(({ data }) => {
        setOrderList(data?.data);
        setmetaData(data?.meta);
        console.log(data?.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status,page]);

  const toggleDiv = (index, orderId) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle div open/close
    showfullProductList(orderId);
  };
  const handleStatusChange = (value) => {
    setPage(1)
    setStatus(value);
    setOpenIndex(null);
  };

  const showfullProductList = (orderId) => {
    setMiniloading(true);
    OrderService.BuyerOrderSingleList(orderId)
      .then(({ data }) => {
        setProductList(data?.data);
        setMiniloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(productList);

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
                        {productList?.map((ele) => {
                          return (
                            <div className="productorderbox">
                              <div className="row">
                                <div className="col-md-5">
                                  <div className="d-flex gap-3">
                                    <img
                                      src={`${Image_URL}/products/${ele?.productDetail?.ProductsImages[0]?.url}`}
                                      height="100px"
                                      width="100px"
                                    />
                                    <div>
                                      <h6 className="text-secondary">
                                        {ele?.productDetail?.productDtlName}
                                      </h6>
                                      <h6 className="mt-2">
                                        ₹ {ele?.productDetail?.price}/
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
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="col-md-4">fg;lj</div>
                                <div className="col-md-3">fg;lj</div> */}
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
    </div>
  );
};

export default MyOrder;
