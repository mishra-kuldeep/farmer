

import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import MiniLoader from "../reusableComponent/MiniLoader";
import ProductgradeServices from "@/services/ProductgradeServices";
import VehicleMasterServices from "@/services/VehicleMasterServices";

const EditVehicle = ({ setState }) => {
    const searchParams = useSearchParams();
    const editId = searchParams.get("editId");
    const [loader, setLoader] = useState(false);
    const [values, setValues] = useState({
        type: "",
        capacity: "",
    });
    const [errors, setErrors] = useState({});

    const onChangeHandeler = (e) => {
        const { value, name } = e.target;
        setValues((pre) => ({ ...pre, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const onSubmitHandeler = () => {
        setLoader(true);
        ProductgradeServices.editGrade(values, editId)
            .then((data) => {
                setErrors({});
                setLoader(false);
                setValues({
                    type: "",
                    capacity: "",
                });
                setState("1")
                toast("Grade edit successfully!", {
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
                setLoader(false);
            });
    };

    useEffect(() => {
        if (editId) {
            VehicleMasterServices.SingleVehicle(editId).then(({ data }) => {
                setValues({
                    type: data?.type,
                    capacity: data?.capacity,
                });
            }).catch((err) => console.log(err))
        }
    }, [editId]);




    return (
        <div className="row  m-0 p-3">
            <div className="col-md-4 mb-3 ">
                <label className="adjustLabel">Vehicle type</label>
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
            <div className="col-md-4 mb-3 ">
                <label className="adjustLabel">Vehicle capacity</label>
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
                <button className="login_btn" onClick={onSubmitHandeler} disabled={loader}
                >
                    {loader && <MiniLoader />}
                    Submit
                </button>
            </div>
        </div>
    );
};

export default EditVehicle;
