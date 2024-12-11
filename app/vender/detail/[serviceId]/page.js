"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCalendarCheck, FaFire, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import "./vendor.css";
import vendorMasterServices from "@/services/vendorMasterServices";
import { useParams } from "next/navigation";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import { Image_URL } from "@/helper/common";
import { MdAddCall } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward, IoIosCall } from "react-icons/io";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [VendorList, setVendorList] = useState([]);
  const [singleVendorData, setSingleVendorData] = useState({});
  const { serviceId } = useParams();
  const [Loader, setLoader] = useState(false);
  const [RelatedState, setRelatedState] = useState(null);
  const country = useSelector((state) => state?.country);
  const user = useSelector((state) => state?.auth);
  const scrollContainerRef = useRef(null);
  const [currencySymbol, seetcurrencySymbol] = useState("₹");
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState("");
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

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const headlefulldetail = async (items) => {
    setSingleVendorData(items);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  };

  const intiApi = () => {
    setLoader(true);
    vendorMasterServices
      .getSingleServiceforuser(serviceId)
      .then((response) => {
        setLoader(false);
        setImage(response?.data?.AdsImages[0]?.url);
        setSingleVendorData(response.data);
        setRelatedState(response?.data?.VendorServicesMasterId);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const getAllVendorApi = () => {
    setLoader(true);
    const data = {
      status: "Approved",
      slug: RelatedState,
      page: 1,
      pageSize: 50,
      searchText: "",
      location: "",
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
          setVendorList([]);
        });
    }
  };

  useEffect(() => {
    getAllVendorApi();
  }, [user?.profile?.country, country?.country?.countryId, RelatedState]);

  useEffect(() => {
    intiApi();
  }, [serviceId]);

  return (
    <div className="container pt-4">
      {Loader ? (
        <div style={{ height: "80vh" }} className="centerAllDiv">
          <MiniLoader />
          <span className="mr-3">Loading...</span>
        </div>
      ) : (
        <>
          <div className="row m-0 ">
            <div className="col-md-9">
              <div className="p-3 border rounded">
                <div className="d-flex justify-content-between">
                  <h4>{singleVendorData?.serviceName || "N/A"}</h4>
                  <h4>Ratings: {singleVendorData?.numberOfRatings}</h4>
                </div>

                <div className="imagebigDiv my-3">
                  <img
                    src={
                      singleVendorData?.AdsImages?.length > 0
                        ? `${Image_URL}/adsImages/${image}`
                        : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                    }
                    height="450px"
                    width="100%"
                    className="border rounder p-1"
                  />
                </div>
                <div className="multiImageWrapper d-flex gap-4">
                  {singleVendorData?.AdsImages?.length > 0 ? (
                    singleVendorData?.AdsImages?.map((val) => (
                      <img
                        src={`${Image_URL}/adsImages/${val.url}`}
                        height="80px"
                        width="80px"
                        className="border rounder p-1"
                        onClick={() => setImage(val.url)}
                      />
                    ))
                  ) : (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                      height="80px"
                      width="80px"
                      className="border rounder p-1"
                    />
                  )}
                </div>

                <div className="d-flex gap-3 mt-4">
                  <div className="d-flex gap-2 align-items-center my-1">
                    <FaClock />
                    <p>{singleVendorData?.createdAt?.slice(0, 10)}</p>
                  </div>
                  <div className="d-flex gap-2 align-items-center my-1">
                    <FaLocationDot />
                    India
                  </div>
                </div>
                <hr />
                <div className="m-0 row mt-3">
                  <div className="col-md-6">{singleVendorData.description}</div>
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
                            <td>Availability Status</td>

                            <td>
                              {singleVendorData?.availabilityStatus || "--"}
                            </td>
                          </tr>
                          <tr>
                            <td>Available Offers</td>
                            <td>{singleVendorData?.availableOffers || "--"}</td>
                          </tr>
                          <tr>
                            <td>Duration</td>
                            {singleVendorData?.duration ? (
                              <td>{singleVendorData?.duration + "Day's"}</td>
                            ) : (
                              <td>--</td>
                            )}
                          </tr>
                          <tr>
                            <td>UpdatedAt</td>
                            <td>
                              {singleVendorData?.updatedAt?.slice(0, 10) ||
                                "--"}
                            </td>
                          </tr>
                          <tr>
                            <td>Cost</td>
                            {singleVendorData?.cost ? (
                              <td>
                                {currencySymbol}
                                {singleVendorData?.cost}
                              </td>
                            ) : (
                              <td>--</td>
                            )}
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
                    src={
                      singleVendorData?.User?.userInfo?.Profile
                        ? `${Image_URL}/profiles/${singleVendorData?.User?.userInfo?.Profile} `
                        : "https://www.farmersmarket.ie/assets/images/layout/user.jpg?mode=pad&anchor=center&width=180&height=180&upscale=false&bgcolor=fff"
                    }
                    className="user_avtar"
                  />
                  <h5>{singleVendorData?.User?.FirstName}</h5>
                </div>
                <hr />
                <div>
                  <div className="d-flex gap-2 align-items-center my-1">
                    <FaLocationDot />
                    <p>
                      Location &ensp;&ensp;
                      <b>
                        {(singleVendorData?.User?.userInfo?.City || "") +
                          " " +
                          (singleVendorData?.User?.userInfo?.State || "")}
                      </b>
                    </p>
                  </div>
                  <div className="d-flex gap-2 align-items-center my-1">
                    <FaRegCalendarCheck />
                    service verify
                    <b>Yes</b>
                  </div>
                  <div className="d-flex gap-2 align-items-center my-1">
                    <FaFire />
                    <p>
                      Servce Ads &ensp;&ensp;{" "}
                      <b>
                        {singleVendorData?.availabilityStatus ? "Yes" : "No"}{" "}
                      </b>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="py-3">
                  <button className="query_Buttom">Make An Enquiry</button>

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
                    <MdAddCall size={20} color="#fff" />
                    {singleVendorData?.user?.phone || "xxxx xxx xxx"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "10vh" }}>
            <div className="bestSellerWraper my-5 px-4">
              <div className="headerbestSeller">
                <h5>Related Ads</h5>
                <div className="arrowBtn_bestSeller">
                  <p
                    className="Show_More_bestSeller"
                    onClick={() => router.push(`/vender/${RelatedState}`)}
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
                <div
                  className="row overflowscrollhidden"
                  ref={scrollContainerRef}
                >
                  {VendorList?.data?.reverse()?.map((item, i) => {
                    return (
                      <div
                        className="col-md-3 mt-4"
                        key={i}
                        onClick={() => headlefulldetail(item)}
                      >
                        <div className="fertiliserDetailcard">
                          <img
                            src= {item?.AdsImages?.length>0?`${Image_URL}/adsImages/${item?.AdsImages[0]?.url}`:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
                            style={{ backgroundColor: "#dadada" }}
                            width="100%"
                            height="150px"
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
                              {`${item?.description.slice(0, 25)} ....`}
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
        </>
      )}
    </div>
  );
};

export default Page;
