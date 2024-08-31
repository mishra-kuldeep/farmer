"use client";
import React, { useEffect, useState } from "react";
import AuthService from "@/services/AuthServices";
import { useSelector } from "react-redux";
import { Image_URL } from "@/helper/common";
import { CgKey } from "react-icons/cg";

const myProfile = () => {
  const user = useSelector((state) => state.auth);
  const [isloading, setisLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
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
  });

  useEffect(() => {
    setisLoading(true);
    if (user?.profile?.id) {
      AuthService.getUserProfile(user?.profile?.id).then(({ data }) => {
        setProfileData(data.userProfile);
        setisLoading(false);
        setValues({
          FirstName: data.userProfile.FirstName,
          LastName: data.userProfile.LastName
            ? data.userProfile.LastName
            : null,
          Phone: data.userProfile.Phone,
          Email: data.userProfile.Email,
          Role: data.userProfile.Role,
          CountryID: data.userProfile.userInfo.CountryID,
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
        });
      });
    }
  }, [user?.profile?.id]);
  console.log(values);

  const updateProfileHandeler = () => {
    const filteredObject = Object.fromEntries(
      Object.entries(values).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );
    console.log(filteredObject);
    AuthService.updateUserProfile(filteredObject)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  console.log(values.IdImage)
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
            </div>
            <div className="col-md-4 ">
              <label className="adjustLabel " style={{ marginLeft: "100px" }}>
                upload Adhar
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
            {values.IdImage ? (
              <div className="col-md-4 ">
                <img
                  src={`${Image_URL}${values.IdImage}`}
                  alt="idImage"
                  style={{ width: "60%", height: "100px", objectFit: "cover" }}
                />
              </div>
            ) : (
              <div className="col-md-4 ">
                <img
                  src={URL.createObjectURL(values.IdImage)}
                  alt="idImage"
                  style={{ width: "60%", height: "100px", objectFit: "cover" }}
                />
              </div>
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
        </div>
      </div>
      <button onClick={updateProfileHandeler}>submit</button>
      {/* )} */}
    </>
  );
};

export default myProfile;
