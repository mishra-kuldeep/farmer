
import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "../reusableComponent/IconButton";
import { useRouter } from "next/navigation";
import ProductgradeServices from "@/services/ProductgradeServices";
import ConfirmModel from "../reusableComponent/ConfirmModel";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const ListGrade = ({ setState }) => {
    const router = useRouter()
    const [GradeList, setGradeList] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [loader, setLoader] = useState(false);

    const handleDelete = async () => {
        setLoader(true)
        await ProductgradeServices.deleteGrade(selectedId).then((data) => {
            setGradeList(GradeList.filter((ele) => ele.gradeId !== selectedId));
            setShowConfirm(false);
            setLoader(false)
            toast("category deleted successfully!", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "green",
                    color: "#fff",
                },
            });
        }).catch((err) => {
            console.log(err)
            setShowConfirm(false);
            setLoader(false)
            toast.error("This data is being used elsewhere and cannot be modified.", {
                icon: "⚠️",
                style: {
                    borderRadius: "10px",
                    background: "#ff4d4f",
                    color: "#fff",
                },
                autoClose: 500,
            });
        });
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };


    const initApi = async () => {
        const UnitList = await ProductgradeServices.getGrade();
        setGradeList(UnitList?.data);
    };
    const updatestatus = async (id) => {
        try {
            const data = await ProductgradeServices.EditgradStatus(id);
            setGradeList((prevUnits) =>
                prevUnits.map(Grad =>
                    Grad.gradeId === data?.data?.grade?.gradeId ? { ...Grad, ...data?.data?.grade } : Grad
                )
            );
        } catch (error) {
            console.log(error)
        }
        ;
    };

    useEffect(() => {
        initApi();
    }, []);

    const editHandeler = (id) => {
        setState("2");
        router.push(`/admin/addGrade?editId=${id}`);
    };
    const deleteHandeler = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };
    return (
        <div className="p-3">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Grade Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                {GradeList?.length > 0 && (
                    <tbody>
                        {GradeList?.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.gradeName}</td>
                                    <td className="d-flex justify-content-center">
                                        <IconButton onClick={() => updatestatus(item?.gradeId)}>
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
                                                onClick={() => deleteHandeler(item.gradeId)}
                                            >
                                                <MdDelete color="red" size={20} />
                                            </IconButton>
                                            <IconButton onClick={() => editHandeler(item?.gradeId)}>
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

export default ListGrade;
