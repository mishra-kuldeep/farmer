"use client";
import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";

const AddBrand = () => {
  const [values, setValues] = useState({
    brandName: "",
    description: "",
    subCategory: "",
    status: false,
  });
  const [subCategoryList, setsubCategoryList] = useState([]);
  const [errors, setErrors] = useState({});


  const initApi = async () => {
    const subCategoryList = await CategoryServices.getSubCategory();
    setsubCategoryList(subCategoryList?.data?.data);;
  };


  const onChangeHandeler = (e) => {
    const { value, name } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const statusHandeler = (e) => {
    setValues((pre) => ({ ...pre, status: e.target.checked }));
  };

  useEffect(() => {
    initApi();
  }, []);


  const onSubmitHandeler = () => {
    CategoryServices.addBrand(values)
      .then((data) => {
        setErrors({});
        setValues({
          brandName: "",
          description: "",
          subCategory: "",
          status: false,
        });
        toast("brand added successfully!", {
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
      });
  };

  return (
    <div className="row  m-0 p-3">
      <div className="col-md-4 mb-3 ">
        <label className="adjustLabel">BrandName</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="brandName"
          value={values.brandName}
          onChange={onChangeHandeler}
        />
        {errors.brandName && (
          <span className="error_input_text">{errors.brandName}</span>
        )}
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">Description</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="description"
          value={values.description}
          onChange={onChangeHandeler}
        />
        {errors.description && (
          <span className="error_input_text">{errors.description}</span>
        )}
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">Sub Category *</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="subCategory"
          value={values?.subCategory}
          onChange={onChangeHandeler}
        >
          <option value="" className="d-none"></option>
          {subCategoryList?.map((item) => (
            <option value={item?.subcategoryId} key={item?.subcategoryId}>
              {item?.subcategoryName}
            </option>
          ))}
        </select>
        {errors?.subCategory && (
          <span className="error_input_text">{errors?.subCategory}</span>
        )}
      </div>
      <div className="col-md-4 mb-3 d-flex align-items-center mt-3">
        <div className="form-check form-switch ">
          <input
            className="form-check-input custom-checkbox"
            type="checkbox"
            id="flexSwitchCheckDefault"
            size="large"
            name="status"
            checked={values.status}
            onChange={statusHandeler}
          />
          <label
            className="form-check-label ms-3"
            htmlFor="flexSwitchCheckDefault"
          >
            Status for Brand
          </label>
        </div>
      </div>
      <div className="col-md-12 mb-3 text-center">
        <button className="login_btn" onClick={onSubmitHandeler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddBrand;
