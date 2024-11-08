"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "../../vender/[...slug]/vender.css";
import { IoIosCall } from "react-icons/io";
import vendorMasterServices from "@/services/vendorMasterServices";
import { useSelector } from "react-redux";
import FertilizersPesticideServices from "@/services/FertilizersPesticideServices";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
const page = () => {
  const country = useSelector((state) => state.country);
  const { slug } = useParams();
  const [FertilizersPesticidesList, setFertilizersPesticidesList] = useState(
    []
  );
  const [Loader, setLoader] = useState(false);
  const [currencySymbol, seetcurrencySymbol] = useState("₹");

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
      FertilizersPesticideServices.getAllFertilizersPesticide(data)
        .then(({ data }) => {
          setLoader(false);
          setFertilizersPesticidesList(data);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  }, [user?.profile?.country,country?.country?.countryId]);

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
              {FertilizersPesticidesList?.map((item, i) => (
                <div className="col-md-3 mt-4">
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
