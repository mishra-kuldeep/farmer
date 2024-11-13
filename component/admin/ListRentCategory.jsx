import CategoryServices from "@/services/CategoryServices";
import React, { useEffect, useState } from "react";
import "../admin/adminpage.css";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import IconButton from "../reusableComponent/IconButton";
import ConfirmModel from "../reusableComponent/ConfirmModel";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import RentServices from "@/services/RentService";
import MediumLoader from "../reusableComponent/MediumLoader";
import MiniLoader from "../reusableComponent/MiniLoader";

const ListRentCategory = ({ setState }) => {
    const router = useRouter();
    const [catList, setCatList] = useState([]);
    const [page, setPage] = useState(1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [loader, setLoader] = useState(false);
    const [IsLoader, setIsLoader] = useState(false);

    const handleDelete = async () => {
        setLoader(true)
        await CategoryServices.deleteCategory(selectedId).then((data) => {
            setCatList(catList.filter((ele) => ele.rentCategoryId !== selectedId));
        });
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
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };
    const initApi = async () => {
        setIsLoader(true)
        const { data } = await RentServices.getRentCategory(page);
        setIsLoader(false)
        setCatList(data);
    };
    useEffect(() => {
        initApi();
    }, [page]);

    const handlePage = (dir) => {
        if (dir == "prev") {
            setPage((pre) => (pre > 1 ? pre - 1 : pre));
        }
        if (dir == "next") {
            setPage((pre) => (catList?.length == 10 ? pre + 1 : pre));
        }
    };

    const deleteHandeler = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };
    const editHandeler = (id) => {
        setSelectedId(id);
        setState("2");
        router.push(`/admin/addrentCategory?editId=${id}`);
    };

    return (
        <div className="p-2 ">
            {IsLoader ?
                <div className="text-center"><MiniLoader /> </div>
                :
                <table className="table table-striped table-bordered ">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>Other Fields</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    {catList?.length > 0 && (
                        <tbody>
                            {catList?.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{Object.keys(JSON.parse(item?.otherDetails)).map((val) => val) + ", "}</td>
                                        <td className="d-flex justify-content-center">
                                            <IconButton>
                                                {item.status ? (
                                                    <IoEye color="green" size={20} />
                                                ) : (
                                                    <IoMdEyeOff color="red" size={20} />
                                                )}
                                            </IconButton>
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                {/* <IconButton
                        onClick={() => deleteHandeler(item.categoryId)}
                      >
                        <MdDelete color="red" size={20} />
                      </IconButton> */}
                                                <IconButton onClick={() => editHandeler(item.rentCategoryId)}>
                                                    <FaRegEdit color="green" size={20} />
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>}
            {catList?.length == 0 && (
                <div
                    className=" centerAllDiv fs-5 text-secondary "
                    style={{ height: "50vh" }}
                >
                    <h6>No Category Found</h6>
                </div>
            )}
            <div className="paginationWrapper">
                <h6>page ( {page} )</h6>
                <div
                    className={`${page == 1 ? "arrwleftdisable" : "arrwleft"}`}
                    onClick={() => handlePage("prev")}
                >
                    <IoIosArrowBack color="#fff" size={20} />
                </div>
                <div
                    className={`${catList?.length < 10 ? "arrwleftdisable" : "arrwleft"}`}
                    onClick={() => handlePage("next")}
                >
                    <IoIosArrowForward color="#fff" size={20} />
                </div>
            </div>
            <ConfirmModel
                show={showConfirm}
                onConfirm={handleDelete}
                onCancel={handleCancel}
                message="Are you sure you want to delete this category?"
                loading={loader}
            />
        </div>
    );
};

export default ListRentCategory;
