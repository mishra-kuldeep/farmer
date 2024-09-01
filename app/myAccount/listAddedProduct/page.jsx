"use client";
import IconButton from "@/component/reusableComponent/IconButton";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { IoIosArrowBack ,IoIosArrowForward} from "react-icons/io";
import React, { useEffect, useState } from "react";
import Pagination from "@/component/reusableComponent/Pagination";
import ConfirmModel from "@/component/reusableComponent/ConfirmModel";

const ListAddedProduct = () => {
  const [productList, setProductList] = useState([]);
  const [metaData,setMetaData]=useState({})

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const initApi = () => {
    ProductFarmerServices.getProductsFarmer(page,searchText)
      .then(({ data }) => {
        console.log(data);
        setProductList(data?.data);
        setMetaData(data?.meta)
      })
      .catch((err) => console.log(err));
  };

  const editHandeler = () => {
    console.log("first");
  };

  const handleDelete = async () => {
    await ProductFarmerServices.deleteProductsFarmer(selectedId).then((data) => {
      setProductList(productList.filter((ele) => ele.productDtlId !== selectedId));
    setShowConfirm(false);
    toast("product deleted successfully!", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "green",
        color: "#fff",
      },
    });
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
    initApi();
  }, [page,searchText]);
  return (
    <div>
      <Pagination
        page={page} 
        setPage={setPage} 
        searchText={searchText} 
        setSearchText={setSearchText}
        List={productList}
        metaData={metaData}
        searchShow = {true}
      />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>sr no</th>
            <th>Product Name</th>
            <th>Discription</th>
            <th>Product Type</th>
            <th className="text-center">Price</th>
            <th className="text-center">Discount/Type</th>
            <th className="text-center">Quantity/Unit</th>
            <th className="text-center">action</th>
          </tr>
        </thead>
        {productList?.length > 0 && (
          <tbody>
            {productList?.map((item, i) => {
              return (
                <tr key={item?.productDtlId}>
                  <td>
                    {i + 1}{" "}
                    {!item?.status ? (
                      <FcDisapprove color="green" size={30} />
                    ) : (
                      <FcApprove color="red" size={30} />
                    )}
                  </td>
                  <td>{item?.productDtlName}</td>
                  <td
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title={item?.productDtl}
                  >
                    {item?.productDtl?.length < 30
                      ? item?.productDtl
                      : `${item?.productDtl.substring(0, 30)}...`}
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
                    {item?.quantity}/{item?.unit}
                  </td>
                  <td className="text-center">
                    <div className="d-flex gap-2 justify-content-center">
                      <IconButton
                        onClick={() => editHandeler(item?.productDtlId)}
                      >
                        <FaRegEdit color="green" size={20} />
                      </IconButton>
                      <IconButton  onClick={() => deleteHandeler(item.productDtlId)}>
                        <MdDelete color="red" size={20} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>

      <ConfirmModel
        show={showConfirm}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
};

export default ListAddedProduct;
