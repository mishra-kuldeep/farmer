import CategoryServices from "@/services/CategoryServices";
import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "../reusableComponent/IconButton";
import { useRouter } from "next/navigation";

const ListSubCategory = ({setState}) => {
  const router = useRouter()
  const [catList, setCatList] = useState([]);
  const initApi = async () => {
    const catList = await CategoryServices.getSubCategory();
    setCatList(catList?.data?.data);
  };
  useEffect(() => {
    initApi();
  }, []);

  const editHandeler = (id) => {
    setState("2");
    router.push(`/admin/addSubCategory?editId=${id}`);
  };
  return (
    <div className="p-3">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Subcategory Name</th>
            <th>Description</th>
            <th className="text-center">Category</th>
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
                  <td>{item.subcategoryName}</td>
                  <td>
                    {item?.description}
                  </td>
                  <td>
                    {item?.Category?.categoryName}
                  </td>
                  <td className="d-flex justify-content-center">
                    <IconButton>
                      {item.status ? (
                        <IoEye color="green" size={20}/>
                      ) : (
                        <IoMdEyeOff color="red" size={20}/>
                      )}
                    </IconButton>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <IconButton onClick={() => editHandeler(item.subcategoryId)}>
                        <FaRegEdit color="green" size={20}/>
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

export default ListSubCategory;
