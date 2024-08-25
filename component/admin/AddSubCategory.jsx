"use client";
import React, { useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";

const AddSubCategory = ({setState}) => {
  const [values, setValues] = useState({
    subcategoryName: "",
    description: "",
    category:"",
    status: false,
  });
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const onChangeHandeler = (e) => {
    const { value, name } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const statusHandeler = (e) => {
    setValues((pre) => ({ ...pre, status: e.target.checked }));
  };

  const onSubmitHandeler = () => {
    CategoryServices.addSubCategory(values)
      .then((data) => {
        setErrors({});
        setValues({
          subcategoryName: "",
          description: "",
          category:"",
          status: false,
        })
        toast("sub category added successfully!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
        setState("1");
      })
      .catch((err) =>{
        const errorData = err?.response?.data?.errors || [];
        const errorObj = errorData.reduce((acc, curr) => {
          acc[curr.path] = curr.msg;
          return acc;
        }, {});
        setErrors(errorObj)
      });
  };

  return (
    <div className="row  m-0 p-3">
      <div className="col-md-4 mb-3 ">
        <label className="adjustLabel">Sub categoryName</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="subcategoryName"
          value={values.subcategoryName}
          onChange={onChangeHandeler}
        />
          {errors.subcategoryName && (
          <span className="error_input_text">{errors.subcategoryName}</span>
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
        <label className="adjustLabel">Category</label>
        <select
          className="form-select custom-select adjustLabel_input"
          onChange={onChangeHandeler}
          value={values.category}
          aria-label="Default select example"
          name="category"
        >
          <option value="" className="d-none"></option>
          <option value={1}>Farmers</option>
          <option value={2}>Buyers</option>
          <option value={3}>Transportation</option>
          <option value={4}>Employee</option>
          <option value={5}>Vendors</option>
          <option value={6}>Educational Resources</option>
          <option value={7}>Customer Care</option>
        </select>
        {errors.category && (
          <span className="error_input_text">{errors.category}</span>
        )}
      </div>
      <div className="col-md-4 mb-3 d-flex align-items-center mt-3">
        <div className="form-check form-switch ">
          <input
            className="form-check-input custom-checkbox cursor"
            type="checkbox"
            id="flexSwitchCheckDefault"
            size="large"
            onChange={statusHandeler}
          />
          <label
            className="form-check-label ms-3 cursor"
            htmlFor="flexSwitchCheckDefault"
          >
            Status for sub category
          </label>
        </div>
      </div>

      <div className="col-md-4 my-3 text-center">
        <button className="admin_btn" onClick={onSubmitHandeler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddSubCategory;
