

import CategoryServices from "@/services/CategoryServices";
import React, { useEffect, useState } from "react";
import "../admin/adminpage.css";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "../reusableComponent/IconButton";
import ConfirmModel from "../reusableComponent/ConfirmModel";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Pagination from "../reusableComponent/Pagination";
import ProductFarmerServices from "@/services/ProductFarmerServices";

const FarmerProductsList = ({ setState }) => {
  const router = useRouter()
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("")
  const [catList, setCatList] = useState([]);
  const [metaData, setmetaData] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [categoryList, setcategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [farmerList, setFarmerList] = useState([]);
  const [subCategoryList, setsubCategoryList] = useState([]);
  const [allFarmerProducts, setAllFarmerProducts] = useState([]);
  const [intiapicall, setintiapicall] = useState(false);
  const [values, setValues] = useState({
    FarmerId: "",
    category: "",
    subCategory: "",
    brand: ""
  });


  const FilterinitApi = async () => {
    const farmerlist = await ProductFarmerServices.getfarmerlistforAdmin();
    setFarmerList(farmerlist?.data?.userProfile);
    const categoryList = await CategoryServices.getCategory();
    setcategoryList(categoryList?.data?.data);
    const subCategoryList = await CategoryServices.getSubCategory();
    setsubCategoryList(subCategoryList?.data?.data);
    const BrandList = await CategoryServices.getBrand();
    setBrandList(BrandList?.data?.data);
  };

  const onchangeHandeler = (e) => {
    const { value, name } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setintiapicall(!intiapicall)
  };


  const initApi = async () => {
    const catList = await CategoryServices.getProducts(page, searchText);
    setCatList(catList?.data?.data);
  };


  useEffect(() => {
    FilterinitApi();
  }, []);

  useEffect(() => {
    ProductFarmerServices.getAllproductslistforAdmin({
      page: page, search: searchText,
      category: values?.category,
      subCategory: values?.subCategory,
      brand: values?.brand,
      sellerId: values?.FarmerId
    }).then(({ data }) => {
      setAllFarmerProducts(data?.data)
      setmetaData(data?.meta)
    }).catch((err) => {
      console.log(err)
    })
  }, [intiapicall, page, searchText]);


  useEffect(() => {
    initApi();
  }, []);

  // const handleDelete = async () => {
  //   await CategoryServices.deleteProduct(selectedId).then((data) => {
  //     setCatList(catList.filter((ele) => ele.productId !== selectedId));
  //     setShowConfirm(false);
  //     toast("product deleted successfully!", {
  //       icon: "👏",
  //       style: {
  //         borderRadius: "10px",
  //         background: "green",
  //         color: "#fff",
  //       },
  //     });
  //   });
  // };



  // const handleCancel = () => {
  //   setShowConfirm(false);
  // };
  // const deleteHandeler = (id) => {
  //   setSelectedId(id);
  //   setShowConfirm(true);
  // };
  // const editHandeler = (id) => {
  //   setState("2");
  //   router.push(`/admin/addProduct?editId=${id}`);
  // };
  // const statusUpdate = (id, status) => {
  //   CategoryServices.statusUpdateProduct(id, status).then(({ data }) => {
  //     toast(data.message, {
  //       icon: "👏",
  //       style: {
  //         borderRadius: "10px",
  //         background: "green",
  //         color: "#fff",
  //       },
  //     });
  //   })
  // }


  return (
    <div className="p-2">
      <div className="row mb-3">
        <div className="col-md-3 mb-3">
          <label className="adjustLabel">Farmer List</label>
          <select
            className="form-select custom-select adjustLabel_input"
            aria-label="Default select example"
            name="FarmerId"
            value={values.FarmerId}
            onChange={onchangeHandeler}
          >
            <option value="" className="d-none"></option>
            {farmerList?.map((item) => (
              <option value={item?.UserId} key={item?.UserId}>
                {item?.FirstName}  {item?.LastName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <label className="adjustLabel">Category</label>
          <select
            className="form-select custom-select adjustLabel_input"
            aria-label="Default select example"
            name="category"
            value={values.category}
            onChange={onchangeHandeler}
          >
            <option value="" className="d-none"></option>
            {categoryList?.map((item) => (
              <option value={item?.categoryId} key={item?.categoryId}>
                {item?.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <label className="adjustLabel">Sub Category</label>
          <select
            className="form-select custom-select adjustLabel_input"
            aria-label="Default select example"
            name="subCategory"
            value={values?.subCategory}
            onChange={onchangeHandeler}
          >
            <option value="" className="d-none"></option>
            {subCategoryList?.map((item) => (
              <option value={item?.subcategoryId} key={item?.subcategoryId}>
                {item?.subcategoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <label className="adjustLabel">Brand</label>
          <select
            className="form-select custom-select adjustLabel_input"
            aria-label="Default select example"
            name="brand"
            value={values?.brand}
            onChange={onchangeHandeler}
          >
            <option value="" className="d-none"></option>
            {brandList?.map((item) => (
              <option value={item?.brandId} key={item?.brandId}>
                {item?.brandName}
              </option>
            ))}
          </select>
        </div>
      </div>


      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>sr no</th>
            <th>product name</th>
            {/* <th className="text-center">brand name</th>
            <th className="text-center">category name</th>
            <th className="text-center">sub category name</th> */}
            <th className="text-center">price</th>
            <th className="text-center">discount</th>
            <th className="text-center">status</th>
            <th className="text-center">action</th>
          </tr>
        </thead>
        {allFarmerProducts?.length > 0 && (
          <tbody>
            {allFarmerProducts?.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item?.productDtlName}</td>
                  {/* <td className="text-center">{item?.Brand?.brandName}</td>
                  <td className="text-center">{item?.Category?.categoryName}</td>
                  <td className="text-center">
                    {item?.SubCategory?.subcategoryName}
                  </td> */}
                  <td className="text-center">{item?.price}</td>
                  <td className="text-center">{item?.discount}</td>
                  <td className="d-flex justify-content-center">
                    <IconButton onClick={() => statusUpdate(item.productId, item.status)}>
                      {item.status ? (
                        <IoEye color="green" />
                      ) : (
                        <IoMdEyeOff color="red" />
                      )}
                    </IconButton>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      {/* <IconButton onClick={() => deleteHandeler(item.productId)}>
                        <MdDelete color="red" />
                      </IconButton>
                      <IconButton onClick={() => editHandeler(item.productId)}>
                        <FaRegEdit color="green" />
                      </IconButton> */}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {catList?.length == 0 && (
        <div
          className=" centerAllDiv fs-5 text-secondary "
          style={{ height: "50vh" }}
        >
          <h6>No Category Found</h6>
        </div>
      )}
      <Pagination
        page={page} 
        setPage={setPage} 
        searchText={searchText} 
        setSearchText={setSearchText}
        List={allFarmerProducts}
        metaData={metaData}
      />
      {/* <ConfirmModel
        show={showConfirm}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        message="Are you sure you want to delete this item?"
      /> */}
    </div>
  );
};

export default FarmerProductsList;
