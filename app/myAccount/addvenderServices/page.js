"use client";
import React, { useEffect, useState } from "react";
import "../../admin/addProduct/addProduct.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import VehicleServices from "@/services/VehicleServices";
import { useSelector } from "react-redux";
import AuthService from "@/services/AuthServices";
import vendorMasterServices from "@/services/vendorMasterServices";
import CountryServices from "@/services/CountryServices";
import ProductUnitServices from "@/services/ProductUnitServices";

const AddVenderServices = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const [profile, setprofile] = useState([]);
  const [venderList, setVenderList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isloading, setisLoading] = useState(false);
  // vendorId, VendorServicesMasterId, serviceName, description, cost, availableOffers, duration

  const [unitList, setUnitList] = useState([]);
  const [values, setValues] = useState({
    vendorId: "",
    VendorServicesMasterId: "",
    serviceName: "",
    description: "",
    cost: "",
    availableOffers: "",
    duration: "",
    capacity: "",
    capacityUnit: "",
    countryId: user?.profile?.country,
  });
  const onchangeHandeler = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  useEffect(() => {
    if (user?.profile?.id) {
      setisLoading(true);
      setValues((pre) => ({ ...pre, ["vendorId"]: user?.profile?.id }));
      AuthService.getUserProfile(user?.profile?.id).then(({ data }) => {
        setprofile(data?.userProfile);
        setisLoading(false);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmitHandler = async () => {
    setLoader(true);
    try {
      await vendorMasterServices?.addVendorServices(values);
      setErrors({});
      setValues({
        vendorId: "",
        VendorServicesMasterId: "",
        serviceName: "",
        description: "",
        cost: "",
        availableOffers: "",
        duration: "",
      });
      setLoader(false);
      toast("Service added successfully!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "green",
          color: "#fff",
        },
      });
      router.push("/myAccount/listAddedServices");
    } catch (err) {
      const errorData = err?.response?.data?.errors || [];
      const errorObj = errorData.reduce((acc, curr) => {
        acc[curr.path] = curr.msg;
        return acc;
      }, {});
      setErrors(errorObj);
      setLoader(false);
    }
  };

  const initApi = () => {
    vendorMasterServices
      .getAllVendor()
      .then(({ data }) => {
        setVenderList(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => initApi(), []);

  useEffect(() => {
    if(user?.profile?.country)
    {ProductUnitServices.getUnitBycountry(user?.profile?.country)
      .then(({ data }) => {
        console.log(data);
        setUnitList(data);
      })
      .catch((err) => {
        console.log(err);
      });}
  }, [user]);


  return (
    <>
      {isloading ? (
        <div style={{ height: "80vh" }} className="centerAllDiv">
          <MiniLoader />
          Loading...
        </div>
      ) : (
        <>
          {profile?.IsVerified && profile?.isUpdate ? (
            <div className="row  m-0 px-md-3 mb-4">
              <h4 className="text-secondary mb-3">Add Services</h4>
              <hr />
              {/* Form content */}

              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Service Type*</label>
                <select
                  className="form-select custom-select adjustLabel_input"
                  aria-label="Default select example"
                  name="VendorServicesMasterId"
                  value={values.VendorServicesMasterId}
                  onChange={onchangeHandeler}
                >
                  <option value="" className="d-none"></option>
                  {venderList?.map((ele) => (
                    <option
                      key={ele.VendorServicesMasterId}
                      value={ele.VendorServicesMasterId}
                    >
                      {ele?.type}
                    </option>
                  ))}
                </select>
                {errors.VendorServicesMasterId && (
                  <span className="error_input_text">
                    {errors.VendorServicesMasterId}
                  </span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Service Name *</label>
                <input
                  type="text"
                  className="form-control p-2 adjustLabel_input"
                  name="serviceName"
                  value={values.serviceName}
                  onChange={onchangeHandeler}
                />
                {errors.serviceName && (
                  <span className="error_input_text">{errors.serviceName}</span>
                )}
              </div>
              <div className="col-md-4 mb-3 ms-md-0 ms-2 ">
                <label className="adjustLabel">description </label>
                <input
                  type="text"
                  className="form-control p-2 adjustLabel_input"
                  name="description"
                  value={values.description}
                  onChange={onchangeHandeler}
                />
                {errors.description && (
                  <span className="error_input_text">{errors.description}</span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2 ">
                <label className="adjustLabel">Cost *</label>
                <input
                  type="text"
                  className="form-control p-2 adjustLabel_input"
                  name="cost"
                  value={values.cost}
                  onChange={onchangeHandeler}
                />
                {errors.cost && (
                  <span className="error_input_text">{errors.cost}</span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Available Offers</label>
                <input
                  type="number"
                  className="form-control p-2 adjustLabel_input"
                  name="availableOffers"
                  value={values.availableOffers}
                  onChange={onchangeHandeler}
                />
                {errors.availableOffers && (
                  <span className="error_input_text">
                    {errors.availableOffers}
                  </span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Duration</label>
                <input
                  type="number"
                  className="form-control p-2 adjustLabel_input"
                  name="duration"
                  value={values.duration}
                  onChange={onchangeHandeler}
                />
                {errors.duration && (
                  <span className="error_input_text">{errors.duration}</span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Capacity</label>
                <input
                  type="number"
                  className="form-control p-2 adjustLabel_input"
                  name="capacity"
                  value={values.capacity}
                  onChange={onchangeHandeler}
                />
                {errors.capacity && (
                  <span className="error_input_text">{errors.capacity}</span>
                )}
              </div>

              <div className="col-md-4">
                <label className="adjustLabel">capacity Unit</label>
                <select
                  className="form-select custom-select adjustLabel_input shadow-none"
                  aria-label="Default select example"
                  value={values.capacityUnit || ""}
                  onChange={onchangeHandeler}
                  name="capacityUnit"
                >
                  <option value={""}></option>
                  {unitList?.map((val) => (
                    <option value={val?.unitId}>{val?.unitName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 text-center mt-3">
                <button
                  className="login_btn"
                  onClick={onSubmitHandler}
                  disabled={loader}
                >
                  {loader && <MiniLoader />}
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div style={{ height: "80vh" }} className="centerAllDiv">
              <div>
                {!profile?.isUpdate && (
                  <p>
                    Please go first to update your profile to add you services{" "}
                    <span
                      onClick={() => router.push("/myAccount/myProfile")}
                      className="admin_btn cursor"
                    >
                      go
                    </span>
                  </p>
                )}
                {!profile?.IsVerified && profile?.isUpdate && (
                  <p>
                    Please wait for admin verfication, after verfication you can
                    add you services here
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AddVenderServices;
