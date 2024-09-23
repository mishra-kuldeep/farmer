
import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "../reusableComponent/IconButton";
import { useRouter } from "next/navigation";
import ProductgradeServices from "@/services/ProductgradeServices";

const ListGrade = ({ setState }) => {
    const router = useRouter()
    const [GradeList, setGradeList] = useState([]);


    const initApi = async () => {
        const UnitList = await ProductgradeServices.getGrade();
        setGradeList(UnitList?.data);
    };
    const updatestatus = async (id) => {
        try {
            const data = await ProductgradeServices.EditgradStatus(id);
            console.log(data)
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
        </div>
    );
};

export default ListGrade;
