"use client";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarCheck, FaFire, FaClock } from "react-icons/fa";

const page = () => {
  const [show, setshow] = useState(false);
  return (
    <div className="container pt-4">
      <div className="row m-0 ">
        <div className="col-md-9">
          <div className="p-3 border rounded">
            <div className="d-flex justify-content-between">
              <h4>Tuffmac Cattlebox.</h4>
              <h4>Price on request</h4>
            </div>

            <div className="imagebigDiv my-3">
              <img
                src="https://www.farmersmarket.ie/media/_images/56390198-b51d-44ce-ba23-8b0ed6558717/2024-11-05_16-46-31.jpg"
                height="450px"
                width="100%"
                className="border rounder p-1"
              />
            </div>
            <div className="multiImageWrapper d-flex gap-4">
              <img
                src="https://www.farmersmarket.ie/media/_images/56390198-b51d-44ce-ba23-8b0ed6558717/2024-11-05_16-46-31.jpg"
                height="80px"
                width="80px"
                className="border rounder p-1"
              />
              <img
                src="https://www.farmersmarket.ie/media/_images/56390198-b51d-44ce-ba23-8b0ed6558717/2024-11-05_16-46-31.jpg"
                height="80px"
                width="80px"
                className="border rounder p-1"
              />
              <img
                src="https://www.farmersmarket.ie/media/_images/56390198-b51d-44ce-ba23-8b0ed6558717/2024-11-05_16-46-31.jpg"
                height="80px"
                width="80px"
                className="border rounder p-1"
              />
              <img
                src="https://www.farmersmarket.ie/media/_images/56390198-b51d-44ce-ba23-8b0ed6558717/2024-11-05_16-46-31.jpg"
                height="80px"
                width="80px"
                className="border rounder p-1"
              />
            </div>

            <div className="d-flex gap-3 mt-4">
              <div className="d-flex gap-2 align-items-center my-1">
                <FaClock />
                <p>2 days ago</p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaLocationDot />
                <p>India</p>
              </div>
            </div>
            <hr />
            <div className="m-0 row mt-3">
              <div className="col-md-6">
                <p>
                  Tri Axel 14’ x 6’ with slurry tank, dividing gate and front
                  flap. Did only two seasons work. Price €5500. Less than half
                  new price.
                </p>
              </div>
              <div className="col-md-6">
                <div
                  className="rounded p-1"
                  style={{ backgroundColor: "#f1f1f1" }}
                >
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><b>Make</b></td>
                                <td>Other</td>
                            </tr>
                            <tr>
                                <td><b>Private seller or dealer?</b></td>
                                <td>Private seller</td>
                            </tr>
                            <tr>
                                <td><b>Price</b></td>
                                <td>Price on request</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="border rounded p-3"
            style={{ position: "sticky", top: "80px" }}
          >
            <div className="d-flex gap-3 align-items-center">
              <img
                src="https://www.farmersmarket.ie/assets/images/layout/user.jpg?mode=pad&anchor=center&width=180&height=180&upscale=false&bgcolor=fff"
                height="100px"
                width="100px"
                style={{ borderRadius: "50px" }}
                className="border rounded-50 p-2"
              />
              <h5>MARIE O GORMAN</h5>
            </div>
            <hr />
            <div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaLocationDot />
                <p>Location</p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaRegCalendarCheck />
                <p>
                  Member Since &ensp;&ensp; <b>05-11-2024</b>
                </p>
              </div>
              <div className="d-flex gap-2 align-items-center my-1">
                <FaFire />
                <p>
                  Active Ads &ensp;&ensp; <b>yes</b>
                </p>
              </div>
            </div>
            <hr />
            <div className="py-3">
              <button
                onClick={() => setshow(!show)}
                style={{
                  backgroundColor: "var(--mainColor)",
                  border: "none",
                  outline: "none",
                  padding: "5px 20px",
                  borderRadius: "5px",
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                Make An Enquiry
              </button>
              {show && (
                <div>
                  <textarea
                    rows={5}
                    style={{
                      outline: "none",
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                      marginTop: "5px",
                    }}
                  />
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

              <button
                style={{
                  backgroundColor: "var(--mainColor)",
                  border: "none",
                  outline: "none",
                  padding: "5px 20px",
                  borderRadius: "5px",
                  color: "#fff",
                  fontWeight: "700",
                  marginTop: "10px",
                }}
              >
                +91 9685741256
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "10vh"}}></div>
    </div>
  );
};

export default page;
