"use client";
import React, { useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
import MiniLoader from "../reusableComponent/MiniLoader";

const AddCategory = ({ setState }) => {
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState({
    categoryName: "",
    description: "",
    status: false,
  });

  const [errors, setErrors] = useState({}); 

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const statusHandler = (e) => {
    setValues((prev) => ({ ...prev, status: e.target.checked }));
  };

  const onSubmitHandler = () => {
    setLoader(true);
    CategoryServices.addCategory(values)
      .then((data) => {
        setLoader(false);
        setErrors({});
        setValues({
          categoryName: "",
          description: "",
          status: false,
        });
        toast("category added successfully!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
        setState("1");
      })
      .catch((err) => {
        const errorData = err?.response?.data?.errors || [];
        const errorObj = errorData.reduce((acc, curr) => {
          acc[curr.path] = curr.msg;
          return acc;
        }, {});
        setErrors(errorObj);
        setLoader(false);
      });
  };

  return (
    <div className="row  m-0 p-3">
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">Category Name *</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="categoryName"
          value={values.categoryName}
          onChange={onChangeHandler}
        />
        {errors.categoryName && (
          <span className="error_input_text">{errors.categoryName}</span>
        )}
      </div>
      <div className="col-md-4 mb-3">
        <label className="adjustLabel">Description</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="description"
          value={values.description}
          onChange={onChangeHandler}
        />
        {errors.description && (
          <span className="error_input_text">{errors.description}</span>
        )}
      </div>
      <div className="col-md-4 mb-3 d-flex align-items-center mt-3">
        <div className="form-check form-switch ">
          <input
            className="form-check-input custom-checkbox cursor"
            type="checkbox"
            id="flexSwitchCheckDefault"
            name="status"
            checked={values.status}
            onChange={statusHandler}
          />
          <label
            className="form-check-label ms-3 cursor"
            htmlFor="flexSwitchCheckDefault"
          >
            Status for category
          </label>
        </div>
      </div>

      <div className="col-md-12 mb-3 text-center">
        <button className="admin_btn" onClick={onSubmitHandler}  disabled={loader}>
          {loader && <MiniLoader/>}
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
