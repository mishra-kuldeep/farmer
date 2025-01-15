"use client";
import IconButton from "@/component/reusableComponent/IconButton";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import VehicleMasterServices from "@/services/VehicleMasterServices";
import React, { useEffect, useState } from "react";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import ConfirmModel from "@/component/reusableComponent/ConfirmModel";
import toast from "react-hot-toast";
import vendorMasterServices from "@/services/vendorMasterServices";

const VendorServicesList = () => {
  const [VendorList, setVendorList] = useState([]);
  const [status, setStatus] = useState("All");
  const [Loader, setLoader] = useState(false);
  const [confirmLoader, setConfirmLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    setLoader(true);
    const data = {
      status:status,
      slug:"",
      page:"",
      searchText:"",
      countryId:"",
    };
    vendorMasterServices.getAllVendorServices(data)
      .then(({ data }) => {
        setLoader(false);
        setVendorList(data?.data);
      })
      .catch((err) => console.log(err));
  }, [status, confirmLoader]);

  const handleStatusChange = (id) => {
    setStatus(id);
  };

  const handleCancel = () => {
    setOpen(false);
    setOpen2(false);
  };

  const handleApprove = () => {
    setConfirmLoader(true);
    const data ={adminReview:"Approved"}
    vendorMasterServices.reviewVendorServices(selectedUser,data)
      .then(({ data }) => {
        setConfirmLoader(false);
        setOpen(false);
        toast(data?.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const handleRject = () => {
    setConfirmLoader(true);
    const data ={adminReview:"Rejected",adminReviewComment:"your detail not valid, please recheck"}
    vendorMasterServices.reviewVendorServices(selectedUser,data)
      .then(({ data }) => {
        setConfirmLoader(false);
        setOpen2(false);
        toast(data?.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="adminPaperWrap addproductwrap p-2 position-relative">
      <div className="w-50 gap-4 d-flex m-2">
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
            value="Approvedadminside"
            checked={status == "Approved"}
            onChange={() => handleStatusChange("Approved")}
          />
          <span className="m-1">Approved</span>
        </label>
    
        <label>
          <input
            type="radio"
            value="Pending"
            checked={status == "Pending"}
            onChange={() => handleStatusChange("Pending")}
          />
          <span className="m-1">Pending</span>
        </label>
        <label>
          <input
            type="radio"
            value="Rejected"
            checked={status == "Rejected"}
            onChange={() => handleStatusChange("Rejected")}
          />
          <span className="m-1">Rejected</span>
        </label>
      </div>
      <table className="table  table-bordered">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Service Type</th>
            <th>Service Name</th>
            <th className="text-center">Cost</th>
            <th className="text-center">Availability</th>
            <th className="text-center">Duration</th>
            <th className="text-center">Available Offers</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        {!Loader ? (
          <tbody>
            {VendorList?.map((item, i) => {
              return (
                <>
                  <tr key={i}>
                    <td
                      className={`${
                        item?.adminReview == "Pending"
                          ? "bgwarning"
                          : item?.adminReview == "Approved"
                          ? "bgsuccess"
                          : item?.adminReview == "Rejected"
                          ? "bgdanger"
                          : ""
                      }`}
                    >
                      {i + 1}
                    </td>
                    <td>{item?.VendorMaster?.type}</td>
                    <td style={{ backgroundColor: "transparent" }}>
                      {item?.serviceName}
                    </td>
                    <td className="text-center">₹ {item?.cost}</td>
                    <td className="text-center">
                      {item?.availabilityStatus}
                    </td>
                    <td className="text-center">{item?.duration}</td>
                    <td className="text-center">{item?.availableOffers}</td>
                    <td className="text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        {item?.adminReview == "Pending" && (
                          <>
                            <IconButton
                              tooltip="Approve"
                              onClick={() => {
                                setOpen(true),
                                  setSelectedUser(item?.serviceId);
                              }}
                            >
                              <BsCheckLg color="green" fontSize={50} />
                            </IconButton>
                            <IconButton
                              tooltip="Reject"
                              onClick={() => {
                                setOpen2(true),
                                  setSelectedUser(item?.serviceId);
                              }}
                            >
                              <RxCross2 color="red" fontSize={50} />
                            </IconButton>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr key={i + 1 - i * 2}>
                    {/* <td colSpan={9} className="bgsecondary">
                      <p>
                        <b className="ms-3">UserName :</b>
                        <span>{item?.User?.FirstName}</span>
                        <b className="ms-3">Phone :</b>
                        <span>{item?.User?.Phone}</span>
                        <b className="ms-3">Email :</b>
                        <span>{item?.User?.Email}</span>
                        <b className="ms-3">Address :</b>
                        <span>{item?.User?.userInfo?.City}, </span>
                        <span>{item?.User?.userInfo?.State} - </span>
                        <span>{item?.User?.userInfo?.Zip}</span>
                      </p>
                    </td> */}
                  </tr>
                </>
              );
            })}
          </tbody>
        ) : (
          <MiniLoader />
        )}
      </table>
      <ConfirmModel
        show={open}
        onConfirm={handleApprove}
        onCancel={handleCancel}
        message="Are you sure to approved this transport?"
        loading={confirmLoader}
      />
      <ConfirmModel
        show={open2}
        onConfirm={handleRject}
        onCancel={handleCancel}
        message="Are you sure to reject this transport?"
        loading={confirmLoader}
      />
    </div>
  );
};

export default VendorServicesList;
