"use client";
import IconButton from "@/component/reusableComponent/IconButton";
import { MdDelete } from "react-icons/md";
import { FaRegEdit, FaRegImages } from "react-icons/fa";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import React, { useEffect, useState } from "react";
import Pagination from "@/component/reusableComponent/Pagination";
import ConfirmModel from "@/component/reusableComponent/ConfirmModel";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Image_URL } from "@/helper/common";
import "../../admin/addProduct/addProduct.css";

const vehicleList = () => {
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [metaData, setMetaData] = useState({});

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const editHandeler = (id) => {
    router.push(`/myAccount/editProduct/${id}`);
  };

  const handleDelete = async () => {
    await ProductFarmerServices.deleteProductsFarmer(selectedId)
      .then(({ data }) => {
        console.log(data);
        setProductList(
          productList.filter((ele) => ele.productDtlId !== selectedId)
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
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };
  const deleteHandeler = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const getImage = (id) => {
    setImageList([])
    ProductFarmerServices.getAllImage(id)
      .then(({ data }) => {
        console.log(data?.images);
        setImageList(data?.images);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    ProductFarmerServices.getProductsFarmer(page, searchText)
      .then(({ data }) => {
        console.log(data)
        setProductList(data?.data);
        setMetaData(data?.meta);
      })
      .catch((err) => console.log(err));
  }, [page, searchText]);

  return (
    <div>
      <Pagination
        page={page}
        setPage={setPage}
        searchText={searchText}
        setSearchText={setSearchText}
        List={productList}
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
                <th>Product Name</th>
                <th>Discription</th>
                <th>Product Type</th>
                <th className="text-center">Price</th>
                <th className="text-center">Discount</th>
                <th className="text-center">Quantity/Unit</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            {productList?.length > 0 && (
              <tbody>
                {productList?.map((item, i) => {
                  return (
                    <tr key={item?.productDtlId}>
                      <td
                        className={`${
                          !item?.isVerify && !item?.rejected
                            ? "bgwarning"
                            : item?.isVerify
                            ? "bgsuccess"
                            : item?.rejected
                            ? "bgdanger"
                            : ""
                        }`}
                      >
                        {i + 1}
                      </td>
                      <td>{item?.productDtlName}</td>
                      <td
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title={item?.productDtl}
                      >
                        {item?.productDtl?.length < 100
                          ? item?.productDtl
                          : `${item?.productDtl.substring(0, 100)}...`}
                      </td>
                      <td style={{ backgroundColor: "transparent" }}>
                        {item?.Product.productName}
                      </td>
                      <td className="text-center">{item?.price}</td>
                      <td className="text-center">
                        {item?.discountType == "fixed" && "₹"}
                        {item?.discount}
                        {item?.discountType == "percentage" && "%"}
                      </td>
                      <td className="text-center">
                        {item?.quantity}/{item?.ProductUnit?.unitName}
                      </td>
                      <td className="text-center">
                        <div className="d-flex gap-2 justify-content-center">
                          <div
                            className="rounded-5"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                            onClick={() => getImage(item?.productDtlId)}
                          >
                            <IconButton tooltip="view images">
                              <FaRegImages color="darkblue" size={20} />
                            </IconButton>
                          </div>

                          <IconButton
                            tooltip="edit"
                            onClick={() => editHandeler(item?.productDtlId)}
                          >
                            <FaRegEdit color="green" size={20} />
                          </IconButton>
                          {!item?.isVerify ? (
                            <IconButton
                              tooltip="delete"
                              onClick={() => deleteHandeler(item.productDtlId)}
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
      />
      <div
        className="offcanvas offcanvas-end"
        style={{width: "470px"}}
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
         <div style={{display:"flex",flexDirection:"column"}}>
         {imageList?.map((val,i) => (
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

export default vehicleList;
