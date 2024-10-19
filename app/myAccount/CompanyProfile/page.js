"use client";
import React, { useEffect, useState } from "react";
import AuthService from "@/services/AuthServices";
import { useSelector } from "react-redux";
import { Image_URL } from "@/helper/common";
import { CgKey } from "react-icons/cg";
import toast from "react-hot-toast";
import CountryServices from "@/services/CountryServices";
import RoleServices from "@/services/RoleServices";

const MyProfile = () => {
  const user = useSelector((state) => state.auth);
  const [isloading, setisLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Errors, setErrors] = useState({});
  const [companyError, setCompanyError] = useState("");
  const [RoleList, setRoleList] = useState([]);

  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    Role: "",
    Profile: "",
    IdImage: "",
    AdharNo: "",
    CountryID: "",
    Dob: "",
    Gender: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Zip: "",
    CompanyName: "",
    GSTNo: "",
  });
  useEffect(() => {
    setisLoading(true);
    CountryServices.getAllCountry()
      .then(({ data }) => {
        setCountryList(data);
      })
      .catch((err) => console.log(err));
    RoleServices.getRoleList()
      .then(({ data }) => {
        setRoleList(data);
      })
      .catch((err) => console.log(err));

    if (user?.profile?.id) {
      AuthService.getUserProfile(user?.profile?.id).then(({ data }) => {
        setisLoading(false);
        setValues({
          FirstName: data.userProfile.FirstName,
          LastName: data.userProfile.LastName
            ? data.userProfile.LastName
            : null,
          Phone: data.userProfile.Phone,
          Email: data.userProfile.Email,
          Role: data.userProfile.Role,
          CountryID: data.userProfile.CountryID,
          Profile: data.userProfile.userInfo.Profile,
          IdImage: data.userProfile.userInfo.IdImage,
          AdharNo: data.userProfile.userInfo.AdharNo
            ? data.userProfile.userInfo.AdharNo
            : "",
          Dob: data.userProfile.userInfo.Dob,
          Gender: data.userProfile.userInfo.Gender,
          Address1: data.userProfile.userInfo.Address1,
          Address2: data.userProfile.userInfo.Address2,
          City: data.userProfile.userInfo.City,
          State: data.userProfile.userInfo.State,
          Zip: data.userProfile.userInfo.Zip,
          CompanyName: data.userProfile.userInfo.CompanyName,
          GSTNo: data.userProfile.userInfo.GSTNo,
        });
      });
    }
  }, [user?.profile?.id]);

  const updateProfileHandeler = () => {
    setLoading(true);
    if (
      (user?.profile?.role === 2 ||
        user?.profile?.role === 4 ||
        user?.profile?.role === 5 ||
        user?.profile?.role === 6) &&
      values?.CountryID == 1 &&
      !values?.AdharNo
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        AdharNo:
          values?.AdharNo?.length > 0
            ? "Please enter valid adhar number"
            : !values?.AdharNo
            ? "AdharNo is required"
            : "",
      }));
      setLoading(false);
      return;
    }
    if (
      ((user?.profile?.role === 2 || user?.profile?.role === 4) &&
        !values?.Address1) ||
      !values?.City ||
      !values?.State ||
      !values?.Zip
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Address1: !values?.Address1 ? "Address1 is required" : "",
        City: !values?.City ? "City is required" : "",
        State: !values?.State ? "State is required" : "",
        ["Zip"]: !values?.Zip ? "Zip is required" : "",
      }));
      setLoading(false);
      return;
    }
    if (
      (user?.profile?.role === 4 || user?.profile?.role === 6) &&
      !values?.CompanyName
    ) {
      setCompanyError("company name is required");
      setLoading(false);
      return;
    }
    const filteredObject = Object.fromEntries(
      Object.entries(values).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );
    AuthService.updateUserProfile(filteredObject)
      .then(({ data }) => {
        setErrors({});
        setLoading(false);
        toast(data?.message, {
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
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setCompanyError("");
  };
  console.log(Errors);

  return (
    <>
      {/* {isloading ? (
        <p>loading ....</p>
      ) : ( */}
      <div className="row m-0">
        <h4 className="text-secondary mb-3">Company Information</h4>
        <hr />
        {(user?.profile?.role === 4 || user?.profile?.role === 6) && (
          <>
            <div className="col-md-4 ">
              <label className="adjustLabel">CompanyName *</label>
              <input
                type="text"
                name="CompanyName"
                value={values.CompanyName || ""}
                onChange={handleChange}
                className="form-control adjustLabel_input shadow-none p-2"
              />
              {companyError && (
                <span className="error_input_text">{companyError}</span>
              )}
            </div>

            <div className="col-md-4 ">
              <label className="adjustLabel">GSTNo </label>
              <input
                type="text"
                name="GSTNo"
                value={values.GSTNo || ""}
                onChange={handleChange}
                className="form-control adjustLabel_input shadow-none p-2"
              />
              {Errors.GSTNo && (
                <span className="error_input_text">{Errors.GSTNo}</span>
              )}
            </div>
          </>
        )}

        <div className="col-md-4 ">
          <label className="adjustLabel">
            {user?.profile?.role === 4 ||
            user?.profile?.role === 6 ||
            user?.profile?.role === 9
              ? "Company Email"
              : "Email"}
          </label>
          <input
            type="text"
            disabled
            name="Email"
            value={values.Email}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
        </div>
      </div>

      <div className="row m-0">
        <h4 className="text-secondary mb-3 mt-5">More Information</h4>
        <hr />

        <div className="col-md-4 ">
          <label className="adjustLabel">
            {user?.profile?.role === 4 ||
            user?.profile?.role === 6 ||
            user?.profile?.role === 9
              ? "Contact Person Name"
              : "First Name"}
          </label>
          <input
            type="text"
            name="FirstName"
            value={values.FirstName}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
        </div>
        <div className="col-md-4 ">
          <label className="adjustLabel">
            {user?.profile?.role === 4 ||
            user?.profile?.role === 6 ||
            user?.profile?.role === 9
              ? "Contact Person No"
              : "Phone No"}
          </label>
          {/* <label className="adjustLabel">Phone No</label> */}
          <input
            type="text"
            name="Phone"
            value={values.Phone}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none  p-2"
          />
          {Errors.Phone && (
            <span className="error_input_text">{Errors.Phone}</span>
          )}
        </div>

        <div className="col-md-4">
          <label className="adjustLabel">Country</label>
          <select
            className="form-select custom-select adjustLabel_input shadow-none"
            aria-label="Default select example"
            value={values.CountryID || ""}
            // onChange={handleChange}
            onChange={(event) => {
              // Call your first function
              handleChange(event);
              // Call your second function
              setValues((prevValues) => ({
                ...prevValues,
                AdharNo: null,
              }));
              setErrors((prevErrors) => ({ ...prevErrors, AdharNo: "" }));
            }}
            name="CountryID"
          >
            <option value={""}></option>
            {countryList?.map((val) => (
              <option value={val?.countryId}>{val?.countryName}</option>
            ))}
          </select>
          {Errors.CountryID && (
            <span className="error_input_text">{Errors.CountryID}</span>
          )}
        </div>

        <div className="col-md-6 ">
          <label className="adjustLabel">
            Address1{" "}
            {(user?.profile?.role === 2 || user?.profile?.role === 4) && "*"}
          </label>
          <textarea
            className="form-control adjustLabel_input shadow-none p-2"
            id="exampleFormControlTextarea1"
            rows="3"
            name="Address1"
            value={values.Address1 || ""}
            onChange={handleChange}
          ></textarea>
          {Errors.Address1 && (
            <span className="error_input_text">{Errors.Address1}</span>
          )}
        </div>
        <div className="col-md-6 ">
          <label className="adjustLabel">Address2</label>
          <textarea
            className="form-control adjustLabel_input shadow-none p-2"
            id="exampleFormControlTextarea1"
            rows="3"
            name="Address2"
            value={values.Address2 || ""}
            onChange={handleChange}
          ></textarea>
        </div>
        {values.CountryID == 1 && (
          <div className="col-md-4 ">
            <label className="adjustLabel">
              State{" "}
              {(user?.profile?.role === 2 || user?.profile?.role === 4) && "*"}
            </label>
            <input
              type="text"
              name="State"
              value={values.State || ""}
              onChange={handleChange}
              className="form-control adjustLabel_input shadow-none p-2"
            />
            {Errors.State && (
              <span className="error_input_text">{Errors.State}</span>
            )}
          </div>
        )}
        <div className="col-md-4 ">
          <label className="adjustLabel">
            City{" "}
            {(user?.profile?.role === 2 || user?.profile?.role === 4) && "*"}
          </label>
          <input
            type="text"
            name="City"
            value={values.City || ""}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
          {Errors.City && (
            <span className="error_input_text">{Errors.City}</span>
          )}
        </div>
        {values.CountryID == 1 ? (
          <div className="col-md-4 ">
            <label className="adjustLabel">
              Zip Code{" "}
              {(user?.profile?.role === 2 || user?.profile?.role === 4) && "*"}
            </label>
            <input
              type="text"
              name="Zip"
              value={values.Zip || ""}
              onChange={handleChange}
              className="form-control adjustLabel_input shadow-none p-2"
            />
            {Errors.Zip && (
              <span className="error_input_text">{Errors.Zip}</span>
            )}
          </div>
        ) : (
          <div className="col-md-4 ">
            <label className="adjustLabel">
              Postal Code{" "}
              {(user?.profile?.role === 2 || user?.profile?.role === 4) && "*"}
            </label>
            <input
              type="text"
              name="Zip"
              value={values.Zip || ""}
              onChange={handleChange}
              className="form-control adjustLabel_input shadow-none p-2"
            />
            {Errors.Zip && (
              <span className="error_input_text">{Errors.Zip}</span>
            )}
          </div>
        )}
        <div className="col-md-12 d-flex justify-content-center my-3">
          <button
            className="login_btn"
            onClick={updateProfileHandeler}
            disabled={loading}
          >
            {loading && (
              <div
                className="spinner-border spinner-border-sm me-3"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            submit
          </button>
        </div>
      </div>

      {/* )} */}
    </>
  );
};

export default MyProfile;
