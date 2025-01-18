"use client";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import VehicleMasterServices from "@/services/VehicleMasterServices";
import React, { useEffect, useState } from "react";
import "../../myAccount/customerOrder/customerOrder.css";
import OrderTracker from "@/component/smallcompo/OrderTracker";
import Pagination from "@/component/reusableComponent/Pagination";

const TransportationStatus = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [orderDetails, setOrderDetails] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // Track which accordion is open
  useEffect(() => {
    setLoading(true);
    VehicleMasterServices.CustomerOrderToTranspoter(status)
      .then(({ data }) => {
        setOrderDetails(data?.data);
        setMetaData(data?.meta);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [status]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleStatusChange = (id) => {
    setStatus(id);
  };

  return (
    <>
      <div className="d-md-flex">
        <div className="gap-4 d-flex">
          <label className="cursor">
            <input
              type="radio"
              value="All"
              checked={status === "All"}
              onChange={() => handleStatusChange("All")}
            />
            <span className="m-1">All</span>
          </label>
          <label>
            <input
              type="radio"
              value="isApproved"
              checked={status === "isApproved"}
              onChange={() => handleStatusChange("isApproved")}
            />
            <span className="m-1">Approved</span>
          </label>
          <label>
            <input
              type="radio"
              value="isPending"
              checked={status === "isPending"}
              onChange={() => handleStatusChange("isPending")}
            />
            <span className="m-1">Pending</span>
          </label>
          <label>
            <input
              type="radio"
              value="isRejected"
              checked={status === "isRejected"}
              onChange={() => handleStatusChange("isRejected")}
            />
            <span className="m-1">Rejected</span>
          </label>
        </div>
      </div>
      <div  style={{ marginTop: "-30px" }}>
        <Pagination
          page={page}
          setPage={setPage}
          List={orderDetails}
          metaData={metaData}
          searchShow={true}
        />
      </div>
      {loading && (
        <div className="centerAllDiv" style={{ height: "80vh" }}>
          <MiniLoader />
          Loading ...
        </div>
      )}
      {orderDetails?.map((ele, index) => (
        <>
          <div className="accordion-item" key={ele.id}>
            <div
              className="accordion-header d-flex justify-content-between"
              onClick={() => toggleAccordion(index)}
            >
              <h6>
                You have to deliver{" "}
                <span>
                  {ele?.orderDetail?.quantity}{" "}
                  {ele?.productDetail?.ProductUnit?.unitName}
                </span>{" "}
                of {ele?.productDetail?.productDtlName}
              </h6>
              <span>{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className="accordion-content">
                <div className="d-md-flex justify-content-between">
                  <div className="sellerAddres">
                    <h6>Pickup Address</h6>
                    <p>
                      <b>Name : </b>
                      {ele?.User?.FirstName} {ele?.User?.LatName}
                    </p>
                    <p>
                      <b>Phone : </b>
                      {ele?.User?.Phone}
                    </p>
                    <p>
                      <b>Address : </b>
                      {ele?.User?.userInfo?.Address1},{" "}
                      {ele?.User?.userInfo?.City}, {ele?.User?.userInfo?.State}{" "}
                      -{ele?.User?.userInfo?.Zip}
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
                      {ele?.DeliveryAddress?.addressLine1},{" "}
                      {ele?.DeliveryAddress?.city},{" "}
                      {ele?.DeliveryAddress?.State} -
                      {ele?.DeliveryAddress?.postalCode}
                    </p>
                  </div>
                </div>
                <div className="d-md-flex justify-content-between">
                  <div className="sellerAddres">
                    <h6>Product detail to pickup</h6>
                    <p>
                      <b>Product Name : </b>
                      {ele?.productDetail?.productDtlName}
                    </p>
                    <p className="ordersummarytext">
                      You have to deliver{" "}
                      <span>
                        {ele?.orderDetail?.quantity}{" "}
                        {ele?.productDetail?.ProductUnit?.unitName}
                      </span>{" "}
                      of {ele?.productDetail?.productDtlName}
                    </p>
                  </div>
                  <div className="sellerAddres">
                    <h6>Mode of transport</h6>
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
                </div>
                <OrderTracker status={ele?.orderDetail?.status} />
              </div>
            )}
          </div>
        </>
      ))}
    </>
  );
};

export default TransportationStatus;
