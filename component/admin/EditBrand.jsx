import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const EditBrand = ({setState}) => {
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const [values, setValues] = useState({
    brandName: "",
    description: "",
    status: false,
  });
  const [errors, setErrors] = useState({});

  console.log(values)

  const onChangeHandeler = (e) => {
    const { value, name } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const statusHandeler = (e) => {
    setValues((pre) => ({ ...pre, status: e.target.checked }));
  };

  const onSubmitHandeler = () => {
    CategoryServices.editBrand(values,editId)
      .then((data) => {
        setErrors({});
        setValues({
          brandName: "",
          description: "",
          status: false,
        });
        setState("1")
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

  useEffect(() => {
    if (editId) {
      CategoryServices.getSingeBrand(editId).then(({ data }) => {
        setValues({
          brandName: data.brandName,
          description: data.description,
          status: data.status,
        });
      });
      console.log(editId);
    }
  }, [editId]);

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

export default EditBrand;
