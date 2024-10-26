"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./vender.css";
import { IoIosCall } from "react-icons/io";
import vendorMasterServices from "@/services/vendorMasterServices";
import { useSelector } from "react-redux";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
const page = () => {
  const country = useSelector((state) => state.country);
  const { slug } = useParams();
  const [VendorList, setVendorList] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [currencySymbol, seetcurrencySymbol] = useState("₹");
  console.log(country);
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    setLoader(true);
    const data = {
      status: "Approved",
      slug: slug,
      page: "",
      searchText: "",
      countryId: user?.profile?.country
        ? user?.profile?.country
        : country?.country?.countryId,
    };
    if (data.countryId) {
      vendorMasterServices
        .getAllVendorServices(data)
        .then(({ data }) => {
          setLoader(false);
          setVendorList(data);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  }, [user?.profile?.country]);

  return (
    <>
      {Loader ? (
        <div style={{ height: "80vh" }} className="centerAllDiv">
          <MiniLoader />
          <span className="mr-3">Loading...</span>
        </div>
      ) : (
        <div>
          <div className="container">
            <div className="row">
              {VendorList?.map((item, i) => (
                <div className="col-md-3">
                  <div className="servicevendercard">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                      style={{ backgroundColor: "#dadada" }}
                      width="100%"
                    />
                    <div className="p-2">
                      <h5 className="my-2">{item?.serviceName}</h5>
                      <h6 style={{ fontSize: "13px" }}>
                        Price - {currencySymbol} {item?.cost}
                      </h6>
                      <h6 style={{ fontSize: "13px" }}>
                        Capacity - {item?.capacity}{" "}
                        {item?.ProductUnit?.unitName}
                      </h6>
                      <h6 style={{ fontSize: "13px" }}>
                        Duration - {item?.duration}
                      </h6>
                      <p
                        style={{
                          color: "grey",
                          fontSize: "12px",
                          margin: "10px 0px 10px 0px",
                        }}
                      >
                        {item?.description}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p style={{ fontSize: "12px" }}>
                        Company Name <br />
                        {item?.User?.userInfo?.CompanyName}
                      </p>
                      <p className="venderservicephone">
                        <IoIosCall size={15} /> {item?.User?.Phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;

{
  /* <div className="col-md-12" key={i}>
              <div className="card">
                <h2 className="service-name">{item.serviceName}</h2>
                <p className="description">Description: {item.description}</p>
                <details>
                  <summary className="details-summary">View Details</summary>
                  <div className="details">
                    <p className="cost">cost: {item.cost}</p>
                    <p className="available-offers">
                      Offers:{" "}
                      {item.availableOffers ? item.availableOffers : "0"}
                    </p>
                    <p className="duration">Duration: {item.duration}months</p>
                    <p className="average-rating">
                      Average Rating {item.averageRating}
                    </p>
                    </div>
                    </details>
                  </div>
                </div> */
}
