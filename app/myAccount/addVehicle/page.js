"use client";
import React, { useEffect, useState } from "react";
import "../../admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import ProductUnitServices from "@/services/ProductUnitServices";
import ProductgradeServices from "@/services/ProductgradeServices";
import VehicleServices from "@/services/VehicleServices";
import { useSelector } from "react-redux";
import AuthService from "@/services/AuthServices";

const AddProductDtl = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const [profile, setprofile] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isloading, setisLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [values, setValues] = useState({
    vehicleId: "",
    vehicleNumber: "",
    chargePerKm: "",
    availableOffers: "",
    minDeliveryDistance: null,
    maxDeliveryDistance: null,
    vehicleAvailabilityStatus: "Available",
    driverName: "",
    driverContact: "",
    estimatedDeliveryTime: null,
    notes: "",
  });
  const onchangeHandeler = (e) => {
    const { name, files } = e.target;
    if (name == "vehicleNumber") {
      const capitalizedValue = e.target.value.toUpperCase();
      setValues({ ...values, vehicleNumber: capitalizedValue });
      return;
    }
    setValues((pre) => ({ ...pre, [name]: e.target.value }));
    setErrors({});
  };

  const onImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setImages((prevImages) => [...prevImages, ...files]);
  };
  useEffect(() => {
    if (user?.profile?.UserCode) {
      setisLoading(true);
      AuthService.getUserProfile(user?.profile?.UserCode).then(({ data }) => {
        setprofile(data?.userProfile);
        setisLoading(false);
      });
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmitHandler = async () => {
    setLoader(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    images?.forEach((image, index) => {
      formData.append(`adImages`, image);
    });
    try {
      await VehicleServices?.addTranspoterVehicle(formData);
      setErrors({});
      setValues({
        vehicleId: "",
        vehicleNumber: "",
        chargePerKm: "",
        availableOffers: "",
        minDeliveryDistance: null,
        maxDeliveryDistance: null,
        vehicleAvailabilityStatus: "",
        driverName: "",
        driverContact: "",
        estimatedDeliveryTime: null,
        notes: "",
      });
      setLoader(false);
      toast("Vehicle added successfully!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "green",
          color: "#fff",
        },
      });
      router.push("/myAccount/vehicleList");
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
    VehicleServices.getVehicleType()
      .then(({ data }) => {
        setVehicleList(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => initApi(), []);

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
              <h4 className="text-secondary mb-3">Add Vehicle</h4>
              <hr />
              {/* Form content */}

              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Vehicle*</label>
                <select
                  className="form-select custom-select adjustLabel_input"
                  aria-label="Default select example"
                  name="vehicleId"
                  value={values.vehicleId}
                  onChange={onchangeHandeler}
                >
                  <option value="" className="d-none"></option>
                  {vehicleList?.map((ele) => (
                    <option key={ele.vehicleId} value={ele.vehicleId}>
                      {ele?.type}---Capacity:{ele?.capacity}:Ton
                    </option>
                  ))}
                </select>
                {errors.vehicleId && (
                  <span className="error_input_text">{errors.vehicleId}</span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Vehicle Number *</label>
                <input
                  type="text"
                  className="form-control p-2 adjustLabel_input"
                  name="vehicleNumber"
                  value={values.vehicleNumber}
                  onChange={onchangeHandeler}
                />
                {errors.vehicleNumber && (
                  <span className="error_input_text">
                    {errors.vehicleNumber}
                  </span>
                )}
              </div>
              <div className="col-md-4 mb-3 ms-md-0 ms-2 ">
                <label className="adjustLabel">Charge Per Km *</label>
                <input
                  type="number"
                  className="form-control p-2 adjustLabel_input"
                  name="chargePerKm"
                  value={values.chargePerKm}
                  onChange={onchangeHandeler}
                />
                {errors.chargePerKm && (
                  <span className="error_input_text">{errors.chargePerKm}</span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2 ">
                <label className="adjustLabel">Available Offers </label>
                <input
                  type="text"
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
                <label className="adjustLabel">Min Delivery Distance</label>
                <input
                  type="number"
                  className="form-control p-2 adjustLabel_input"
                  name="minDeliveryDistance"
                  value={values.minDeliveryDistance}
                  onChange={onchangeHandeler}
                />
                {errors.minDeliveryDistance && (
                  <span className="error_input_text">
                    {errors.minDeliveryDistance}
                  </span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Max Delivery Distance</label>
                <input
                  type="number"
                  className="form-control p-2 adjustLabel_input"
                  name="maxDeliveryDistance"
                  value={values.maxDeliveryDistance}
                  onChange={onchangeHandeler}
                />
                {errors.maxDeliveryDistance && (
                  <span className="error_input_text">
                    {errors.maxDeliveryDistance}
                  </span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">
                  Vehicle Availability Status
                </label>
                <select
                  className="form-select custom-select adjustLabel_input"
                  aria-label="Default select example"
                  name="vehicleAvailabilityStatus"
                  value={values.vehicleAvailabilityStatus}
                  onChange={onchangeHandeler}
                >
                  <option value="" className="d-none"></option>
                  <option value={"Available"}>Available</option>
                  <option value={"Unavailable"}>Unavailable</option>
                </select>
                {errors.vehicleAvailabilityStatus && (
                  <span className="error_input_text">
                    {errors.vehicleAvailabilityStatus}
                  </span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Driver Name *</label>
                <input
                  type="text"
                  className="form-control p-2 adjustLabel_input"
                  name="driverName"
                  value={values.driverName}
                  onChange={onchangeHandeler}
                />
                {errors.driverName && (
                  <span className="error_input_text">{errors.driverName}</span>
                )}
              </div>

              <div className="col-md-4 mb-3 ms-md-0 ms-2">
                <label className="adjustLabel">Driver Contact*</label>
                <input
                  type="number"
                  className="form-control p-2 adjustLabel_input"
                  name="driverContact"
                  value={values.driverContact}
                  onChange={onchangeHandeler}
                />
                {errors.driverContact && (
                  <span className="error_input_text">
                    {errors.driverContact}
                  </span>
                )}
              </div>
              <div className="col-md-4">
              <label className="adjustLabel " style={{ marginLeft: "100px" }}>
                  Upload Vehicle Images
                </label>
                <input
                  type="file"
                  className="form-control p-2 adjustLabel_input"
                  name="Product"
                  multiple
                  onChange={onImageChange}
                />
                {images?.length > 0 && (
                  <p>{images?.length} image(s) selected</p>
                )}
              </div>
              <div className="col-md-6 ms-md-0 ms-2">
                <label className="adjustLabel">Notes</label>
                <textarea
                  type="text"
                  className="form-control p-2 adjustLabel_input"
                  name="notes"
                  value={values.notes}
                  onChange={onchangeHandeler}
                />
              </div>
              {/* <div className="col-md-2 my-3 d-flex align-items-center justify-content-center">
              <div className="form-check">
                  <input
                      className="form-check-input custom-checkbox cursor"
                      type="checkbox"
                      value={values.available}
                      checked={values.available}
                      id="defaultCheck1"
                      onClick={() =>
                          setValues((prev) => ({ ...prev, available: !prev.available }))
                      }
                      readOnly
                  />
                  <label
                      className="form-check-label ms-2 cursor"
                      htmlFor="defaultCheck1"
                      onClick={() =>
                          setValues((prev) => ({ ...prev, available: !prev.available }))
                      }
                  >
                      Available
                  </label>
              </div>
          </div> */}
          
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
                    Please go first to update your profile to add you vehicle{" "}
                    <span onClick={() => router.push("/myAccount/myProfile")} className="admin_btn cursor">
                      go
                    </span>
                  </p>
                )}
                {(!profile?.IsVerified&&profile?.isUpdate) && (
                  <p>
                    Please wait for admin verfication, after verfication you can add you vehicle here
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

export default AddProductDtl;
