
import CategoryServices from "@/services/CategoryServices";
import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "../reusableComponent/IconButton";
import { useRouter } from "next/navigation";
import ProductUnitServices from "@/services/ProductUnitServices";

const ListUnits = ({ setState }) => {
    const router = useRouter()
    const [UnitList, setUnitList] = useState([]);


    const initApi = async () => {
        const UnitList = await ProductUnitServices.getunit();
        setUnitList(UnitList?.data);
    };
    const updatestatus = async (id) => {
        try {
            const data = await ProductUnitServices.EditunitStatus(id);
            setUnitList((prevUnits) => 
                prevUnits.map(unit => 
                  unit.unitId === data?.data?.unit?.unitId ? { ...unit, ...data?.data?.unit } : unit
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
        router.push(`/admin/addUnits?editId=${id}`);
    };
    return (
        <div className="p-3">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Unit Name</th>
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
                                    <td className="d-flex justify-content-center">
                                        <IconButton onClick={() => updatestatus(item?.unitId)}>
                                            {item.status ? (
                                                <IoEye color="green" size={20} />
                                            ) : (
                                                <IoMdEyeOff color="red" size={20} />
                                            )}
                                        </IconButton>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex gap-2 justify-content-center">
                                            <IconButton onClick={() => editHandeler(item?.unitId)}>
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

export default ListUnits;
