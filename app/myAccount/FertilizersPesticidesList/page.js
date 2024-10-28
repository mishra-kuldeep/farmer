"use client";
import IconButton from "@/component/reusableComponent/IconButton";
import { MdDelete } from "react-icons/md";
import { FaRegEdit, FaRegImages } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Pagination from "@/component/reusableComponent/Pagination";
import ConfirmModel from "@/component/reusableComponent/ConfirmModel";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Image_URL } from "@/helper/common";
import "../../admin/addProduct/addProduct.css";
import VehicleServices from "@/services/VehicleServices";
import { useSelector } from "react-redux";
import vendorMasterServices from "@/services/vendorMasterServices";

const FertilizersPesticidesList = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth);
  const [servicesVenderList, setservicesVenderList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [metaData, setMetaData] = useState({});

  const [deleteloader, setdeleteloader] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const editHandeler = (id) => {
    router.push(`/myAccount/editFertilizersPesticides/${id}`);
  };

  const handleDelete = async () => {
    setdeleteloader(true);
    await vendorMasterServices
      .deleteVendorServices(selectedId)
      .then(({ data }) => {
        setdeleteloader(false);
        setservicesVenderList(
          servicesVenderList.filter((ele) => ele?.serviceId !== selectedId)
        );
        setShowConfirm(false);
        toast(data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        setdeleteloader(false);
        setShowConfirm(false);
      });
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };
  const deleteHandeler = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };
console.log(user.profile?.id)
  useEffect(() => {
    if (user.profile?.id) {
      vendorMasterServices
        .getVendorServices(user.profile?.id, page, searchText)
        .then(({ data }) => {
          console.log(data);
          setservicesVenderList(data);
          setMetaData(data?.meta);
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.profile?.id, page, searchText]);

  return (
    <div>
      <Pagination
        page={page}
        setPage={setPage}
        searchText={searchText}
        setSearchText={setSearchText}
        List={servicesVenderList}
        metaData={metaData}
        searchShow={true}
      />
      <div className="d-flex gap-4 mb-3 ms-3" style={{ marginTop: "-40px" }}>
        <div className="d-flex gap-2">
          <div
            style={{
              height: "20px",
              width: "20px",
              backgroundColor: "#fffb0e",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          ></div>
          <p style={{ color: "grey", fontSize: "12px" }}>Pending</p>
        </div>
        <div className="d-flex gap-2">
          <div
            style={{
              height: "20px",
              width: "20px",
              backgroundColor: "#ceff95",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          ></div>
          <p style={{ color: "grey", fontSize: "12px" }}>Approved</p>
        </div>
        <div className="d-flex gap-2">
          <div
            style={{
              height: "20px",
              width: "20px",
              backgroundColor: "#ffadad",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          ></div>
          <p style={{ color: "grey", fontSize: "12px" }}>Rejected</p>
        </div>
      </div>
      <div className="w-100">
        <div className="w-100 overflow-auto">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>SrNo</th>
                <th style={{ whiteSpace: "nowrap" }}>Service Type</th>
                <th style={{ whiteSpace: "nowrap" }}>Service Name</th>
                <th>Description</th>
                <th className="text-center">Cost</th>
                <th className="text-center">Duration</th>
                <th style={{ whiteSpace: "nowrap" }} className="text-center">
                  Offer Available
                </th>
                <th className="text-center">Availability</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            {servicesVenderList?.length > 0 && (
              <tbody>
                {servicesVenderList?.map((item, i) => {
                  return (
                    <tr key={item?.productDtlId}>
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
                      <td>{item?.serviceName}</td>
                      <td
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title={item?.description}
                      >
                        {item?.description?.length < 100
                          ? item?.description
                          : `${item?.description?.substring(0, 100)}...`}
                      </td>
                      <td style={{ backgroundColor: "transparent" }}>
                        {item?.cost}
                      </td>
                      <td style={{ backgroundColor: "transparent" }}>
                        {item?.duration}
                      </td>
                      <td className="text-center">
                        {item?.offer ? item?.offer : "----"}
                      </td>
                      <td className="text-center">
                        {item?.availabilityStatus}
                      </td>

                      <td className="text-center">
                        <div className="d-flex gap-2 justify-content-center">
                          <IconButton
                            tooltip="edit"
                            onClick={() => editHandeler(item?.serviceId)}
                          >
                            <FaRegEdit color="green" size={20} />
                          </IconButton>
                          {item?.adminReview == "Pending" ? (
                            <IconButton
                              tooltip="delete"
                              onClick={() => deleteHandeler(item.serviceId)}
                            >
                              <MdDelete color="red" size={20} />
                            </IconButton>
                          ) : (
                            <IconButton></IconButton>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>

      <ConfirmModel
        show={showConfirm}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        message="Are you sure you want to delete this item?"
        loading={deleteloader}
      />
      <div
        className="offcanvas offcanvas-end"
        style={{ width: "470px" }}
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">List of Images</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {imageList?.map((val, i) => (
              <img
                key={i}
                src={`${Image_URL}/products/${val.url}`}
                alt={val.url}
                className="imageofProductaddbyFarmer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizersPesticidesList;
