
import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "../reusableComponent/IconButton";
import { useRouter } from "next/navigation";
import ProductUnitServices from "@/services/ProductUnitServices";
import CountryServices from "@/services/CountryServices";
import toast from "react-hot-toast";
import ConfirmModel from "../reusableComponent/ConfirmModel";
import { MdDelete } from "react-icons/md";

const ListUnits = ({ setState }) => {
    const router = useRouter()
    const [UnitList, setUnitList] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [loader, setLoader] = useState(false);

    const handleDelete = async () => {
        setLoader(true);
        try {
            await ProductUnitServices.unitDelete(selectedId);
            setUnitList((prev) => (Array.isArray(prev) ? prev.filter((ele) => ele.unitCode !== selectedId) : []));
            toast.success("Unit deleted successfully!", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "green",
                    color: "#fff",
                },
            });
        } catch (err) {
            console.log(err);
            toast.error("This data is being used elsewhere and cannot be modified.", {
                icon: "⚠️",
                style: {
                    borderRadius: "10px",
                    background: "#ff4d4f",
                    color: "#fff",
                },
                autoClose: 3000,
            });
        } finally {
            setLoader(false);
            setShowConfirm(false);
        }
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    const deleteHandeler = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const initApi = async () => {
        try {
            const response = await ProductUnitServices.getunit();
            setUnitList(response?.data || []);
        } catch (e) {
            console.log(e);
        }
    };
    const updatestatus = async (id) => {
        try {
            const data = await ProductUnitServices.EditunitStatus(id);
            setUnitList((prevUnits) =>
                prevUnits.map(unit =>
                    unit.unitCode === data?.data?.unit?.unitCode ? { ...unit, ...data?.data?.unit } : unit
                )
            );
        } catch (error) {
            console.log(error)
        };
    };
    // useEffect(() => {
    //     CountryServices.getAllCountry()
    //         .then(({ data }) => {
    //             setCountryList(data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    useEffect(() => {
        initApi();
    }, []);

    const editHandeler = (id) => {
        setState("2");
        router.push(`/admin/addUnits?editId=${id}`);
    };
    return (
        <div className="p-3">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Unit Name</th>
                        <th>Country Code</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                {UnitList?.length > 0 && (
                    <tbody>
                        {UnitList?.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.unitName}</td>
                                    <td>{item?.countryId}</td>
                                    <td className="d-flex justify-content-center">
                                        <IconButton onClick={() => updatestatus(item?.unitCode)}>
                                            {item.status ? (
                                                <IoEye color="green" size={20} />
                                            ) : (
                                                <IoMdEyeOff color="red" size={20} />
                                            )}
                                        </IconButton>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex gap-2 justify-content-center">
                                            <IconButton
                                                onClick={() => deleteHandeler(item.unitCode)}
                                            >
                                                <MdDelete color="red" size={20} />
                                            </IconButton>
                                            <IconButton onClick={() => editHandeler(item?.unitCode)}>
                                                <FaRegEdit color="green" size={20} />
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                )}
            </table>
            <ConfirmModel
                show={showConfirm}
                onConfirm={handleDelete}
                onCancel={handleCancel}
                message="Are you sure you want to delete this item?"
                loading={loader}
            />
        </div>
    );
};

export default ListUnits;
