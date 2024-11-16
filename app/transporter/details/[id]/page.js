"use client"
import React, { useEffect, useState } from 'react'
import { FaRegCalendarCheck, FaFire, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import "./transporter.css"
import VehicleServices from '@/services/VehicleServices';
import { useParams } from "next/navigation";
import { useSelector } from 'react-redux';

const page = () => {
  const [singleTransportData, setSingleTransportData] = useState({})
  const user = useSelector((state) => state.auth);
  const country = useSelector((state) => state.country)
  const { id } = useParams();

  const intiApi = () => {
    VehicleServices.getHomeSingleTransVechical(id).then((response) => {
      console.log(response.data.data[0])
      const userData = response.data.data[0];
      console.log(userData)
      setSingleTransportData(userData);
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    intiApi()
  }, [id])

  return (
    <div className="container pt-4">
      <div className="row m-0 ">
        <div className="col-md-9">
          <div className="p-3 border rounded">
            <div className="d-flex justify-content-between">
              <h4>{singleTransportData?.TransportVehicle?.type || "N/A"}</h4>
              <h4>Charge Per km{" "}{singleTransportData?.chargePerKm}</h4>
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
                <p>10/10/2024</p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaLocationDot />
                <p>{user?.profile?.countryName || country?.country?.countryName}</p>
              </div>
            </div>
            <hr />
            <div className="m-0 row mt-3">
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
        </div>
        <div className="col-md-3">
          <div className="user_details">
            <div className="d-flex gap-3 align-items-center">
              <img
                src="https://www.farmersmarket.ie/assets/images/layout/user.jpg?mode=pad&anchor=center&width=180&height=180&upscale=false&bgcolor=fff"
                className="user_avtar"
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

      <div style={{ height: "10vh" }}></div>
    </div>
  )
}

export default page