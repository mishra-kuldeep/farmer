import CategoryServices from "@/services/CategoryServices";
import React, { useEffect, useState } from "react";
import "../admin/adminpage.css";
import IconButton from "../reusableComponent/IconButton";
import { GrOverview } from "react-icons/gr";
import Pagination from "../reusableComponent/Pagination";
import ProductFarmerServices from "@/services/ProductFarmerServices";
import ProductModal from "../reusableComponent/ProductModal";

const AproveFarmerProductslist = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [metaData, setmetaData] = useState(false);
  const [categoryList, setcategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [farmerList, setFarmerList] = useState([]);
  const [subCategoryList, setsubCategoryList] = useState([]);
  const [allFarmerProducts, setAllFarmerProducts] = useState([]);
  const [intiapicall, setintiapicall] = useState(false);
  const [modalData, setModalData] = useState("");
  const [actionPerformed, setActionPerformed] = useState(false)

  const [values, setValues] = useState({
    FarmerId: "",
    category: "",
    subCategory: "",
    brand: "",
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
    setintiapicall(!intiapicall);
  };

  useEffect(() => {
    FilterinitApi();
  }, []);

  useEffect(() => {
    ProductFarmerServices.getAllproductsAdmin({
      name:"isApproved",
      page: page,
      search: searchText,
      category: values?.category,
      subCategory: values?.subCategory,
      brand: values?.brand,
      sellerId: values?.FarmerId,
      
    })
      .then(({ data }) => {
        setAllFarmerProducts(data?.data);
        setmetaData(data?.meta);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [intiapicall, page, searchText,actionPerformed]);


  return (
    <div className="p-2">
      <Pagination
        page={page}
        setPage={setPage}
        searchText={searchText}
        setSearchText={setSearchText}
        List={allFarmerProducts}
        metaData={metaData}
        searchShow={true}
      />
      <div className="row">
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
                {item?.FirstName} {item?.LastName}
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
            <th style={{whiteSpace:"nowrap"}}>sr no</th>
            <th style={{whiteSpace:"nowrap"}}>product name</th>
            <th style={{whiteSpace:"nowrap"}} className="text-center">brand name</th>
            <th style={{whiteSpace:"nowrap"}} className="text-center">category name</th>
            <th style={{whiteSpace:"nowrap"}} className="text-center">sub category name</th>
            <th className="text-center">price</th>
            <th className="text-center">discount</th>
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
                  <td className="text-center">
                    {
                      brandList.filter(
                        (elem) => elem.brandId == item?.Product?.brand
                      )[0]?.brandName
                    }
                  </td>
                  <td className="text-center">
                    {
                      categoryList.filter(
                        (elem) => elem.categoryId == item?.Product?.category
                      )[0]?.categoryName
                    }
                  </td>
                  <td className="text-center">
                    {
                      subCategoryList.filter(
                        (elem) =>
                          elem.subcategoryId == item?.Product?.subCategory
                      )[0]?.subcategoryName
                    }
                  </td>
                  <td className="text-center">{item?.price}</td>
                  <td className="text-center">{item?.discountType=="fixed"&&"₹"} {item?.discount} {item?.discountType=="percentage"&&"%"}</td>
                
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <div
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                        }}
                      >
                        <IconButton onClick={() => setModalData(item)}>
                          <GrOverview color="green" size={20} />
                        </IconButton>
                      </div>
                      <ProductModal
                        modalData={modalData}
                        brandList={brandList}
                        categoryList={categoryList}
                        subCategoryList={subCategoryList}
                        setActionPerformed={setActionPerformed}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {allFarmerProducts?.length == 0 && (
        <div
          className=" centerAllDiv fs-5 text-secondary "
          style={{ height: "50vh" }}
        >
          <h6>No Products Found</h6>
        </div>
      )}
    </div>
  );
};

export default AproveFarmerProductslist;
