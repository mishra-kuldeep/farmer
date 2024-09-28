
"use client";
import React, { useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import toast from "react-hot-toast";
import MiniLoader from "../reusableComponent/MiniLoader";
import VehicleMasterServices from "@/services/VehicleMasterServices";

const AddVehicle = ({ setState }) => {
    const [values, setValues] = useState({
        type: "",
        capacity: "",
    });

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({});

    const onChangeHandeler = (e) => {
        const { value, name } = e.target;
        setValues((pre) => ({ ...pre, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const onSubmitHandeler = () => {
        setLoader(true);
        VehicleMasterServices.addVehicle(values)
            .then((data) => {
                setErrors({});
                setLoader(false);
                setValues({
                    type: "",
                    capacity: "",
                });
                toast("Vehicle added successfully!", {
                    icon: "👏",
                    style: {
                        borderRadius: "10px",
                        background: "green",
                        color: "#fff",
                    },
                });
                setState("1");
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

    return (
        <div className="row  m-0 p-3">
            <div className="col-md-4 mb-3 ">
                <label className="adjustLabel">Vehicle Type*</label>
                <input
                    type="text"
                    className="form-control p-2 adjustLabel_input"
                    name="type"
                    value={values.type}
                    onChange={onChangeHandeler}
                />
                {errors.type && (
                    <span className="error_input_text">{errors.type}</span>
                )}
            </div>
            <div className="col-md-4 mb-3">
                <label className="adjustLabel">Vehicle Capacity*</label>
                <input
                    type="text"
                    className="form-control p-2 adjustLabel_input"
                    name="capacity"
                    value={values.capacity}
                    onChange={onChangeHandeler}
                />
                {errors.capacity && (
                    <span className="error_input_text">{errors.capacity}</span>
                )}
            </div>
            <div className="col-md-2 mt-3 text-center">
                <button
                    className="login_btn"
                    onClick={onSubmitHandeler}
                    disabled={loader}
                >
                    {loader && <MiniLoader />}
                    Save 
                </button>
            </div>
        </div>
    );
};

export default AddVehicle;

