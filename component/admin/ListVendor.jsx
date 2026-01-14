
import React, { useEffect, useState } from "react";
import "../admin/adminpage.css";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "../reusableComponent/IconButton";
import ConfirmModel from "../reusableComponent/ConfirmModel";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import vendorMasterServices from "@/services/vendorMasterServices";

const ListVendor = ({ setState }) => {
  const router = useRouter();
  const [VendorList, setVendorList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const initApi = async () => {
    const vendor_List = await vendorMasterServices.getAllVendor();
    setVendorList(vendor_List?.data);
  };
  useEffect(() => {
    initApi();
  }, []);

  const handleDelete = async () => {
    await vendorMasterServices.deleteVendor(selectedId).then((data) => {
      setVendorList(
        VendorList.filter((ele) => ele.vendorServiceCode !== selectedId)
      );
      setShowConfirm(false);
      toast("vendor deleted successfully!", {
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
    router.push(`/admin/addVendor?editId=${id}`);
  };
  const statusUpdate = (id) => {
    vendorMasterServices.EditStatus(id).then(({ data }) => {
      setVendorList((prev) =>
        prev.map((prev) =>
          prev.vendorServiceCode === data?.vendor?.vendorServiceCode
            ? { ...prev, ...data?.vendor }
            : prev
        )
      );
      toast(data.message, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "green",
          color: "#fff",
        },
      });
    });
  };
  return (
    <>
      <div className="p-2">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Type </th>
              <th className="text-center">Description</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          {VendorList?.length > 0 && (
            <tbody>
              {VendorList?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item?.type}</td>
                    <td className="text-center">{item?.description}</td>
                    <td className="d-flex justify-content-center">
                      <IconButton
                        onClick={() =>
                          statusUpdate(item.vendorServiceCode, item.status)
                        }
                      >
                        {item.status ? (
                          <IoEye color="green" />
                        ) : (
                          <IoMdEyeOff color="red" />
                        )}
                      </IconButton>
                    </td>
                    <td>
                      <div className="d-flex gap-2 justify-content-center">
                        <IconButton
                          onClick={() =>
                            deleteHandeler(item.vendorServiceCode)
                          }
                        >
                          <MdDelete color="red" />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            editHandeler(item.vendorServiceCode)
                          }
                        >
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
        <ConfirmModel
          show={showConfirm}
          onConfirm={handleDelete}
          onCancel={handleCancel}
          message="Are you sure you want to delete this item?"
        />
      </div>
    </>
  );
};

export default ListVendor;
