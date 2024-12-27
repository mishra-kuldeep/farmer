import React, { useEffect } from "react";
import "./ratingproduct.css";
import { MdStarRate } from "react-icons/md";
import ProductRateServices from "@/services/ProductRateServices";

const ProductRating = ({ data }) => {
  const [ratingDistribution, setRatingDistribution] = React.useState(null);
  const [ratingpercentages, setRatingpercentages] = React.useState(null);
  console.log(data)

  useEffect(() => {
    if (data?.productDtlId) {
      ProductRateServices.getRatingDistributionById(data?.productDtlId).then(({ data }) => {
        setRatingDistribution(data?.data);
      }).catch((error) => {
        console.error("Error fetching product rating distribution:", error);
        setRatingDistribution(null);
      });
    }

  }, [data]);

  useEffect(() => {
    if (ratingDistribution?.ratings) {
      const percentages = Object.entries(ratingDistribution?.ratings).reduce((result, [rating, count]) => {
        const percentage = (count / ratingDistribution?.totalRatings) * 100;
        result[rating] = percentage.toFixed(2) + "%";
        return result;
      }, {});
      setRatingpercentages(percentages)
    }
  }, [ratingDistribution?.ratings]);

  return (
    <div className="border rounded my-4 p-3">
      <div className="centerAllDiv justify-content-between">
        <h5>Ratings & Reviews</h5>
        <button className="rateprodBtn">Rate Product</button>
      </div>
{ratingDistribution && ratingpercentages && (
      <div className="d-flex gap-5 m-5">
        <div>
          <h1 className="d-flex align-items-center fw-light">
            {data?.averageRating} <MdStarRate />
          </h1>
          <h6 className="text-secondary fw-500">{ratingDistribution?.totalRatings} Ratings </h6>
        </div>
        <div>
          <div className="d-flex align-items-center">
            <div style={{ width: "50px" }}>
              5 <MdStarRate />
            </div>
            <div class="review-container" style={{ "--progress":`${ratingpercentages['5']}` }}>
              <div class="progress-bar"></div>
            </div>
            <span className="text-secondary ms-3">{ratingDistribution?.ratings['5']}</span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ width: "50px" }}>
              4 <MdStarRate />
            </div>
            <div class="review-container" style={{ "--progress": `${ratingpercentages['4']}` }}>
              <div class="progress-bar2" data-color="green"></div>
            </div>
            <span className="text-secondary ms-3">{ratingDistribution?.ratings['4']}</span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ width: "50px" }}>
              3 <MdStarRate />
            </div>
            <div class="review-container" style={{ "--progress": `${ratingpercentages['3']}` }}>
              <div class="progress-bar2" data-color="green"></div>
            </div>
            <span className="text-secondary ms-3">{ratingDistribution?.ratings['3']}</span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ width: "50px" }}>
              2 <MdStarRate />
            </div>
            <div class="review-container" style={{ "--progress": `${ratingpercentages['2']}` }}>
              <div class="progress-bar2" data-color="green"></div>
            </div>
            <span className="text-secondary ms-3">{ratingDistribution?.ratings['2']}</span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ width: "50px" }}>
              1 <MdStarRate />
            </div>
            <div class="review-container" style={{ "--progress": `${ratingpercentages['1']}` }}>
              <div class="progress-bar3" data-color="green"></div>
            </div>
            <span className="text-secondary ms-3">{ratingDistribution?.ratings['1']}</span>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default ProductRating;
