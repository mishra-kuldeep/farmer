"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./vender.css";
import vendorMasterServices from "@/services/vendorMasterServices";
const page = () => {
    const { slug } = useParams();
  const [VendorList, setVendorList] = useState([]);
  const [Loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    vendorMasterServices
      .getAllVendorServices("Approved",slug)
      .then(({ data }) => {
        console.log(data);
        setLoader(false);
        setVendorList(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          {VendorList?.map((item, i) => (
            <div className="col-md-12" key={i}>
              <div className="card">
                <h2 className="service-name">{item.serviceName}</h2>
                <p className="description">Description: {item.description}</p>
                <details>
                  <summary className="details-summary">View Details</summary>
                  <div className="details">
                    <p className="cost">cost: {item.cost}</p>
                    <p className="available-offers">Offers: {item.availableOffers?item.availableOffers:"0"}</p>
                    <p className="duration">Duration: {item.duration}months</p>
                    <p className="average-rating">Average Rating {item.averageRating}</p>
                    {/* <p className="number-of-ratings">numberOfRatings{item.numberOfRatings}</p> */}
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
