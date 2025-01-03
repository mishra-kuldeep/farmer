"use client"
import React, { useEffect, useRef, useState } from 'react'
import { FaRegCalendarCheck, FaFire, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import "./transporterdetails.css"
import VehicleServices from '@/services/VehicleServices';
import { useParams } from "next/navigation";
import { useSelector } from 'react-redux';
import { IoIosArrowBack, IoIosArrowForward, IoIosCall } from 'react-icons/io';
import MiniLoader from '@/component/reusableComponent/MiniLoader';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/navigation';
import { Image_URL } from '@/helper/common';


const Page = () => {
  const router = useRouter()
  const [singleTransportData, setSingleTransportData] = useState({})
  const user = useSelector((state) => state.auth);
  const country = useSelector((state) => state.country)
  const [vehicleId, setvehicleId] = useState()
  const scrollContainerRef = useRef(null);
  const { id } = useParams();
  const [Loader, setLoader] = useState(false);
  const [LoaderFirstSection, setLoaderFirstSection] = useState(false);
  const [transport, setTransportList] = useState([]);
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
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }; window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


  const headleSetobje = async (obj) => {
    setSingleTransportData(obj)
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  }
  const intiApi = () => {
    setLoaderFirstSection(true)
    VehicleServices.getHomeSingleTransVechical(id).then((response) => {
      const userData = response.data.data[0];
      setvehicleId(userData?.vehicleId)
      setSingleTransportData(userData);
      setLoaderFirstSection(false)
      setImage(userData?.AdsImages[0]?.url);
    }).catch((err) => {
      console.log(err)
      setLoaderFirstSection(false)
    })
  }

  const getTransporterDetailApi = () => {
    if (vehicleId && (user?.profile?.country || country?.country?.countryId)) {
      setLoader(true);
      const data = {
        country: user?.profile?.country || country?.country?.countryId,
        search: "",
        zip: "",
        page: 1,
        pageSize: 100,
      };
      VehicleServices.getAllTransportByVehicalId(vehicleId, data)
        .then(({ data }) => {
          setTransportList(data?.data);
          // setmetaData(data.meta);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setTransportList([]);
          setLoader(false);
        });
    }
  }

  useEffect(() => {
    getTransporterDetailApi()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleId])

  useEffect(() => {
    intiApi()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className="container pt-md-4 pt-1">
      <div className="row">
        {LoaderFirstSection ?
          (
            <div style={{ height: "80vh" }} className="centerAllDiv">
              <MiniLoader />
              <span className="mr-3">Loading...</span>
            </div>
          )
          : (
            <div className="col-md-9 p-md-2 p-1">
              {/************
           ************
           ************
           ************
          product infoF
           ************
           ************
           ************
           ************
            */}
              <div className="p-md-3 p-1 border rounded">
                <div className="d-flex justify-content-between">
                  <h4 className='mobilehome_title'>{singleTransportData?.TransportVehicle?.type || "N/A"}</h4>
                  <h4 className='mobilehome_title'>Charge Per km{" "}{singleTransportData?.chargePerKm}</h4>
                </div>

                <div className="imagebigDiv my-md-3 my-1">
                  <img
                    src={
                      singleTransportData?.AdsImages?.length > 0
                        ? `${Image_URL}/adsImages/${image}`
                        : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                    }
          alt='images'
                    className="border rounder p-1"
                  />
                </div>
                <div className="multiImageWrapper d-flex gap-4">
                  {singleTransportData?.AdsImages?.length > 0 ? (
                    singleTransportData?.AdsImages?.map((val,i) => (
                      <img
                      key={i}
                        src={`${Image_URL}/adsImages/${val.url}`}
                        height="80px"
                        width="80px"
                        className="border rounder p-1"
                        onClick={() => setImage(val.url)}
                        alt='images'
                      />
                    ))
                  ) : (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                      height="80px"
                      width="80px"
                      className="border rounder p-1"
                      alt='images'
                    />
                  )}
                </div>

                <div className="d-flex gap-3 mt-4">
                  <div className="d-flex gap-2 align-items-center my-1">
                    <FaClock />
                    <p>10/10/2024</p>
                  </div>
                  <div className="d-flex gap-2 align-items-center my-1">
                    <FaLocationDot />
                    <p>{user?.profile?.countryName || country?.country?.countryName}</p>
                  </div>
                </div>
                <hr />
                <div className="row mt-md-3 mt-1">
                  <div className="col-md-6">
                    <h2 className='transporterHeadFont'><span className='transporterDetailHeading'>Vechical</span> {singleTransportData?.TransportVehicle?.type || "N/A"}</h2>
                    <h2 className='transporterHeadFont'><span className='transporterDetailHeading'>Capacity</span>  {singleTransportData?.TransportVehicle?.capacity || "N/A"}</h2>
                  </div>
                  <div className="col-md-6">
                    <h2 className='transporterDetailHeading py-2'>Tranporter Detail</h2>
                    <div
                      className="rounded p-1"
                      style={{ backgroundColor: "#f1f1f1" }}
                    >

                      <table className="table">
                        <tbody>
                          <tr>
                            <td>Driver Name
                            </td>
                            <td>
                              {singleTransportData?.driverName}
                            </td>
                          </tr>
                          <tr>
                            <td>Driver Contact</td>

                            <td>{singleTransportData?.driverContact}</td>
                          </tr>
                          <tr>
                            <td>Vechical Number</td>
                            <td>{singleTransportData?.vehicleNumber}</td>

                          </tr>
                          <tr>
                            <td>Charge Per km</td>
                            <td>{singleTransportData?.chargePerKm}</td>

                          </tr>
                          <tr>
                            <td>Vechical Availability</td>
                            <td>{singleTransportData?.vehicleAvailabilityStatus}</td>
                          </tr>
                          <tr>
                            <td>Admin Review</td>
                            <td>{singleTransportData?.adminReview}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}

        {/***************
       * ****************
       * ****************
       * ****************
       * **  User info***
       * ** *************
       * ****************
       * ************** */}
        <div className="col-md-3">
          <div className="user_details">
            <div className="d-flex gap-3 align-items-center">
              <img
                src="https://www.farmersmarket.ie/assets/images/layout/user.jpg?mode=pad&anchor=center&width=180&height=180&upscale=false&bgcolor=fff"
                className="user_avtar"
                alt='images'
              />
              <h5>{singleTransportData?.User?.FirstName} {singleTransportData?.User?.LastName}</h5>
            </div>
            <hr />
            <div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaLocationDot />
                <p>
                  Location &ensp;&ensp;
                  <b>
                    {singleTransportData?.User?.userInfo?.City || "N/A"}{" "}
                    {singleTransportData?.User?.userInfo?.State || "N/A"}
                  </b>
                </p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaRegCalendarCheck />
                <p>
                  Member  &ensp;&ensp; <b>{singleTransportData?.adminReview ? "Yes" : "No"}</b>
                </p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaFire />
                <p>
                  Active Ads &ensp;&ensp; <b>{singleTransportData?.vehicleAvailabilityStatus ? "Yes" : "No"} </b>
                </p>
              </div>
            </div>
            <hr />
            <div className="py-3">
              <button className="query_Buttom">
                Make An Enquiry
              </button>
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
                {singleTransportData?.User?.Phone}
              </button>
            </div>
          </div>

        </div>
      </div>
      {/*************
 * ******************
 * *** Related Ads **
 * ******************
 * ******************
 * ********/}
      <div style={{backgroundColor:"#ddd"}} className="p-md-3 p-2">
        <div className='bestSellerWraper'>
          <div className="headerbestSeller">
            <h5>Related Ads</h5>
            <div className="arrowBtn_bestSeller">
              <p className="Show_More_bestSeller" onClick={() => router.push(`/transporter/${vehicleId}`)} >Show More</p>
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
          {Loader ?
            (
              <div style={{ height: "80vh" }} className="centerAllDiv">
                <MiniLoader />
                <span className="mr-3">Loading...</span>
              </div>
            )
            : (
              <div className="row overflowscrollhidden" ref={scrollContainerRef}>
                {transport?.reverse().map((item, i) => {
                  return (
                    <div key={i} className="col-md-3 mt-4 cursor" onClick={() => headleSetobje(item)}>
                      <div className="fertiliserDetailcard">
                        <img
                          src={item?.AdsImages?.length > 0 ? `${Image_URL}/adsImages/${item?.AdsImages[0]?.url}` : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
                          style={{ backgroundColor: "#dadada" }}
                          width="100%"
                          height="150px"
                          alt='image'
                        />
                        <div className="p-2">
                          <h5 className="my-2">{item?.TransportVehicle?.type}</h5>
                          <h6 style={{ fontSize: "13px" }}>
                            Name - {item?.User.FirstName}
                          </h6>
                          {/* <p
                            style={{
                              color: "grey",
                              fontSize: "12px",
                              margin: "10px 0px 10px 0px",
                            }}
                          >
                            description
                            {`${item?.description.slice(0, 25)} ....`}
                          </p> */}
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className='px-1' style={{ fontSize: "12px " }}>
                            <b>Company Name</b> <br />
                            {item?.User?.userInfo?.CompanyName}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className='px-1' style={{ fontSize: "12px" }}>
                            <b >
                              Pincode
                            </b>{" "}
                            <br />
                            {item?.User?.userInfo?.Zip}
                          </p>
                          <p className="venderservicephone">
                            <IoIosCall size={15} />
                            {item?.User?.Phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Page