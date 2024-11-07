"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@/component/reusableComponent/Pagination";
import ConfirmModel from "@/component/reusableComponent/ConfirmModel";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import "../../admin/addProduct/addProduct.css";
import { useSelector } from "react-redux";
import vendorMasterServices from "@/services/vendorMasterServices";
import RentProductsServices from "@/services/RentProductServices";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const page = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth);
  const [servicesVenderList, setservicesVenderList] = useState([]);

  const [metaData, setMetaData] = useState({});
  const [deleteloader, setdeleteloader] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  const editHandeler = (id) => {
    router.push(`/myAccount/editVenderServices/${id}`);
  };

  //********  Toggle the expansion of the row ******************//
  const handleRowToggle = (rentProductId) => {
    setExpandedRow((prev) => (prev === rentProductId ? null : rentProductId));
  };

  //** render Other DetailsParse the JSON string ****************//
  const renderOtherDetails = (otherDetails) => {
    try {
      const detailsObj = JSON.parse(otherDetails);
      return Object.entries(detailsObj).map(([key, value], index) => (
        <p className="mt-2" key={index}>
          <strong>{key}:</strong> {value}
        </p>
      ));
    } catch (error) {
      console.error("Error parsing otherDetails:", error);
      return null;
    }
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

  useEffect(() => {
    if (user.profile?.id) {
      RentProductsServices.getAllRentProduct(user.profile?.id, page, searchText)
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
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>Rent Category</th>
              <th>Title</th>
              {/* <th>Description</th> */}
              {/* <th>Availability</th> */}
              <th>Phone</th>
              <th>For Rent</th>
              <th>For Sale</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          {servicesVenderList?.length > 0 && (
            <tbody>
              {servicesVenderList?.map((item, i) => (
                <React.Fragment key={item?.rentProductId}>
                  <tr
                    onClick={() => handleRowToggle(item?.rentProductId)}
                    style={{ cursor: "pointer" }}
                    className={`${
                      expandedRow === item?.rentProductId ? "bg-light" : ""
                    }`}
                  >
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
                    <td>{item?.rentCategory?.name}</td>
                    <td>{item.title}</td>
                    {/* <td
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title={item?.description}
                    >
                      {item?.description?.length < 50
                        ? item?.description
                        : `${item?.description?.substring(0, 50)}...`}
                    </td> */}
                    {/* <td>{item.isAvailable ? "Yes" : "No"}</td> */}
                    <td>{item.phone}</td>
                    <td>{item.isForRent ? "Yes" : "No"}</td>
                    <td>{item.isForSale ? "Yes" : "No"}</td>
                    <td>
                      <div className="d-flex gap-2 justify-content-center">
                        {/* Replace button with React icons */}
                        {expandedRow === item?.rentProductId ? (
                          <FaChevronUp
                            size={20}
                            onClick={() => handleRowToggle(item?.rentProductId)}
                          />
                        ) : (
                          <FaChevronDown
                            size={20}
                            color="green"
                            onClick={() => handleRowToggle(item?.rentProductId)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                  {/* Render expanded row with otherDetails */}
                  {expandedRow === item?.rentProductId && (
                    <tr>
                      <td colSpan="9">
                        <div className="mt-2"><strong>Description: </strong> {item?.description}</div>
                        <div>{renderOtherDetails(item?.otherDetails)}</div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <ConfirmModel
        show={showConfirm}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        message="Are you sure you want to delete this item?"
        loading={deleteloader}
      />
    </div>
  );
};

export default page;
