import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import MiniLoader from "../reusableComponent/MiniLoader";
import RoleServices from "@/services/RoleServices";
import vendorMasterServices from "@/services/vendorMasterServices";

const EditVendor = ({ setState }) => {
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState({
    type: "",
    description: "",
    status: false,
    isVendor:""
  });
  const [errors, setErrors] = useState({});

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
    vendorMasterServices
      .EditVendor(editId, values)
      .then((data) => {
        setErrors({});
        setLoader(false);
        setValues({
          type: "",
          description: "",
          status: false,
          isVendor:""
        });
        setState("1");
        toast("Vendor edit successfully!", {
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
      vendorMasterServices
        .getSingleVendor(editId)
        .then(({ data }) => {
          setValues({
            type: data.type,
            description: data.description,
            status: data.status,
            isVendor:data.isVendor
          });
        })
        .catch((err) => console.log(err));
    }
  }, [editId]);

  return (
    <div className="row  m-0 p-3">
      <div className="col-md-4 mb-3 ">
        <label className="adjustLabel">Services Type*</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="type"
          value={values.type}
          onChange={onChangeHandeler}
        />
        {errors.type && <span className="error_input_text">{errors.type}</span>}
      </div>
      <div className="col-md-6 mb-3 ">
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

      <div className="col-md-3 mb-3 d-flex align-items-center mt-3">
        <div className="form-check form-switch ">
          <input
            className="form-check-input custom-checkbox"
            type="checkbox"
            id="flexSwitchCheckDefault"
            size="large"
            name="status"
            checked={values?.status}
            onChange={statusHandeler}
          />
          <label
            className="form-check-label ms-3"
            htmlFor="flexSwitchCheckDefault"
          >
            Status
          </label>
        </div>
      </div>
      <div className="col-md-2 my-3 d-flex align-items-center justify-content-center">
        {/* <div className="form-check form-switch "> */}
        <input
          className="form-check-input custom-checkbox cursor"
          type="checkbox"
          id="flexSwitchCheckDefault"
          name="isVendor"
          checked={values?.isVendor}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, isVendor: e?.target?.checked }))
          }
        />
        <label
          className="form-check-label ms-2 cursor"
          htmlFor="flexSwitchCheckDefault"
        >
          is Vendor
        </label>
        {/* </div> */}
      </div>
      <div className="col-md-2 mb-3 text-center">
        <button
          className="login_btn"
          onClick={onSubmitHandeler}
          disabled={loader}
        >
          {loader && <MiniLoader />}
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditVendor;
