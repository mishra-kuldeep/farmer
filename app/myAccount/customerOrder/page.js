"use client";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import VehicleMasterServices from "@/services/VehicleMasterServices";
import React, { useEffect, useState } from "react";
import "./customerOrder.css";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  useEffect(() => {
    setLoading(true);
    VehicleMasterServices.CustomerOrderToTranspoterList()
      .then(({ data }) => {
        console.log(data?.rows);
        setOrderDetails(data?.rows);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // if (loading) {
  //   return (
  //     <div className="centerAllDiv" style={{ height: "80vh" }}>
  //       <MiniLoader />
  //       Loading ...
  //     </div>
  //   );
  // }

  return (
    <>
      {orderDetails?.map((ele) => {
        return (
          <div className="ordermainWrapper">
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
                {/* <p>
                <b>Email : </b>
                {ele?.User?.Email}
              </p> */}
                <p>
                  <b>Address : </b>
                  {ele?.User?.userInfo?.Address1}, {ele?.User?.userInfo?.City},{" "}
                  {ele?.User?.userInfo?.State} -{ele?.User?.userInfo?.Zip}
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
                {/* <p>
                <b>Email : </b>
                {ele?.DeliveryAddress?.Email}
              </p> */}
                <p>
                  <b>Address : </b>
                  {ele?.DeliveryAddress?.addressLine1},{" "}
                  {ele?.DeliveryAddress?.city}, {ele?.DeliveryAddress?.State} -
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
            <div style={{backgroundColor:"#dadada",justifyContent:"center"}} className="d-flex align-items-center gap-4 p-3">
              <p>Would you like to pickup  <b> {ele?.orderDetail?.quantity}{" "}
              {ele?.productDetail?.ProductUnit?.unitName}</b> {" "} of {ele?.productDetail?.productDtlName}</p>
              <button className="admin_btn">yes</button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default page;
