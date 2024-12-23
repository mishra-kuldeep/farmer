import React from "react";
import "./ratingproduct.css";
import { MdStarRate } from "react-icons/md";

const ProductRating = () => {
    

  return (
    <div className="border rounded my-4 p-3">
      <div className="centerAllDiv justify-content-between">
        <h5>Ratings & Reviews</h5>
        <button className="rateprodBtn">Rate Product</button>
      </div>

      <div className="d-flex gap-5 m-5">
        <div>
          <h1 className="d-flex align-items-center fw-light">
            4.4 <MdStarRate />
          </h1>
          <h6 className="text-secondary fw-500">813 Ratings & 56 Reviews</h6>
        </div>
        <div>
          <div className="d-flex align-items-center">
            <div style={{ width: "50px" }}>
              5 <MdStarRate />
            </div>
            <div class="review-container" style={{ "--progress": "80%" }}>
              <div class="progress-bar"></div>
            </div>
            <span className="text-secondary ms-3">5416</span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ width: "50px" }}>
              4 <MdStarRate />
            </div>
            <div class="review-container" style={{ "--progress": "50%" }}>
              <div class="progress-bar2" data-color="green"></div>
            </div>
            <span className="text-secondary ms-3">401</span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ width: "50px" }}>
              3 <MdStarRate />
            </div>
            <div class="review-container" style={{ "--progress": "40%" }}>
              <div class="progress-bar2" data-color="green"></div>
            </div>
            <span className="text-secondary ms-3">234</span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ width: "50px" }}>
              2 <MdStarRate />
            </div>
            <div class="review-container" style={{ "--progress": "30%" }}>
              <div class="progress-bar2" data-color="green"></div>
            </div>
            <span className="text-secondary ms-3">106</span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ width: "50px" }}>
              1 <MdStarRate />
            </div>
            <div class="review-container" style={{ "--progress": "10%" }}>
              <div class="progress-bar3" data-color="green"></div>
            </div>
            <span className="text-secondary ms-3">52</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRating;
