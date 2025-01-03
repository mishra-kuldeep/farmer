"use client";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarCheck, FaFire, FaClock } from "react-icons/fa";
import "./details.css";
import RentProductsServices from "@/services/RentProductServices";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { FcCallback } from "react-icons/fc";
import { MdAddCall } from "react-icons/md";
import { Image_URL } from "@/helper/common";

const Page = () => {
  const user = useSelector((state) => state.auth);
  const country = useSelector((state) => state.country)
  const [show, setshow] = useState(false);
  const [rentProduct, setRentProduct] = useState({});
  const [mouseImage, setMouseImage] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      RentProductsServices.getRentProductByIdHome(id)
        .then((data) => {
          setRentProduct(data?.data);
          setImage(data?.data?.AdsImages[0]?.url);
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
    <div className="container pt-md-4 pt-1">
      <div className="row">
        <div className="col-md-9 p-1">
          <div className="p-md-3 border rounded">
            <div className="d-flex justify-content-between px-2 pt-2">
              <h4 className="mobilehome_title">{rentProduct?.title}</h4>
              <h4 className="mobilehome_title">{price}</h4>
            </div>
            <div className="imagebigDiv mb-md-3 p-1">
              <img
                src={
                  rentProduct?.AdsImages?.length > 0
                    ? `${Image_URL}/adsImages/${mouseImage||image}`
                    : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                }
                className="border rounder p-1"
                alt="image"
              />
            </div>
            <div className="multiImageWrapper d-flex gap-4 px-1">
              {rentProduct?.AdsImages?.length > 0 ? (
                rentProduct?.AdsImages?.map((val,i) => (
                  <img
                  key={i}
                    src={`${Image_URL}/adsImages/${val.url}`}
                    height="80px"
                    width="80px"
                    className="border rounder p-1"
                    onClick={() => setImage(val.url)}
                    onMouseEnter={() => setMouseImage(val.url)}
                    onMouseLeave={() => setMouseImage('')}
                    alt="image"
                  />
                ))
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                  height="80px"
                  width="80px"
                  className="border rounder p-1"
                  alt="image"
                />
              )}
            </div>

            <div className="d-flex gap-3 mt-md-4 px-2">
              <div className="d-flex gap-2 align-items-center my-1">
                <FaClock />
                <p>{rentProduct?.createdAt && timeAgo(rentProduct?.createdAt)}</p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaLocationDot />
                <p>{user?.profile?.countryName || country?.country?.countryName}</p>
              </div>
            </div>
            <hr className="mt-0"/>
            <div className="m-0 row mt-2">
              <div className="col-md-6">
                <p>{rentProduct.description}</p>
              </div>
              <div className="col-md-6 p-0">
                <div
                  className="rounded p-1"
                  style={{ backgroundColor: "#f1f1f1" }}
                >
                  <table className="table">
                    <tbody>
                      {Object.entries(otherDetails).map(([key, value]) => (
                        <tr key={key}>
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
        <div className="col-md-3 p-md-2 p-1">
          <div className="user_details">
            <div className="d-flex gap-3 align-items-center">
              <img
                src="https://www.farmersmarket.ie/assets/images/layout/user.jpg?mode=pad&anchor=center&width=180&height=180&upscale=false&bgcolor=fff"
                className="user_avtar"
                alt="avtar"
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
                  Active Ads &ensp;&ensp; <b>{rentProduct?.isAvailable ? "Yes" : "No"}</b>
                </p>
              </div>
            </div>
            <hr />
            <div className="py-md-3">
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
                <MdAddCall size={20} color="#fff" />{rentProduct?.phone}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
