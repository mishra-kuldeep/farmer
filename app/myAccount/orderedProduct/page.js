"use client";
import OrderTracker from "@/component/smallcompo/OrderTracker";
import { Image_URL } from "@/helper/common";
import OrderService from "@/services/Orderservices";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderedProduct = () => {
  const user = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  const [orderedList, setOrderedList] = useState([]);
  useEffect(() => {
    if (user?.profile) {
      setLoader(true);
      OrderService.getOrderedConfirmToSeller("Approved")
        .then(({ data }) => {
          console.log(data?.data);
          setOrderedList(data?.data);
          setLoader(false);
        })
        .catch((err) => console.log(err));
    }
  }, [user?.profile]);

  return (
    <div className="">
      {orderedList?.map((elem) => {
        return (
          <div className="orderedWrapper">
            <div>
              <img
                src={`${Image_URL}/products/${elem?.productDetail?.ProductsImages[0]?.url}`}
              />
              <div style={{ lineHeight: "12px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "grey",
                  }}
                >
                  {" "}
                  Cutomer Order on : {elem?.Order?.orderDate?.substring(0, 10)}
                </span>
                <br />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "grey",
                  }}
                >
                  {" "}
                  Admin Approved on :{" "}
                  {elem?.Order?.adminReviewDate?.substring(0, 10)}
                </span>
              </div>
            </div>
            <div className="w-100">
              <h6 className="text-secondary">
                {elem?.productDetail?.productDtlName}
              </h6>
              <h6 className="mt-2">
                ₹ {elem?.priceAtPurchase}/
                {elem?.productDetail?.ProductUnit?.unitName}
                <sub className="m-2">
                  <del>
                    {" "}
                    ₹ {elem?.productDetail?.price}/
                    {elem?.productDetail?.ProductUnit?.unitName}
                  </del>
                </sub>
              </h6>
              {elem?.productDetail?.discount !== 0 && (
                <h6 style={{ fontSize: "12px" }} className="text-success mt-2">
                  {elem?.productDetail?.discountType == "fixed" && "₹"}{" "}
                  {elem?.productDetail?.discount}
                  {elem?.productDetail?.discountType == "percentage" &&
                    "%"} OFF{" "}
                  <span className="text-secondary">
                    on per {elem?.productDetail?.ProductUnit?.unitName}
                  </span>
                </h6>
              )}
              <p style={{ fontSize: "12px" }} className="text-secondary mt-2">
                {elem?.productDetail?.ProductGrade?.gradeName} Grade
              </p>

              <div style={{ color: "darkgreen", fontWeight: "bold" }}>
                Customer Ordered{" "}
                <span className="highlight">
                  {elem?.quantity} {elem?.productDetail?.ProductUnit?.unitName}
                </span>{" "}
                on the price of{" "}
                <span className="highlight">
                  ₹ {elem?.priceAtPurchase}/
                  {elem?.productDetail?.ProductUnit?.unitName}
                </span>
              </div>
              <div className="customeraddress">
                <span className="text-dark fw-bold">Customer Address - </span>{" "}
                <span>{elem?.Order?.DeliveryAddress?.addressLine1}, </span>
                <span>{elem?.Order?.DeliveryAddress?.city}, </span>
                <span>{elem?.Order?.DeliveryAddress?.state} - </span>
                <span>{elem?.Order?.DeliveryAddress?.postalCode}</span>
              </div>

              <div className="d-flex justify-content-end mt-2">
                <div>
                  <span className="mx-3">Amount Payable : </span>
                  <span>
                    {elem?.quantity} × {elem?.priceAtPurchase} ={" "}
                  </span>
                  <span
                    className="highlight"
                    style={{
                      fontSize: "25px",
                      color: "darkgreen",
                      fontWeight: "bold",
                    }}
                  >
                    ₹ {elem?.quantity * elem?.priceAtPurchase}
                  </span>
                </div>
              </div>
              <div>
              <OrderTracker status={elem?.status} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderedProduct;
