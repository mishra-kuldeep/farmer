
"use client";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import VehicleMasterServices from "@/services/VehicleMasterServices";
import React, { useEffect, useState } from "react";
import "./customerOrder.css";
import Pagination from "@/component/reusableComponent/Pagination";
import ConfirmModel from "@/component/reusableComponent/ConfirmModel";
import toast from "react-hot-toast";
import OrderTracker from "@/component/smallcompo/OrderTracker";
import OrderService from "@/services/Orderservices";


const Page = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [selectedId, setelectedId] = useState("");
  const [confirmLoader, setconfirmLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [orderDetails, setOrderDetails] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // Track which accordion is open
  const [orderStatus, setorderStatus] = useState(''); // Track which accordion is open

  useEffect(() => {
    setLoading(true);
    VehicleMasterServices.CustomerOrderToTranspoterList(status)
      .then(({ data }) => {
        console.log(data);
        setOrderDetails(data?.data);
        setMetaData(data?.meta);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [status]);

  const handleStatusChange = (id) => {
    setStatus(id);
  };

  const toggleAccordion = (index, status) => {
    setOpenIndex(openIndex === index ? null : index);
    setorderStatus(status)
  };

  const handleCancel = () => {
    setOpen(false);
    setOpen1(false);
  };

  if (loading) {
    return (
      <div className="centerAllDiv" style={{ height: "80vh" }}>
        <MiniLoader />
        Loading ...
      </div>
    );
  }
  const handleApprove = () => {
    setconfirmLoader(true);
    OrderService.ShippedOrder(selectedId?.orderDetailId)
      .then(({ data }) => {
        console.log(data);
        setconfirmLoader(false);
        setOpen(false)
        toast(data?.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
      })
      .catch((err) => console.log(err));
  };
  const handleRject = () => {
    setconfirmLoader(true);
    // DeliveredOrder
    OrderService.DeliveredOrder(selectedId?.orderDetailId)
      .then(({ data }) => {
        console.log(data);
        setconfirmLoader(false);
        setOpen(false)
        toast(data?.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
      })
      .catch((err) => console.log(err));
  };
  console.log(orderDetails)
  return (
    <>
      <div className="d-md-flex justify-content-between">
        <div className="gap-4 d-flex w-100">
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
        <Pagination
          page={page}
          setPage={setPage}
          List={orderDetails}
          metaData={metaData}
        />
      </div>
      {orderDetails?.map((ele, index) => (
        <div className="accordion-item" key={ele.id}>
          <div
            className="accordion-header d-flex justify-content-between"
            onClick={() => toggleAccordion(index, ele?.status)}
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
                    {ele?.User?.userInfo?.Address1}, {ele?.User?.userInfo?.City}
                    , {ele?.User?.userInfo?.State} -{ele?.User?.userInfo?.Zip}
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
                    {ele?.DeliveryAddress?.city}, {ele?.DeliveryAddress?.State}{" "}
                    -{ele?.DeliveryAddress?.postalCode}
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
              <div>
                <OrderTracker status={ele.orderDetail.status} />
              </div>
              {(ele.orderDetail.status === 'Processing' || ele.orderDetail.status === 'Shipped') && (
                <div
                  style={{ backgroundColor: "#dadada", justifyContent: "center" }}
                  className="d-flex align-items-center gap-4 p-3"
                >
                  <p>
                    Please Update Product Order Tracker status{" "}
                    <b>
                      {ele?.orderDetail?.quantity}{" "}
                      {ele?.productDetail?.ProductUnit?.unitName}
                    </b>{" "}
                    of {ele?.productDetail?.productDtlName}
                  </p>
                  {ele.orderDetail.status === 'Processing' ? (
                    <button
                      className="admin_btn"
                      onClick={() => {
                        setelectedId({
                          orderDetailId: ele?.orderDetailId,
                        });
                        setOpen(true);
                      }}
                    >
                      Shipped
                    </button>
                  ) : (
                    <button className="admin_btn"
                      onClick={() => {
                        setelectedId({
                          orderDetailId: ele?.orderDetailId,
                        });
                        setOpen1(true);
                      }}

                    >Delivered</button>
                  )}
                </div>
              )}

            </div>
          )}
        </div>
      ))}

      <ConfirmModel
        show={open}
        onConfirm={handleApprove}
        onCancel={handleCancel}
        message="Are you sure to Shipped this Order?"
        loading={confirmLoader}
      />
      <ConfirmModel
        show={open1}
        onConfirm={handleRject}
        onCancel={handleCancel}
        message="Are you sure to Delivered this Order ?"
        loading={confirmLoader}
      />
    </>
  );
};

export default Page;
