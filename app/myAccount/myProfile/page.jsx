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
      console.log(values)

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
      !values?.Address1 ||
      !values?.City ||
      !values?.Zip
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Address1: !values?.Address1 ? "Address1 is required" : "",
        City: !values?.City ? "City is required" : "",
        // State: !values?.State ? "State is required" : "",
        ["Zip"]: !values?.Zip ? "Zip is required" : "",
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
    let { name, value } = event.target;
    if (name == "CountryID") {
      setSelectedCountry(
        countryList.find((country) => country.countryId == value)?.countryCode
      );
    }
    // if (name == "Phone") {
    //  value =`${phonecode}-${value}`
    // }
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setCompanyError("");
  };



  return (
    <>
      <div className="row m-0">
        <h4 className="text-secondary mb-3">Personal Information</h4>
        <hr />
        <div className="col-md-4 ">
          <label className="adjustLabel"> First Name</label>
          <input
            type="text"
            name="FirstName"
            value={values.FirstName}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
        </div>
        <div className="col-md-4 ">
          <label className="adjustLabel">Last Name</label>
          <input
            type="text"
            name="LastName"
            value={values.LastName || ""}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
          {Errors.LastName && (
            <span className="error_input_text">{Errors.LastName}</span>
          )}
        </div>

        <div className="col-md-4 ">
          <label className="adjustLabel">Email</label>
          <input
            type="text"
            disabled
            name="Email"
            value={values.Email}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
        </div>
        <div className="col-md-4">
          <label className="adjustLabel">Country</label>
          <select
            className="form-select custom-select adjustLabel_input shadow-none"
            aria-label="Default select example"
            value={values.CountryID || ""}
            onChange={(event) => {
              setSelectedState("");
              setSelectedCity("");
              handleChange(event);
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

        <div className="col-md-4 ms-5" style={{ position: "relative" }}>
          <label htmlFor="phone" className="adjustLabel ms-5">
            Phone No
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
        {/* <div className="col-md-4">
          <label className="adjustLabel">Category *</label>
          <select
            className="form-select custom-select adjustLabel_input shadow-none"
            aria-label="Default select example"
            disabled
            value={values.Role}
            // onChange={handleValues}
            name="Role"
          >
            <option value={""}></option>
            {RoleList.map((val) => (
              <option value={val?.RoleId}>{val?.RoleName}</option>
            ))}
          </select>
        </div> */}
      </div>

      <div className="row m-0">
        <h4 className="text-secondary mb-3 mt-5">More Information</h4>
        <hr />
        <div className="col-md-2 ">
          <label className="adjustLabel">Dob</label>
          <input
            type="date"
            name="Dob"
            value={values?.Dob?.substring(0, 10) || ""}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
        </div>

        <div className="col-md-2">
          <label className="adjustLabel">Gender</label>
          <select
            className="form-select custom-select adjustLabel_input shadow-none"
            aria-label="Default select example"
            value={values.Gender || ""}
            onChange={handleChange}
            name="Gender"
          >
            <option value={""}></option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
          </select>
        </div>

        <>
          <div className="col-md-4 ">
            <label className="adjustLabel">
              Adhar Number {values?.CountryID == 1 && "*"}
            </label>
            <input
              type="text"
              name="AdharNo"
              value={values?.AdharNo || ""}
              onChange={handleChange}
              placeholder="XXXX XXXX XXXX"
              maxLength={12} // Allow 12 digits + 3 spaces
              className="form-control adjustLabel_input shadow-none p-2"
            />
            {Errors.AdharNo && (
              <span className="error_input_text">{Errors.AdharNo}</span>
            )}
          </div>
          <div className="col-md-4 ">
            <label className="adjustLabel " style={{ marginLeft: "100px" }}>
              Upload Adhar
            </label>
            <input
              type="file"
              name="IdImage"
              onChange={(e) =>
                setValues((prev) => ({ ...prev, IdImage: e.target.files[0] }))
              }
              className="form-control adjustLabel_input shadow-none p-2"
            />
          </div>
          {values.IdImage && (
            <>
              {typeof values.IdImage === "string" ? (
                <div className="col-md-4 ">
                  <img
                    src={`${Image_URL}/${values.IdImage}`}
                    alt="idImage"
                    style={{
                      width: "60%",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ) : (
                <div className="col-md-4 ">
                  <img
                    src={URL.createObjectURL(values.IdImage)}
                    alt="idImage"
                    style={{
                      width: "60%",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </>
          )}
        </>

        <div className="col-md-6 ">
          <label className="adjustLabel">Address1*</label>
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

        {values.CountryID != 2 && (
          <div className="col-md-4 ">
            <label className="adjustLabel">State *</label>
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

        <div className="col-md-4 ">
          <label className="adjustLabel">Zip Code *</label>
          <input
            type="text"
            name="Zip"
            value={values.Zip || ""}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
          {Errors.Zip && <span className="error_input_text">{Errors.Zip}</span>}
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
