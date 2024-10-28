"use client";
import React, { useEffect, useState } from "react";
// import "../../admin/addProduct/addProduct.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import VehicleServices from "@/services/VehicleServices";
import vendorMasterServices from "@/services/vendorMasterServices";
import { useSelector } from "react-redux";
import AuthService from "@/services/AuthServices";
import ProductUnitServices from "@/services/ProductUnitServices";
import FertilizersPesticideServices from "@/services/FertilizersPesticideServices";

const editFertilizersPesticides = ({ params }) => {
  const user = useSelector((state) => state.auth);
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [venderList, setVenderList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const [countrySymbol, setCountrySymbol] = useState([]);
  const [values, setValues] = useState({
    vendorId: "",
    VendorServicesMasterId: "",
    serviceName: "",
    DistributorsType:"",
    description: "",
    cost: "",
    availableOffers: "",
    duration: "",
    capacity: "",
    capacityUnit: "",
    countryId: user?.profile?.country,
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

  const onSubmitHandler = async () => {
    setLoader(true);
    try {
      await vendorMasterServices?.UpdateVendorServices(params?.id, values);
      setErrors({});
      setValues({
        vendorId: "",
        VendorServicesMasterId: "",
        serviceName: "",
        description: "",
        DistributorsType:"",
        cost: "",
        availableOffers: "",
        duration: "",
        capacity: "",
        capacityUnit: "",
        countryId: user?.profile?.country,
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

  useEffect(() => {
    if (params?.id) {
      FertilizersPesticideServices
        .getSinglFertilizersPesticide(params?.id)
        .then(({ data }) => {
          console.log(data)
          const valuess = data;
          setValues({
            vendorId: valuess.vendorId,
            VendorServicesMasterId: valuess.VendorServicesMasterId,
            DistributorsType: valuess.DistributorsType,
            serviceName: valuess.serviceName,
            description: valuess.description,
            cost: valuess.cost,
            availableOffers: valuess.availableOffers,
            duration: valuess.duration,
            capacity: valuess.capacity,
            capacityUnit: valuess.capacityUnit,
            countryId: user?.profile?.country,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [params?.id]);
  const initApis = () => {
    vendorMasterServices
      .getAllactiveVendor(false)
      .then(({ data }) => {
        setVenderList(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => initApis(), []);

  useEffect(() => {
    if (user?.profile?.country) {
      AuthService.getCountryList()
        .then(({ data }) => {
          setCountrySymbol(
            data?.find((val) => val?.countryId == user.profile.country)
              ?.currencySymbol
          );
        })
        .catch((err) => {
          console.log(err);
        });
      ProductUnitServices.getUnitBycountry(user?.profile?.country)
        .then(({ data }) => {
          console.log(data);
          setUnitList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);
console.log(venderList)
console.log(values.VendorServicesMasterId)
  return (
    <div className="row  m-0 px-md-3 mb-4">
      <h4 className="text-secondary mb-3">Edit Services</h4>
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
        <label className="adjustLabel">Distributors Type*</label>
        <select
          className="form-select custom-select adjustLabel_input"
          aria-label="Default select example"
          name="DistributorsType"
          value={values.DistributorsType}
          onChange={onchangeHandeler}
        >
          <option value="" className="d-none"></option>
          <option value="1" className="">
            Distributors(Bulk orders)
          </option>
          <option value="2" className="">
            Dealers(Small Orders)
          </option>
          <option value="3" className="">
            Retailer
          </option>
        </select>
        {errors.DistributorsType && (
          <span className="error_input_text">
            {errors.DistributorsType}
          </span>
        )}
      </div>
      <div className="col-md-4 mb-3 ms-md-0 ms-2 ">
        <label className="adjustLabel">Description </label>
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

      <div
        className="col-md-4 mb-3 ms-md-0 ms-2 "
        style={{ position: "relative" }}
      >
        <label className="adjustLabel ms-4">Cost *</label>
        <input
          type="text"
          className="form-control p-2 ps-4 adjustLabel_input"
          name="cost"
          value={values.cost}
          onChange={onchangeHandeler}
        />
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
          {countrySymbol}
        </span>

        {errors.cost && <span className="error_input_text">{errors.cost}</span>}
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
        <label className="adjustLabel">Available Offers</label>
        <input
          type="number"
          className="form-control p-2 adjustLabel_input"
          name="availableOffers"
          value={values.availableOffers}
          onChange={onchangeHandeler}
        />
        {errors.availableOffers && (
          <span className="error_input_text">{errors.availableOffers}</span>
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
  );
};

export default editFertilizersPesticides;
