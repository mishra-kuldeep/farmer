"use client";
import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import MiniLoader from "../reusableComponent/MiniLoader";

const EditSubCategory = ({ setState }) => {
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const [loader, setLoader] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [values, setValues] = useState({
    subcategoryName: "",
    description: "",
    category: "",
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
    setLoader(true);
    CategoryServices.editSubCategory(values, editId)
      .then((data) => {
        setErrors({});
        setLoader(false);
        setState("1");
        toast("sub category updated successfully!", {
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
        setLoader(false);
      });
  };
  useEffect(() => {
    if (editId) {
      CategoryServices.getCategory().then(({ data }) => {
        setCategoryList(data?.data);
      });
      CategoryServices.getSingesubCategory(editId)
        .then(({ data }) => {
          setValues({
            subcategoryName: data.subcategoryName,
            description: data.description,
            category: data.category,
            status: data.status,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [editId]);

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
          {categoryList?.map((elem) => (
            <option value={elem.categoryId} key={elem.categoryId}>{elem.categoryName}</option>
          ))}
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
            name="status"
            checked={values.status}
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
        <button
          className="admin_btn"
          onClick={onSubmitHandeler}
          disabled={loader}
        >
          {loader && <MiniLoader />}
          update
        </button>
      </div>
    </div>
  );
};

export default EditSubCategory;
