"use client";
import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";

const AddSubCategory = ({setState}) => {
  const [values, setValues] = useState({
    subcategoryName: "",
    description: "",
    category:"",
    status: false,
  });
  const [categoryList, setCategoryList] = useState([]); 
  const [errors, setErrors] = useState({});

  const onChangeHandeler = (e) => {
    const { value, name } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const statusHandeler = (e) => {
    setValues((pre) => ({ ...pre, status: e.target.checked }));
  };

  const initApi = () => {
    CategoryServices.getCategory().then(({data})=>{
      setCategoryList(data?.data)
    })
  }
  useEffect(()=>{
    initApi()
  },[])

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
        console.log(err)
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
          {categoryList?.map((elem)=><option value={elem.categoryId}>{elem.categoryName}</option>)}
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
