"use client";
import React, { useEffect, useState } from "react";
// import "../../admin/addProduct/addProduct.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MiniLoader from "@/component/reusableComponent/MiniLoader";
import VehicleServices from "@/services/VehicleServices";
import vendorMasterServices from "@/services/vendorMasterServices";

const EditVenderServices = ({ params }) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [venderList, setVenderList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState({
    vendorId: "",
    VendorServicesMasterId: "",
    serviceName: "",
    description: "",
    cost: "",
    availableOffers: "",
    duration: "",
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
        cost: "",
        availableOffers: "",
        duration: "",
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
      vendorMasterServices.getSingleService(params?.id)
        .then(({ data }) => {
    
          const valuess = data[0];
          setValues({
            vendorId: valuess.vendorId,
            VendorServicesMasterId: valuess.VendorServicesMasterId,
            serviceName: valuess.serviceName,
            description: valuess.description,
            cost: valuess.cost,
            availableOffers: valuess.availableOffers,
            duration: valuess.duration,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [params?.id]);
  const initApis = () => {
    vendorMasterServices.getAllVendor()
      .then(({ data }) => {
        setVenderList(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => initApis(), []);

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

export default EditVenderServices;
