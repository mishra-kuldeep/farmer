"use client";
import React, { useEffect, useState } from "react";
import AuthService from "@/services/AuthServices";
import { useSelector } from "react-redux";
import { Image_URL } from "@/helper/common";
import { CgKey } from "react-icons/cg";
import toast from "react-hot-toast";
import CountryServices from "@/services/CountryServices";
import RoleServices from "@/services/RoleServices";
import { Country, State, City } from "country-state-city";

const MyProfile = () => {
  const user = useSelector((state) => state.auth);
  const [isloading, setisLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Errors, setErrors] = useState({});
  const [companyError, setCompanyError] = useState("");
  const [RoleList, setRoleList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const activeCountries = ["IN", "US", "GB", "KE"];

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];

  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState)
    : [];
  
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
  const phonecode = countryList?.find(
    (val) => val?.countryId == values?.CountryID
  )?.phoneCode;
  useEffect(() => {
    setisLoading(true);
    CountryServices.getAllCountry()
      .then(({ data }) => {
        setCountryList(data);
        setSelectedCountry(
          data.find((country) => country.countryId == user?.profile?.country)
            ?.countryCode
        );
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
        setSelectedState(data.userProfile.userInfo.State);
        setSelectedCity(data.userProfile.userInfo.City);
      });
    }
  }, [user?.profile?.id]);

  const updateProfileHandeler = () => {
    setLoading(true);
    if (
      !values?.CompanyName ||
      !values?.Address1 ||
      !values?.City ||
      !values?.Zip ||
      !values?.GSTNo
    ) {
      setCompanyError(!values?.CompanyName ?"company name is required":"");
      setErrors((prevErrors) => ({
        ...prevErrors,
        Address1: !values?.Address1 ? "Address1 is required" : "",
        City: !values?.City ? "City is required" : "",
        // State: !values?.State ? "State is required" : "",
        ["Zip"]: !values?.Zip ? "Zip is required" : "",
        GSTNo: !values?.GSTNo ? "GSTNo is required" : "",
      }));
      setLoading(false);
      return;
    }
 values.Phone = `${phonecode}-${values.Phone}`
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
    if (name == "CountryID") {
      setSelectedCountry(
        countryList.find((country) => country.countryId == value)?.countryCode
      );
    }
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setCompanyError("");
  };



  return (
    <>
      <div className="row m-0">
        <h4 className="text-secondary mb-3">Company Information</h4>
        <hr />
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
            <label className="adjustLabel">GSTNo* </label>
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
        <div className="col-md-4 ">
          <label className="adjustLabel">Company Email</label>
          <input
            type="text"
            disabled
            name="Email"
            value={values.Email}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
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
        <div className="col-md-2">
          <label className="adjustLabel">Country</label>
          <select
            className="form-select custom-select adjustLabel_input shadow-none"
            aria-label="Default select example"
            value={values.CountryID || ""}
            onChange={(event) => {
              handleChange(event);
              setSelectedState(""); // Reset state and city when country changes
              setSelectedCity("");
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
        {values.CountryID != 2 && (
          <div className="col-md-4 ">
            <label className="adjustLabel">
              State{" "}
              {(user?.profile?.role === 2 || user?.profile?.role === 4) && "*"}
            </label>
            {/* <input
              type="text"
              name="State"
              value={values.State || ""}
              onChange={handleChange}
              className="form-control adjustLabel_input shadow-none p-2"
            /> */}
            <select
              value={selectedState}
              className="form-select custom-select adjustLabel_input shadow-none"
              name="State"
              onChange={(e) => {
                handleChange(e);
                setSelectedState(e.target.value);
                setSelectedCity(""); // Reset city when state changes
              }}
              disabled={!selectedCountry}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
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
          <select
            value={selectedCity}
            name="City"
            onChange={(e) => {
              setSelectedCity(e.target.value);
              handleChange(e);
            }}
            disabled={values.CountryID == 1 && !selectedState}
            className="form-select custom-select adjustLabel_input shadow-none"
          >
            <option value="">Select City</option>
            {(values.CountryID != 2 ? cities : states).map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          {Errors.City && (
            <span className="error_input_text">{Errors.City}</span>
          )}
        </div>
        {values.CountryID == 1 ? (
          <div className="col-md-2 ">
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
          <div className="col-md-2 ">
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
      </div>

      <div className="row m-0">
        <h4 className="text-secondary mb-3 mt-5">More Information</h4>
        <hr />
        <div className="col-md-4 ">
          <label className="adjustLabel">Contact Person Name</label>
          <input
            type="text"
            name="FirstName"
            value={values.FirstName}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
        </div>
        <div className="col-md-4 ms-5" style={{ position: "relative" }}>
          <label htmlFor="phone" className="adjustLabel ms-5">
            Contact Person No
          </label>
          <input
            type="text"
            id="phone"
            name="Phone"
            value={values.Phone}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none"
            style={{ padding: `9px ${phonecode?.length * 16}px ` }}
          />
          {countryList.length > 0 && (
            <span
              style={{
                position: "absolute",
                left: "3px",
                top: "15px",
                backgroundColor: "#dadada",
                borderRadius: "5px 0px 0px 5px",
              }}
              className="fw-bold text-secondary p-2"
            >
              {phonecode}
            </span>
          )}
        </div>

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
