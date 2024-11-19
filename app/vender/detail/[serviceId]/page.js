"use client"
import React, { useEffect, useState } from 'react'
import { FaRegCalendarCheck, FaFire, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import "./vendor.css"
import vendorMasterServices from "@/services/vendorMasterServices"
import { useParams } from "next/navigation";
import MiniLoader from '@/component/reusableComponent/MiniLoader';
import { Image_URL } from '@/helper/common';
import { FcCallback } from 'react-icons/fc';
import { MdAddCall } from 'react-icons/md';

const page = () => {
  const [singleVendorData, setSingleVendorData] = useState({})
  const { serviceId } = useParams();
  const [Loader, setLoader] = useState(false);

  const intiApi = () => {
    setLoader(true)
    vendorMasterServices.getSingleServiceforuser(serviceId).then((response) => {
      setLoader(false)
      setSingleVendorData(response.data)
      console.log(response)
    }).catch((err) => {
      console.log(err)
      setLoader(false)
    })
  }


  useEffect(() => {
    intiApi()
  }, [serviceId])

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
                  <h4>Ratings:{" "}{singleVendorData?.numberOfRatings}</h4>
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
                    <p>{singleVendorData?.createdAt?.slice(0, 10)}</p>
                  </div>
                  <div className="d-flex gap-2 align-items-center my-1">
                    <FaLocationDot />
                    India
                  </div>
                </div>
                <hr />
                <div className="m-0 row mt-3">
                  <div className="col-md-6">
                    {singleVendorData.description}
                  </div>
                  <div className="col-md-6">
                    <h2 className='transporterDetailHeading py-2'>Service Detail</h2>
                    <div
                      className="rounded p-1"
                      style={{ backgroundColor: "#f1f1f1" }}
                    >

                      <table className="table">
                        <tbody>
                          <tr>
                            <td>Availability Status</td>

                            <td>{singleVendorData?.availabilityStatus || "--"}</td>
                          </tr>
                          <tr>
                            <td>Available Offers</td>
                            <td>{singleVendorData?.availableOffers || "--"}</td>

                          </tr>
                          <tr>
                            <td>Duration</td>
                            <td>{singleVendorData?.duration || "--"}</td>
                          </tr>
                          <tr>
                            <td>UpdatedAt</td>
                            <td>{singleVendorData?.updatedAt?.slice(0, 10) || "--"}</td>
                          </tr>
                          <tr>
                            <td>Cost</td>
                            <td>{singleVendorData?.cost || "--"}</td>
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
                    src={singleVendorData?.User?.userInfo?.Profile?`${Image_URL}/profiles/${singleVendorData?.User?.userInfo?.Profile} ` : "https://www.farmersmarket.ie/assets/images/layout/user.jpg?mode=pad&anchor=center&width=180&height=180&upscale=false&bgcolor=fff"}
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
                      <b>{(singleVendorData?.User?.userInfo?.City || "") +
                        " " +
                        (singleVendorData?.User?.userInfo?.State || "")}</b>
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
                      Servce Ads &ensp;&ensp; <b>{singleVendorData?.availabilityStatus ? "Yes" : "No"} </b>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="py-3">
                  <button className="query_Buttom">
                    Make An Enquiry
                  </button>

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
                  <MdAddCall size={20} color="#fff"/>{singleVendorData?.user?.phone || 'xxxx xxx xxx'}
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div style={{ height: "10vh" }}></div>
        </>
      )}

    </div>

  )
}

export default page