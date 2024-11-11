"use client";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarCheck, FaFire, FaClock } from "react-icons/fa";
import "./details.css";
import RentProductsServices from "@/services/RentProductServices";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.auth);
  const country = useSelector((state) => state.country)
  const [show, setshow] = useState(false);
  const [rentProduct, setRentProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id[0]) {
      RentProductsServices.getRentProductByIdHome(id[0])
        .then((data) => {
          setRentProduct(data?.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);

  const price =
    JSON.parse(rentProduct?.otherDetails || "{}")["Price"] ||
    "Price not available";
  const otherDetails = JSON.parse(rentProduct?.otherDetails || "{}");
  console.log(rentProduct);

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
  
    const years = Math.floor(secondsAgo / (3600 * 24 * 365));
    if (years >= 1) return `${years} year${years > 1 ? 's' : ''} ago`;
  
    const months = Math.floor(secondsAgo / (3600 * 24 * 30));
    if (months >= 1) return `${months} month${months > 1 ? 's' : ''} ago`;
  
    const days = Math.floor(secondsAgo / (3600 * 24));
    if (days >= 1) return `${days} day${days > 1 ? 's' : ''} ago`;
  
    const hours = Math.floor(secondsAgo / 3600);
    if (hours >= 1) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  
    const minutes = Math.floor(secondsAgo / 60);
    if (minutes >= 1) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  
    return `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`;
  }
  
  return (
    <div className="container pt-4">
      <div className="row m-0 ">
        <div className="col-md-9">
          <div className="p-3 border rounded">
            <div className="d-flex justify-content-between">
              <h4>{rentProduct?.title}</h4>
              <h4>{price}</h4>
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
                <p>{rentProduct?.createdAt && timeAgo(rentProduct?.createdAt)}</p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaLocationDot />
                <p>{user?.profile?.countryName || country?.country?.countryName}</p>
              </div>
            </div>
            <hr />
            <div className="m-0 row mt-3">
              <div className="col-md-6">
                <p>{rentProduct.description}</p>
              </div>
              <div className="col-md-6">
                <div
                  className="rounded p-1"
                  style={{ backgroundColor: "#f1f1f1" }}
                >
                  <table className="table">
                    <tbody>
                      {Object.entries(otherDetails).map(([key, value]) => (
                        <tr>
                          <td>
                            <b>{key}</b>
                          </td>
                          <td>{value}</td>
                        </tr>
                      ))}
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
              <h5>{rentProduct?.User?.FirstName}</h5>
            </div>
            <hr />
            <div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaLocationDot />
                <p>
                  Location &ensp;&ensp;
                  <b>
                    {(rentProduct?.User?.userInfo?.City || "") +
                      " " +
                      (rentProduct?.User?.userInfo?.State || "")}
                  </b>
                </p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaRegCalendarCheck />
                <p>
                  Member  &ensp;&ensp; <b>Yes</b>
                </p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaFire />
                <p>
                  Active Ads &ensp;&ensp; <b>{rentProduct?.isAvailable?"Yes":"No"}</b>
                </p>
              </div>
            </div>
            <hr />
            <div className="py-3">
              <button onClick={() => setshow(!show)} className="query_Buttom">
                Make An Enquiry
              </button>
              {show && (
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
              )}

              <button className="mt-2 query_Buttom">
                {rentProduct?.phone}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "10vh" }}></div>
    </div>
  );
};

export default page;
