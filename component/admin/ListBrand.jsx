import CategoryServices from "@/services/CategoryServices";
import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "../reusableComponent/IconButton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ListBrand = ({setState}) => {
  const router = useRouter()
  const [catList, setCatList] = useState([]);
    const [loader, setLoader] = useState(false);
  const initApi = async () => {
    setLoader(true);
    const catList = await CategoryServices.getBrand();
    setCatList(catList?.data?.data);
    setLoader(false);
  };
  useEffect(() => {
    initApi();
  }, []);
  const statusHandeler = (id) => {
    setLoader(true);
    CategoryServices.brandStatus(id)
      .then((data) => {
        const newData = catList.map((item) => {
          if (item.brandCode === id) {
            return { ...item, status: !item.status };
          }
          return item;
        });
        setCatList(newData);
        toast("Status updated successfully!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "green",
            color: "#fff",
          },
        });
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };

  const editHandeler = (id) => {
    setState("2");
    router.push(`/admin/addBrand?editId=${id}`);
  };
  return (
    <div className="p-3">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Brand Name</th>
            <th>Description</th>
            <th className="text-center">Subcategory</th>
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
                  <td>{item.brandName}</td>
                  <td style={{ backgroundColor: "transparent" }}>
                    {item?.description}
                  </td>
                  <td style={{ backgroundColor: "transparent" }}>
                    {item?.SubCategory?.subcategoryName}
                  </td>
                  <td className="d-flex justify-content-center">
                    <IconButton onClick={() => statusHandeler(item.brandCode)} disabled={loader}>
                      {item.status ? (
                        <IoEye color="green" size={20}/>
                      ) : (
                        <IoMdEyeOff color="red" size={20}/>
                      )}
                    </IconButton>
                  </td>
                  <td className="text-center">
                    <div className="d-flex gap-2 justify-content-center">
                      {/* <IconButton>
                        <MdDelete color="red" size={20}/>
                      </IconButton> */}
                      <IconButton onClick={() => editHandeler(item.brandCode)} disabled={loader}>
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

export default ListBrand;
