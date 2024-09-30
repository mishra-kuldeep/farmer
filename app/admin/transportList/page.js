"use client";
import IconButton from "@/component/reusableComponent/IconButton";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import VehicleMasterServices from "@/services/VehicleMasterServices";
import React, { useEffect, useState } from "react";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import ConfirmModel from "@/component/reusableComponent/ConfirmModel";
import toast from "react-hot-toast";

const TransportList = () => {
  const [transportVehicleList, settransportVehicleList] = useState([]);
  const [status, setStatus] = useState("All");
  const [Loader, setLoader] = useState(false);
  const [confirmLoader, setConfirmLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    setLoader(true);
    VehicleMasterServices.getAllTransporterVehicleAdmin(status)
      .then(({ data }) => {
        console.log(data?.rows);
        setLoader(false);

        settransportVehicleList(data?.rows);
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
    VehicleMasterServices.TransporterVehicleAdminApprove(selectedUser)
      .then(({ data }) => {
        console.log(data);
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
    VehicleMasterServices.TransporterVehicleAdminReject(selectedUser)
      .then(({ data }) => {
        console.log(data);
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
      <table className="table  table-bordered">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Vehicle type</th>
            <th>Vehicle Capacity In Ton</th>
            <th className="text-center">Vehicle No</th>
            <th className="text-center">Availability</th>
            <th className="text-center">Charge Per Km</th>
            <th className="text-center">Driver Name</th>
            <th className="text-center">Driver Contact</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        {!Loader ? (
          <tbody>
            {transportVehicleList?.map((item, i) => {
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
                    <td>{item.TransportVehicle.type}</td>
                    <td style={{ backgroundColor: "transparent" }}>
                      {item?.TransportVehicle?.capacity}
                    </td>
                    <td className="text-center">{item?.vehicleNumber}</td>
                    <td className="text-center">
                      {item?.vehicleAvailabilityStatus}
                    </td>
                    <td className="text-center">₹ {item?.chargePerKm}</td>
                    <td className="text-center">{item?.driverName}</td>
                    <td className="text-center">{item?.driverContact}</td>

                    <td className="text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        {/* <IconButton>
                        <MdDelete color="red" size={20}/>
                      </IconButton> */}
                        {item?.adminReview == "Pending" && (
                          <>
                            <IconButton
                              tooltip="Approve"
                              onClick={() => {
                                setOpen(true),
                                  setSelectedUser(item?.transVehicalId);
                              }}
                            >
                              <BsCheckLg color="green" fontSize={50} />
                            </IconButton>
                            <IconButton
                              tooltip="Reject"
                              onClick={() => {
                                setOpen2(true),
                                  setSelectedUser(item?.transVehicalId);
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
                    <td colSpan={9} className="bgsecondary">
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
                    </td>
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

export default TransportList;
