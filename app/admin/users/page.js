"use client";
import AuthService from "@/services/AuthServices";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import stylesss from "./UsersListForAdmin.module.css"; // Import the CSS module
import { Image_URL } from "@/helper/common";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import IconButton from "@/component/reusableComponent/IconButton";
import ConfirmModel from "@/component/reusableComponent/ConfirmModel";
import toast from "react-hot-toast";
import Pagination from "@/component/reusableComponent/Pagination";

const UsersListForAdmin = () => {
  const [role, setRole] = useState("All");
  const [userList, setUserList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // To track the open accordion
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [loader, setLoader] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [remark, setRemark] = useState("");
  const [Errors, setErrors] = useState({});
 const [countryies, setCountry] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("All");
  const [metaData, setmetaData] = useState([]);
  useEffect(() => {
    AuthService.AllUserProfileAdmin(role, {
      page: page,
      search: searchText,
      status: status,
    })
      .then(({ data }) => {
        setUserList(data?.data);
        setmetaData(data?.meta);
      })
      .catch((err) => console.log(err));
  }, [role, page, searchText, status]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setSelectedUser("");
    setInputOpen(false);
  };
  useEffect(() => {
    AuthService.getCountryList()
      .then(({ data }) => {
        setCountry(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleReject = async () => {
    setLoader(true);
    AuthService.RejectedUser(selectedUser, { remark })
      .then((data) => {
        const userls = userList.filter((val) => val?.UserId !== selectedUser);
        setUserList(userls);
        setOpen2(false);
        setLoader(false);
        setErrors({});
        setInputOpen(false);
        setRemark("");
        toast("User rejected successfully!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        const errorData = err?.response?.data?.errors || [];
        const errorObj = errorData.reduce((acc, curr) => {
          acc[curr.path] = curr.msg;
          return acc;
        }, {});
        setErrors(errorObj);
        setLoader(false);
        setOpen2(false);
      });
  };
  const handleApprove = async () => {
    setLoader(true);
    await AuthService.ApproveUser(selectedUser);
    const userls = userList.filter((val) => val?.UserId !== selectedUser);
    setUserList(userls);
    setOpen(false);
    setLoader(false);
    toast("User approved successfully!", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "green",
        color: "#fff",
      },
    });
  };

  const handleCancel = () => {
    setOpen(false);
    setOpen2(false);
  };
  const handleStatusChange = (id) => {
    setStatus(id);
    setPage(1);
  };
  console.log(metaData)
  return (
    <>
      <div className="row  align-items-center shadow px-2 mb-3">
        <div className="col-md-2 mb-3">
          <label className="adjustLabel">Select Role *</label>
          <select
            className="form-select custom-select adjustLabel_input"
            aria-label="Default select example"
            name="subCategory"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="All">All</option>
            <option value={2}>Farmers</option>
            <option value={3}>Buyers</option>
            <option value={4}>Transportation</option>
            <option value={5}>Employee</option>
            <option value={6}>Vendors</option>
            <option value={7}>Educational Resources</option>
            <option value={8}>Customer Care</option>
            <option value={9}>Fertilizers & Pesticides </option>
          </select>
        </div>

        <div className="col-md-10 mb-3">
          <div className="gap-4 d-flex m-2">
            <label className="cursor">
              <input
                type="radio"
                value="All"
                checked={status == "All"}
                onChange={() => handleStatusChange("All")}
              />
              <span className="m-1">All</span>
            </label>
            <label>
              <input
                type="radio"
                value="isApproved"
                checked={status == "isApproved"}
                onChange={() => handleStatusChange("isApproved")}
              />
              <span className="m-1">Approved</span>
            </label>

            <label>
              <input
                type="radio"
                value="isPending"
                checked={status == "isPending"}
                onChange={() => handleStatusChange("isPending")}
              />
              <span className="m-1">Pending</span>
            </label>
            <label>
              <input
                type="radio"
                value="isRejected"
                checked={status == "isRejected"}
                onChange={() => handleStatusChange("isRejected")}
              />
              <span className="m-1">Rejected</span>
            </label>
          </div>
        </div>

        <div className="col-md-12 mb-3" style={{marginTop:"-60px"}}>
          <Pagination
            page={page}
            setPage={setPage}
            searchText={searchText}
            setSearchText={setSearchText}
            metaData={metaData}
            searchShow={true}
          />
        </div>
        <div className="col-md-12">
          <div className={stylesss.accordion}>
            {userList?.map((ele, i) => (
              <div
                className={stylesss["accordion-item"]}
                key={i}
                style={{ display: ele.Role == 1 && "none" }}
              >
                <h2
                  className={stylesss["accordion-header"]}
                  onClick={() => toggleAccordion(i)}
                >
                  <button type="button">
                    <span>
                    {10 * (page - 1) + (i + 1)}. {ele.FirstName} {ele.LastName}
                    </span>
                    <IoIosArrowDown
                      className={`${stylesss["accordion-button-icon"]} ${
                        openIndex === i ? stylesss.active : ""
                      }`}
                    />
                  </button>
                </h2>
                <div
                  className={`${stylesss["accordion-collapse"]} ${
                    openIndex === i ? stylesss.show : ""
                  }`}
                >
                  <div className={stylesss["accordion-body"]}>
                    <div className="d-flex gap-3">
                      <div>
                        <div
                          style={{
                            height: "200px",
                            width: "170px",
                            backgroundColor: "#ddd",
                            padding: "5px",
                          }}
                        >
                          {ele?.userInfo?.Profile ? (
                            <img
                              src={`${Image_URL}/Profiles/${ele?.userInfo?.Profile}`}
                              alt="image"
                              width="100%"
                              height="100%"
                            />
                          ) : (
                            <img
                              src={`https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`}
                              alt="image"
                              width="100%"
                              height="100%"
                            />
                          )}
                        </div>
                        {(!ele?.IsVerified  &&  !ele?.IsRejected) &&
                        <div className="d-flex justify-content-center gap-5 mt-3">
                          <IconButton
                            tooltip="Approve"
                            onClick={() => {
                              setOpen(true);
                              setSelectedUser(ele?.UserId);
                            }}
                          >
                            <BsCheckLg color="green" fontSize={50} />
                          </IconButton>
                          <IconButton
                            tooltip="Reject"
                            onClick={() => setInputOpen(!inputOpen)}
                          >
                            <RxCross2 color="red" fontSize={50} />
                          </IconButton>
                        </div>}
                      </div>

                      <div className="w-100">
                        <table className="table  p-0">
                          <tbody>
                            <tr>
                              <td className="text-secondary p-0 m-0">Email</td>
                              <td className="text-secondary p-0 m-0">
                                : {ele?.Email}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-secondary p-0 m-0">Phone</td>
                              <td className="text-secondary p-0 m-0">
                                : {ele?.Phone}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-secondary p-0 m-0">
                                CountryID
                              </td>
                              <td className="text-secondary p-0 m-0">
                                : {countryies.length>0 && (countryies.find((val)=>val.countryId ==ele?.CountryID).countryName) }
                              </td>
                            </tr>
                            <tr>
                              <td className="text-secondary p-0 m-0">Dob</td>
                              <td className="text-secondary p-0 m-0">
                                : {ele?.userInfo?.Dob}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-secondary p-0 m-0">Gender</td>
                              <td className="text-secondary p-0 m-0">
                                : {ele?.userInfo?.Gender}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-secondary p-0 m-0">
                                Address1
                              </td>
                              <td className="text-secondary p-0 m-0">
                                : {ele?.userInfo?.Address1}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-secondary p-0 m-0">
                                Address2
                              </td>
                              <td className="text-secondary p-0 m-0">
                                : {ele?.userInfo?.Address2}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-secondary p-0 m-0">City</td>
                              <td className="text-secondary p-0 m-0">
                                : {ele?.userInfo?.City}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-secondary p-0 m-0">State</td>
                              <td className="text-secondary p-0 m-0">
                                : {ele?.userInfo?.State}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-secondary p-0 m-0">Zip</td>
                              <td className="text-secondary p-0 m-0">
                                : {ele?.userInfo?.Zip}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {inputOpen && (
                          <div className="d-flex">
                            <div className="w-100 d-flex align-items-center gap-5">
                              <div className="w-100">
                                <label className="adjustLabel ms-3">
                                  Remark
                                </label>
                                <textarea
                                  className="form-control adjustLabel_input shadow-none p-2 ms-2"
                                  id="exampleFormControlTextarea1"
                                  rows="3"
                                  name="Address1"
                                  value={remark}
                                  onChange={(e) => {
                                    setRemark(e.target.value);
                                    setErrors({});
                                  }}
                                ></textarea>
                                {Errors.remark && (
                                  <span className="error_input_text ms-3">
                                    {Errors.remark}
                                  </span>
                                )}
                              </div>

                              <button
                                className="admin_btn"
                                onClick={() => {
                                  setOpen2(true);
                                  setSelectedUser(ele?.UserId);
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmModel
        show={open}
        onConfirm={handleApprove}
        onCancel={handleCancel}
        message="Are you sure to approved this user?"
        loading={loader}
      />
      <ConfirmModel
        show={open2}
        onConfirm={handleReject}
        onCancel={handleCancel}
        message="Are you sure to reject this user?"
        loading={loader}
      />
    </>
  );
};

export default UsersListForAdmin;
