import CategoryServices from "@/services/CategoryServices";
import React, { useEffect, useState } from "react";
import "../admin/adminpage.css";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "../reusableComponent/IconButton";
import ConfirmModel from "../reusableComponent/ConfirmModel";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ListProduct = ({setState}) => {
  const router = useRouter()
  const [page, setPage] = useState(1);
  const [searchText,setSearchText] = useState("")
  const [catList, setCatList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const initApi = async () => {
    const catList = await CategoryServices.getProducts(page,searchText);
    setCatList(catList?.data?.data);
    console.log(catList?.data?.data);
  };
  useEffect(() => {
    initApi();
  }, [page,searchText]);
  console.log(searchText)

  const handlePage = (dir) => {
    if (dir == "prev") {
      setPage((pre) => (pre > 1 ? pre - 1 : pre));
    }
    if (dir == "next") {
      setPage((pre) => (catList?.length == 10 ? pre + 1 : pre));
    }
  };
  const handleDelete = async () => {
    await CategoryServices.deleteProduct(selectedId).then((data) => {
      setCatList(catList.filter((ele) => ele.productId !== selectedId));
    setShowConfirm(false);
    toast("product deleted successfully!", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "green",
        color: "#fff",
      },
    });
  });
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };
  const deleteHandeler = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };
  const editHandeler = (id) => {
    setState("2");
    router.push(`/admin/addProduct?editId=${id}`);
  };
  const statusUpdate = (id,status) =>{
    CategoryServices.statusUpdateProduct(id,status).then(({data})=>{
      toast(data.message, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "green",
          color: "#fff",
        },
      });
    })
  }
  return (
    <div className="p-2">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>sr no</th>
            <th>product name</th>
            <th className="text-center">brand name</th>
            <th className="text-center">category name</th>
            <th className="text-center">sub category name</th>
            <th className="text-center">price</th>
            <th className="text-center">discount</th>
            <th className="text-center">status</th>
            <th className="text-center">action</th>
          </tr>
        </thead>
        {catList?.length > 0 && (
          <tbody>
            {catList?.map((item, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{item.productName}</td>
                  <td className="text-center">{item.Brand.brandName}</td>
                  <td className="text-center">{item.Category.categoryName}</td>
                  <td className="text-center">
                    {item.SubCategory.subcategoryName}
                  </td>
                  <td className="text-center">{item.price}</td>
                  <td className="text-center">{item.discount}</td>
                  <td className="d-flex justify-content-center">
                    <IconButton onClick={()=>statusUpdate(item.productId,item.status)}>
                      {item.status ? (
                        <IoEye color="green" />
                      ) : (
                        <IoMdEyeOff color="red" />
                      )}
                    </IconButton>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <IconButton   onClick={() => deleteHandeler(item.productId)}>
                        <MdDelete color="red" />
                      </IconButton>
                      <IconButton onClick={() => editHandeler(item.productId)}>
                        <FaRegEdit color="green" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {catList?.length == 0 && (
        <div
          className=" centerAllDiv fs-5 text-secondary "
          style={{ height: "50vh" }}
        >
          <h6>No Category Found</h6>
        </div>
      )}
       <div className="paginationWrapper">
       <input
        type="search"
        className="form-control categorySearch"
        onChange={(e)=>{setSearchText(e.target.value)
          setPage(1)
        }}
        placeholder="Search for Products ..."
      />
        <h6>page ( {page} )</h6>
        <div
          className={`${page == 1 ? "arrwleftdisable" : "arrwleft"}`}
          onClick={() => handlePage("prev")}
        >
          <IoIosArrowBack color="#fff" size={20} />
        </div>
        <div
          className={`${catList?.length <10 ? "arrwleftdisable" : "arrwleft"}`}
          onClick={() => handlePage("next")}
        >
          <IoIosArrowForward color="#fff" size={20} />
        </div>
      </div>
      <ConfirmModel
        show={showConfirm}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
};

export default ListProduct;
