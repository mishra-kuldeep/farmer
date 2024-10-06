"use client";
import React, { useEffect, useState } from "react";
import AuthService from "@/services/AuthServices";
import { useSelector } from "react-redux";
import { Image_URL } from "@/helper/common";
import { CgKey } from "react-icons/cg";
import toast from "react-hot-toast";

const MyProfile = () => {
  const user = useSelector((state) => state.auth);
  const [isloading, setisLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Errors, setErrors] = useState({});
  const [companyError, setCompanyError] = useState("");
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
          AdharNo: data.userProfile.userInfo.AdharNo,
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
    if (user?.profile?.role === 4 && !values?.CompanyName) {
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

  return (
    <>
      {/* {isloading ? (
        <p>loading ....</p>
      ) : ( */}
      <div className="row m-0">
        <h4 className="text-secondary mb-3">Personal Information</h4>
        <hr />
        <div className="col-md-4 ">
          <label className="adjustLabel">First Name</label>
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
        <div className="col-md-4 ">
          <label className="adjustLabel">Phone No</label>
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
          <label className="adjustLabel">Role *</label>
          <select
            className="form-select custom-select adjustLabel_input shadow-none"
            aria-label="Default select example"
            disabled
            value={values.Role}
            // onChange={handleValues}
            name="Role"
          >
            <option value={""}></option>
            <option value={2}>Farmers</option>
            <option value={3}>Buyers</option>
            <option value={4}>Transportation</option>
            <option value={5}>Employee</option>
            <option value={6}>Vendors</option>
            <option value={7}>Educational Resources</option>
            <option value={8}>Customer Care</option>
          </select>
        </div>
      </div>

      <div className="row m-0">
        <h4 className="text-secondary mb-3 mt-5">More Information</h4>
        <hr />
        <div className="col-md-4 ">
          <label className="adjustLabel">Dob</label>
          <input
            type="date"
            name="Dob"
            value={values?.Dob?.substring(0, 10) || ""}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
        </div>
        <div className="col-md-4">
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
            }}
            name="CountryID"
          >
            <option value={""}></option>
            <option value={1}>India</option>
            <option value={2}>America</option>
          </select>
          {Errors.CountryID && (
            <span className="error_input_text">{Errors.CountryID}</span>
          )}
        </div>
        {values.CountryID == 1 && (
          <>
            <div className="col-md-4 ">
              <label className="adjustLabel">Adhar Number</label>
              <input
                type="text"
                name="AdharNo"
                value={values.AdharNo || ""}
                onChange={handleChange}
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
        )}
        <div className="col-md-6 ">
          <label className="adjustLabel">Address1</label>
          <textarea
            className="form-control adjustLabel_input shadow-none p-2"
            id="exampleFormControlTextarea1"
            rows="3"
            name="Address1"
            value={values.Address1 || ""}
            onChange={handleChange}
          ></textarea>
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

        <div className="col-md-4 ">
          <label className="adjustLabel">State</label>
          <input
            type="text"
            name="State"
            value={values.State || ""}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
        </div>
        <div className="col-md-4 ">
          <label className="adjustLabel">City</label>
          <input
            type="text"
            name="City"
            value={values.City || ""}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
        </div>
        <div className="col-md-4 ">
          <label className="adjustLabel">Zip Code</label>
          <input
            type="text"
            name="Zip"
            value={values.Zip || ""}
            onChange={handleChange}
            className="form-control adjustLabel_input shadow-none p-2"
          />
          {Errors.Zip && <span className="error_input_text">{Errors.Zip}</span>}
        </div>
        {user?.profile?.role === 4 && (
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
              <label className="adjustLabel">GSTNo</label>
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
