import React from "react";
import "./section2Home.css";
import product1 from "../../../public/product/weat.jpg";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15];

const Section2Home = () => {
  return (
    <div className="container">
      <div className="section2Wrapper">
        <div className="section2Heading">
          <h5>Your Daily Staples</h5>
        </div>
        <div className="section2Content">
          <div className="row overflowhiddenbutscroll m-0 pb-3">
          {array.map((ele,i) => (
            <div className="col-md-2 col-5 p-md-2 p-1" key={i}>
            <div className="section2cardHome shadowcss">
                <div className="image_div">
                  <img src={product1.src} alt="product image" />
                </div>
                <div className="section2cartTitle">
                  <span className="fw-bold">Up to 25% OFF</span>
                </div>
            </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2Home;
