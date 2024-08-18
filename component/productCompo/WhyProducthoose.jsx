import React from "react";
import "./productCombo.css";
import { GiFireBottle } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { TbTruckReturn } from "react-icons/tb";

const WhyProducthoose = () => {
  return (
    <>
      <h4 className="text-center my-3">Why choose Farmers Market?</h4>
      <div style={{ width: "100%", overflow: "auto" }}>
        <div className="productWhyChoosWrap ">
          <div className="productChose">
            <GiFireBottle size={40} />
            <h5 className="mt-4">Quality</h5>
            <p>You can Trust</p>
          </div>
          <div className="productChose">
            <MdTimer size={40} /> <h5 className="mt-4">On Time</h5>
            <p>Guarantee</p>
          </div>
          <div className="productChose">
            <TbTruckDelivery size={40} /> <h5 className="mt-4">Free</h5>
            <p>Delivery</p>
          </div>
          <div className="productChose">
            <TbTruckReturn size={40} /> <h5 className="mt-4">Return Policy</h5>
            <p>No aked Question</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyProducthoose;
