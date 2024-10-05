
import React, { useEffect, useState } from "react";
import "../../app/admin/addProduct/addProduct.css";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import MiniLoader from "../reusableComponent/MiniLoader";
import RoleServices from "@/services/RoleServices";

const EditRole = ({ setState }) => {
    const searchParams = useSearchParams();
    const editId = searchParams.get("editId");
    const [loader, setLoader] = useState(false);
    const [values, setValues] = useState({
        RoleName: "",
        Description: "",
        Status: false,
    });
    const [errors, setErrors] = useState({});

    const onChangeHandeler = (e) => {
        const { value, name } = e.target;
        setValues((pre) => ({ ...pre, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const statusHandeler = (e) => {
        setValues((pre) => ({ ...pre, Status: e.target.checked }));
    };

    const onSubmitHandeler = () => {
        setLoader(true);
        RoleServices.editRole(values, editId)
            .then((data) => {
                setErrors({});
                setLoader(false);
                setValues({
                    RoleName: "",
                    Description: "",
                    Status: false,
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
            RoleServices.getSingeRole(editId).then(({ data }) => {
                console.log(data)
                setValues({
                    RoleName: data.RoleName,
                    Description: data.Description,
                    Status: data.Status,
                });
            }).catch((err) => console.log(err))
        }
    }, [editId]);




    return (
        <div className="row  m-0 p-3">
            <div className="col-md-4 mb-3 ">
                <label className="adjustLabel">Role Name</label>
                <input
                    type="text"
                    className="form-control p-2 adjustLabel_input"
                    name="RoleName"
                    value={values.RoleName}
                    onChange={onChangeHandeler}
                />
                {errors.RoleName && (
                    <span className="error_input_text">{errors.RoleName}</span>
                )}
            </div>
            <div className="col-md-4 mb-3 ">
                <label className="adjustLabel">Description</label>
                <input
                    type="text"
                    className="form-control p-2 adjustLabel_input"
                    name="Description"
                    value={values.Description}
                    onChange={onChangeHandeler}
                />
                {errors.Description && (
                    <span className="error_input_text">{errors.Description}</span>
                )}
            </div>

            <div className="col-md-4 mb-3 d-flex align-items-center mt-3">
                <div className="form-check form-switch ">
                    <input
                        className="form-check-input custom-checkbox"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        size="large"
                        name="Status"
                        checked={values?.Status}
                        onChange={statusHandeler}
                    />
                    <label
                        className="form-check-label ms-3"
                        htmlFor="flexSwitchCheckDefault"
                    >
                        Status for Role
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

export default EditRole;
