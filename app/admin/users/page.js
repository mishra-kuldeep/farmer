"use client";
import RoleServices from "@/services/RoleServices";
import React, { useEffect, useState, useCallback } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./UsersListForAdmin.module.css";
import { Image_URL } from "@/helper/common";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import IconButton from "@/component/reusableComponent/IconButton";
import ConfirmModal from "@/component/reusableComponent/ConfirmModel";
import toast from "react-hot-toast";
import Pagination from "@/component/reusableComponent/Pagination";
import AuthService from "@/services/AuthServices";

const UsersListForAdmin = () => {
  const [role, setRole] = useState("All");
  const [userList, setUserList] = useState([]);
  const [rolesList, setRolesList] = useState([]); 
  const [openIndex, setOpenIndex] = useState(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRemarkInputOpen, setIsRemarkInputOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("All");
  const [metaData, setMetaData] = useState({});

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await AuthService.AllUserProfileAdmin(role, {
        page,
        search: searchText,
        status,
      });
      setUserList(data?.data);
      setMetaData(data?.meta);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  }, [role, page, searchText, status]);

  const fetchCountries = useCallback(async () => {
    try {
      const { data } = await AuthService.getCountryList();
      setCountries(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch countries");
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      const { data } = await RoleServices.getRoleListActive();
      setRolesList(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch roles");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchCountries();
    fetchRoles(); 
  }, [fetchCountries, fetchRoles]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setSelectedUser("");
    setIsRemarkInputOpen(false);
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await AuthService.RejectedUser(selectedUser, { remark });
      setUserList((prev) => prev.filter((val) => val?.UserCode !== selectedUser));
      setIsRejectModalOpen(false);
      setErrors({});
      setIsRemarkInputOpen(false);
      setRemark("");
      toast.success("User rejected successfully!");
    } catch (err) {
      const errorData = err?.response?.data?.errors || [];
      const errorObj = errorData.reduce((acc, curr) => {
        acc[curr.path] = curr.msg;
        return acc;
      }, {});
      setErrors(errorObj);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await AuthService.ApproveUser(selectedUser);
      setUserList((prev) => prev.filter((val) => val?.UserCode !== selectedUser));
      setIsApproveModalOpen(false);
      toast.success("User approved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsApproveModalOpen(false);
    setIsRejectModalOpen(false);
  };

  const handleStatusChange = (id) => {
    setStatus(id);
    setPage(1);
  };

  return (
    <>
      <div className="row align-items-center shadow px-2 mb-3">
        <div className="col-md-2 mb-3"  style={{zIndex:10}}>
          <label className="adjustLabel">Select Role *</label>
          <select
            className="form-select custom-select adjustLabel_input"
            aria-label="Default select example"
           
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="All">All</option>
            {rolesList?.map((r) => (
              <option key={r.roleCode} value={r.roleCode}>
                {r.RoleName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-10 mb-3" style={{zIndex:10}}>
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
            <label className="cursor">
              <input
                type="radio"
                value="isApproved"
                checked={status == "isApproved"} 
                onChange={() => handleStatusChange("isApproved")}
              />
              <span className="m-1">Approved</span>
            </label>
            <label className="cursor">
              <input
                type="radio"
                value="isPending"
                checked={status == "isPending"}
                onChange={() => handleStatusChange("isPending")}
              />
              <span className="m-1">Pending</span>
            </label>
            <label className="cursor">
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

        <div className="col-md-12 mb-3" style={{ marginTop: "-60px" }}>
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
          <div className={styles.accordion}>
            {userList?.map((ele, i) => (
              <div
                className={styles["accordion-item"]}
                key={i}
                style={{ display: ele.Role === 'RL0001' ? "none" : "block" }}
              >
                <h2
                  className={styles["accordion-header"]}
                  onClick={() => toggleAccordion(i)}
                >
                  <button type="button">
                    <span>
                      {10 * (page - 1) + (i + 1)}. {ele.FirstName} {ele.LastName}
                    </span>
                    <IoIosArrowDown
                      className={`${styles["accordion-button-icon"]} ${openIndex === i ? styles.active : ""
                        }`}
                    />
                  </button>
                </h2>
                <div
                  className={`${styles["accordion-collapse"]} ${openIndex === i ? styles.show : ""
                    }`}
                >
                  <div className={styles["accordion-body"]}>
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
                              alt="profile"
                              width="100%"
                              height="100%"
                            />
                          ) : (
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                              alt="default"
                              width="100%"
                              height="100%"
                            />
                          )}
                        </div>
                        {!ele?.IsVerified && !ele?.IsRejected && (
                          <div className="d-flex justify-content-center gap-5 mt-3">
                            <IconButton
                              tooltip="Approve"
                              onClick={() => {
                                setIsApproveModalOpen(true);
                                setSelectedUser(ele?.UserCode);
                              }}
                            >
                              <BsCheckLg color="green" fontSize={50} />
                            </IconButton>
                            <IconButton
                              tooltip="Reject"
                              onClick={() => setIsRemarkInputOpen(!isRemarkInputOpen)}
                            >
                              <RxCross2 color="red" fontSize={50} />
                            </IconButton>
                          </div>
                        )}
                      </div>

                      <div className="w-100">
                        <table className="table p-0">
                          <tbody>
                            {[
                              { label: "Email", value: ele?.Email },
                              { label: "Phone", value: ele?.Phone },
                              {
                                label: "Country",
                                value: countries.find((c) => c.countryCode === ele?.CountryID)?.countryName,
                              },
                              { label: "Dob", value: ele?.userInfo?.Dob },
                              { label: "Gender", value: ele?.userInfo?.Gender },
                              { label: "Address1", value: ele?.userInfo?.Address1 },
                              { label: "Address2", value: ele?.userInfo?.Address2 },
                              { label: "City", value: ele?.userInfo?.City },
                              { label: "State", value: ele?.userInfo?.State },
                              { label: "Zip", value: ele?.userInfo?.Zip },
                            ].map((item, idx) => (
                              <tr key={idx}>
                                <td className="text-secondary p-0 m-0">{item.label}</td>
                                <td className="text-secondary p-0 m-0">: {item.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {isRemarkInputOpen && (
                          <div className="d-flex">
                            <div className="w-100 d-flex align-items-center gap-5">
                              <div className="w-100">
                                <label className="adjustLabel ms-3">Remark</label>
                                <textarea
                                  className="form-control adjustLabel_input shadow-none p-2 ms-2"
                                  rows="3"
                                  value={remark}
                                  onChange={(e) => {
                                    setRemark(e.target.value);
                                    setErrors({});
                                  }}
                                ></textarea>
                                {errors.remark && (
                                  <span className="error_input_text ms-3">
                                    {errors.remark}
                                  </span>
                                )}
                              </div>
                              <button
                                className="admin_btn"
                                onClick={() => {
                                  setIsRejectModalOpen(true);
                                  setSelectedUser(ele?.UserCode);
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

      <ConfirmModal
        show={isApproveModalOpen}
        onConfirm={handleApprove}
        onCancel={handleCancel}
        message="Are you sure to approve this user?"
        loading={isLoading}
      />
      <ConfirmModal
        show={isRejectModalOpen}
        onConfirm={handleReject}
        onCancel={handleCancel}
        message="Are you sure to reject this user?"
        loading={isLoading}
      />
    </>
  );
};

export default UsersListForAdmin;