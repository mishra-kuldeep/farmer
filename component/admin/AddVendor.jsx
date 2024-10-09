
import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import toast from "react-hot-toast";
import MiniLoader from "../reusableComponent/MiniLoader";
import vendorMasterServices from "@/services/vendorMasterServices";


const AddVendor = ({ setState }) => {
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState({
    type: "",
    description: "",
    status: false, 
  });

  const onchangeHandeler = (e) => {
    const { value, name } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

  };

  const onSubmitHandler = async () => {
    setLoader(true);
      try {
        await vendorMasterServices.addVendorMaster(values);
        setErrors({});
        setLoader(false);
        setValues({
          type: "",
          description: "", 
        });

        // Show success toast
        toast("Vendor added successfully!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });

        // Update state after successful service call
        setState("1");
      } catch (err) {
        console.log(err)
        const errorData = err?.response?.data?.errors || [];
        const errorObj = errorData.reduce((acc, curr) => {
          acc[curr.path] = curr.msg;
          return acc;
        }, {});
        setErrors(errorObj);
        setLoader(false);
      }
    } 
  


  return (
    <div className="row  m-0 p-3">
      <div className="col-md-4 mb-3 ">
        <label className="adjustLabel">Services Type*</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="type"
          value={values?.type}
          onChange={onchangeHandeler}
        />
        {errors.type && (
          <span className="error_input_text">{errors?.type}</span>
        )}
      </div>
      <div className="col-md-8 mb-3">
        <label className="adjustLabel">Description *</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="description"
          value={values?.description}
          onChange={onchangeHandeler}
        />
        {errors.description && (
          <span className="error_input_text">{errors?.description}</span>
        )}
      </div>

      <div className="col-md-3 my-3 d-flex align-items-center justify-content-center">
        <div className="form-check form-switch ">
          <input
            className="form-check-input custom-checkbox cursor"
            type="checkbox"
            id="flexSwitchCheckDefault"
            name="status"
            checked={values?.status}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, status: e?.target?.checked }))
            }
          />
          <label
            className="form-check-label ms-2 cursor"
            htmlFor="flexSwitchCheckDefault"
          >
            Status
          </label>
        </div>
      </div>
      <div className="col-md-3 text-center mt-3">
        <button className="login_btn" onClick={()=>onSubmitHandler()} disabled={loader}>
        {loader && <MiniLoader/>}
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddVendor;
