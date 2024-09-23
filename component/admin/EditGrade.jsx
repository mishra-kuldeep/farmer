// import React from 'react'

// const EditGrade = () => {
//   return (
//     <div>EditGrade</div>
//   )
// }

// export default EditGrade



import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import CategoryServices from "@/services/CategoryServices";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import MiniLoader from "../reusableComponent/MiniLoader";
import ProductUnitServices from "@/services/ProductUnitServices";
import ProductgradeServices from "@/services/ProductgradeServices";

const EditGrade = ({ setState }) => {
    const searchParams = useSearchParams();
    const editId = searchParams.get("editId");
    const [loader, setLoader] = useState(false);
    const [values, setValues] = useState({
        gradeName: "",
        status: false,
    });
    const [errors, setErrors] = useState({});

    const onChangeHandeler = (e) => {
        const { value, name } = e.target;
        setValues((pre) => ({ ...pre, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const statusHandeler = (e) => {
        setValues((pre) => ({ ...pre, status: e.target.checked }));
    };

    const onSubmitHandeler = () => {
        setLoader(true);
        ProductgradeServices.editGrade(values, editId)
            .then((data) => {
                setErrors({});
                setLoader(false);
                setValues({
                    gradeName: "",
                    status: false,
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
            ProductgradeServices.getSingeGrade(editId).then(({ data }) => {
                console.log(data)
                setValues({
                    gradeName: data.gradeName,
                    status: data.status,
                });
            }).catch((err) => console.log(err))
        }
    }, [editId]);




    return (
        <div className="row  m-0 p-3">
            <div className="col-md-4 mb-3 ">
                <label className="adjustLabel">Grade Name</label>
                <input
                    type="text"
                    className="form-control p-2 adjustLabel_input"
                    name="gradeName"
                    value={values.gradeName}
                    onChange={onChangeHandeler}
                />
                {errors.gradeName && (
                    <span className="error_input_text">{errors.gradeName}</span>
                )}
            </div>

            <div className="col-md-4 mb-3 d-flex align-items-center mt-3">
                <div className="form-check form-switch ">
                    <input
                        className="form-check-input custom-checkbox"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        size="large"
                        name="status"
                        checked={values.status}
                        onChange={statusHandeler}
                    />
                    <label
                        className="form-check-label ms-3"
                        htmlFor="flexSwitchCheckDefault"
                    >
                        Status for Grade
                    </label>
                </div>
            </div>
            <div className="col-md-12 mb-3 text-center">
                <button className="login_btn" onClick={onSubmitHandeler} disabled={loader}
                >
                    {loader && <MiniLoader />}
                    Submit
                </button>
            </div>
        </div>
    );
};

export default EditGrade;
