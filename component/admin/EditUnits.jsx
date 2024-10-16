import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import MiniLoader from "../reusableComponent/MiniLoader";
import ProductUnitServices from "@/services/ProductUnitServices";
import CountryServices from "@/services/CountryServices";

const EditUnits = ({ setState }) => {
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const [loader, setLoader] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [countryIderror, setcountryIderror] = useState("");
  const [values, setValues] = useState({
    countryId:"",
    unitName: "",
    status: false,
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
    ProductUnitServices.editUnit(values, editId)
      .then((data) => {
        setErrors({});
        setLoader(false);
        setValues({
          unitName: "",
          status: false,
        });
        setState("1");
        toast("Unit Edit successfully!", {
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
      ProductUnitServices.getSingeUnit(editId)
        .then(({ data }) => {
          setValues({
            countryId:data.countryId,
            unitName: data.unitName,
            status: data.status,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [editId]);

  useEffect(() => {
    CountryServices.getAllCountry()
      .then(({ data }) => {
        setCountryList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="row  m-0 p-3">
      <div className="col-md-4 mb-3 ">
        <label className="adjustLabel">Unit Name</label>
        <input
          type="text"
          className="form-control p-2 adjustLabel_input"
          name="unitName"
          value={values.unitName}
          onChange={onChangeHandeler}
        />
        {errors.unitName && (
          <span className="error_input_text">{errors.unitName}</span>
        )}
      </div>
      <div className="col-md-4">
        <label className="adjustLabel">Country</label>
        <select
          className="form-select custom-select adjustLabel_input shadow-none"
          aria-label="Default select example"
          value={values.countryId || ""}
          onChange={onChangeHandeler}
          name="countryId"
        >
          <option value={""}></option>
          {countryList?.map((val) => (
            <option value={val?.countryId}>{val?.countryName}</option>
          ))}
        </select>
        {countryIderror && (
          <span className="error_input_text">{countryIderror}</span>
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
            Status for Unit
          </label>
        </div>
      </div>
      <div className="col-md-12 mb-3 text-center">
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

export default EditUnits;
