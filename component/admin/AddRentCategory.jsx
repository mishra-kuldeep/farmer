"use client";
import React, { useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import MiniLoader from "../reusableComponent/MiniLoader";
import RentServices from "@/services/RentService";

const AddRentCategory = ({ setState }) => {
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState({
    categoryName: "",
    description: "",
    status: false,
  });

  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState([]);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const statusHandler = (e) => {
    setValues((prev) => ({ ...prev, status: e.target.checked }));
  };

  const onSubmitHandler = () => {
    //  setLoader(true);
    const allField = fields.map((val) => !Object.values(val)[0] ? null : Object.values(val)[0])
    const result = allField.reduce((acc, item) => {
      if (item != null) {
        acc[item.trim()] = "";
      }
      return acc;
    }, {});
    values.otherDetails = result
    RentServices.addRentCategory(values)
      .then((val) => {
        console.log(val);

      }).catch((err)=>{
        const errorData = err?.response?.data?.errors || [];
        const errorObj = errorData.reduce((acc, curr) => {
          acc[curr.path] = curr.msg;
          return acc;
        }, {});
        setErrors(errorObj);
        setLoader(false);
      })
  };
console.log(errors);

  const addField = () => {
    setFields([...fields, { value: "" }]);
  };

  const handleInputChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    setFields(updatedFields);
  };
  console.log(fields);

  return (
    <div className="row m-0 p-3">
      <div className="col-md-3 mb-3">
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
      <div className="col-md-3 mb-3  d-flex align-items-center justify-content-center mt-3  ">
        <div className="form-check form-switch ">
          <input
            className="form-check-input custom-checkbox cursor "
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
            Status
          </label>
        </div>
      </div>
      <div className="col-md-2 mb-3 d-flex flex-column align-items-center  mt-3">
        <button onClick={addField} className="add-button" >
          <FaPlus size={14} />
        </button>
        {errors.otherDetails && (
          <span className="error_input_text">{errors.otherDetails}</span>
        )}
      </div>

      {fields.map((field, index) => (
        <div key={index} className="col-md-4 mb-3 mt-2">
          <input
            type="text"
            className="form-control p-2 adjustLabel_input"
            placeholder={`Field Name ${index + 1}`}
            value={field.value}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
      ))}

      <div className="col-md-12 mb-3 text-center">
        <button className="admin_btn" onClick={onSubmitHandler} disabled={loader}>
          {loader && <MiniLoader />}
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddRentCategory;
