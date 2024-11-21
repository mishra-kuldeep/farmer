"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaRegCalendarCheck, FaFire, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import FertilizersPesticideServices from "@/services/FertilizersPesticideServices";
import { IoMdCall } from "react-icons/io";
import "./fertiliser.css";
import { useParams } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "../../../adverts/[...slug]/adverts.css";
import { isMobile } from "react-device-detect";
import { IoIosCall } from "react-icons/io";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const scrollContainerRef = useRef(null);
  const user = useSelector((state) => state.auth);
  const country = useSelector((state) => state.country);
  const [currencySymbol] = useState("₹");
  const [fertilizer, setFertilizer] = useState({});
  const [DistributorsType, setDistributorsType] = useState(null);
  const [FertilizersPesticidesList, setFertilizersPesticidesList] = useState(
    []
  );
  const [Loader, setLoader] = useState(false);
  const { id } = useParams();

  const getApi = () => {
    FertilizersPesticideServices.getSinglFertilizersPesticide(id)
      .then((item) => {
        setFertilizer(item?.data);
        console.log(item.data)
        setDistributorsType(item?.data?.DistributorsType);
      })
      .catch((error) => console.log(error));
  };


  const fertiliserApi = () => {
    const data = {
      status: "Approved",
      slug: DistributorsType,
      page: 1,
      pageSize:50,
      searchText: "",
      location:"",
      countryId: user?.profile?.country
        ? user?.profile?.country
        : country?.country?.countryId,
    };
    if (data.countryId) {
      FertilizersPesticideServices.getAllFertilizersPesticide(data)
        .then(({ data }) => {
          console.log(data)
          setFertilizersPesticidesList(data.data);
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  };
  useEffect(() => {
    if (DistributorsType) {
      fertiliserApi();
    }
  }, [
    user?.profile?.country,
    country?.country?.countryId,
    DistributorsType,
  ]);

  useEffect(() => {
    getApi();
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      if (direction === "left") {
        scrollContainerRef.current.scrollLeft -= isMobile
          ? containerWidth
          : (containerWidth * 50) / 100;
      } else if (direction === "right") {
        scrollContainerRef.current.scrollLeft += isMobile
          ? containerWidth
          : (containerWidth * 50) / 100;
      }
    }
  };

  const changeRouterPage = (id) => {
    router.push(`/fertilizers-pesticides/detail/${id}`);
  };
  return (
    <div className="container pt-4">
      <div className="row m-0 ">
        <div className="col-md-9">
          <div className="p-3 border rounded">
            <div className="d-flex justify-content-between">
              <h4>{fertilizer?.serviceName || "N/A"}</h4>
              <h4></h4>
            </div>

            <div className="imagebigDiv my-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                height="450px"
                width="100%"
                className="border rounder p-1"
              />
            </div>
            <div className="multiImageWrapper d-flex gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                height="80px"
                width="80px"
                className="border rounder p-1"
              />
            </div>

            <div className="d-flex gap-3 mt-4">
              <div className="d-flex gap-2 align-items-center my-1">
                <FaClock />
                <p>{fertilizer?.createdAt?.slice(0, 10)}</p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaLocationDot />
                India
              </div>
            </div>
            <hr />
            <div className="m-0 row mt-3">
              <div className="col-md-6">
                <p>{fertilizer?.description}</p>
              </div>
              <div className="col-md-6">
                <h2 className="transporterDetailHeading py-2">
                  Service Detail
                </h2>
                <div
                  className="rounded p-1"
                  style={{ backgroundColor: "#f1f1f1" }}
                >
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>serviceName</td>
                        <td>{fertilizer?.serviceName || "NA"}</td>
                      </tr>
                      <tr>
                        <td>Availability Status</td>

                        <td>{fertilizer?.availabilityStatus || "NA"}</td>
                      </tr>
                      <tr>
                        <td>Available Offers</td>
                        <td>{fertilizer?.availableOffers || "NA"}</td>
                      </tr>
                      <tr>
                        <td>Duration</td>
                        <td>{fertilizer?.duration || "NA"}</td>
                      </tr>
                      <tr>
                        <td>Average Rating</td>
                        <td>{fertilizer?.averageRating || "NA"}</td>
                      </tr>
                      <tr>
                        <td>UpdatedAt</td>
                        <td>{fertilizer?.updatedAt?.slice(0, 10) || "NA"}</td>
                      </tr>
                      <tr>
                        <td>Cost</td>
                        <td>{fertilizer?.cost || "NA"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="user_details">
            <div className="d-flex gap-3 align-items-center">
              <img
                src="https://www.farmersmarket.ie/assets/images/layout/user.jpg?mode=pad&anchor=center&width=180&height=180&upscale=false&bgcolor=fff"
                className="user_avtar"
              />
            </div>
            <hr />
            <div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaLocationDot />
                <p>
                  Location &ensp;&ensp;
                  <b>India</b>
                </p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaRegCalendarCheck />
                service review{" "}
                <b>{fertilizer?.adminReview == "Approved" ? "Yes" : "No"} </b>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaFire />
                <p>
                  Servce Ads &ensp;&ensp;{" "}
                  <b>{fertilizer?.adminReview == "Approved" ? "Yes" : "No"} </b>
                </p>
              </div>
            </div>
            <hr />
            <div className="py-3">
              <button className="query_Buttom">Make An Enquiry</button>
              {/* {show && ( */}
              <div>
                <textarea className="text_imput" rows={5} />
                <div className="d-flex justify-content-center">
                  <button
                    style={{
                      backgroundColor: "var(--mainColor2)",
                      border: "none",
                      outline: "none",
                      padding: "2px 10px",
                      borderRadius: "2px",
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: "12px",
                    }}
                  >
                    submit
                  </button>
                </div>
              </div>

              <button className="mt-2 query_Buttom">
                <IoMdCall /> xxxx xxx xxx
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="bestSellerWraper px-4 my-5">
        <div className="headerbestSeller ">
          <h5>Related Ads</h5>
          <div className="arrowBtn_bestSeller">
            <p
              className="Show_More_bestSeller"
              onClick={() => router.push(`/fertilizers-pesticides/${DistributorsType}`)}
            >
              Show More
            </p>
            <p
              className="next_btn_bestSeller"
              onClick={() => handleScroll("left")}
            >
              <IoIosArrowBack />
            </p>
            <p
              className="next_btn_bestSeller"
              onClick={() => handleScroll("right")}
            >
              <IoIosArrowForward />
            </p>
          </div>
        </div>
        {Loader ? (
          <div style={{ height: "80vh" }} className="centerAllDiv">
            <MiniLoader />
            <span className="mr-3">Loading...</span>
          </div>
        ) : (
          <div className="row overflowscrollhidden" ref={scrollContainerRef}>
            {FertilizersPesticidesList?.reverse().map((item, i) => {
              return (
                <div
                  key={i}
                  className="col-md-3 mt-4"
                  onClick={() => changeRouterPage(item?.serviceId)}
                >
                  <div className="fertiliserDetailcard">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                      style={{ backgroundColor: "#dadada" }}
                      width="100%"
                    />
                    <div className="p-2">
                      <h5 className="my-2">{item?.serviceName}</h5>
                      <h6 style={{ fontSize: "13px" }}>
                        cost Price - {currencySymbol} {item?.cost}
                      </h6>
                      <h6 style={{ fontSize: "13px" }}>
                        Capacity - {item?.capacity}{" "}
                        {item?.ProductUnit?.unitName}
                      </h6>
                      <h6 style={{ fontSize: "13px" }}>
                        Duration -{item?.duration}
                      </h6>
                      <p
                        style={{
                          color: "grey",
                          fontSize: "12px",
                          margin: "10px 0px 10px 0px",
                        }}
                      >
                        description
                        {item?.description}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="px-1" style={{ fontSize: "12px " }}>
                        <b>Company Name</b> <br />
                        {item?.User?.userInfo?.CompanyName}
                      </p>
                      <p className="venderservicephone">
                        <IoIosCall size={15} /> {item?.User?.Phone}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
