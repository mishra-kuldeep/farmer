
import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "../reusableComponent/IconButton";
import { useRouter } from "next/navigation";
import VehicleMasterServices from "@/services/VehicleMasterServices";

const ListVehicle = ({setState}) => {
  const router = useRouter()
  const [catList, setCatList] = useState([]);
  
  const initApi = async () => {
    const VehicleList = await VehicleMasterServices.getVehicle();
    console.log(VehicleList)
    setCatList(VehicleList?.data);
  };

  useEffect(() => {
    initApi();
  }, []);

  const editHandeler = (id) => {
    setState("2");
    router.push(`/admin/addVehicle?editId=${id}`);
  };
  return (
    <div className="p-3">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Vehicle type</th>
            <th>Vehicle Capacity In Ton</th>
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
                  <td>{item.type}</td>
                  <td style={{ backgroundColor: "transparent" }}>
                    {item?.capacity}
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
                    <div className="d-flex gap-2 justify-content-center">
                      {/* <IconButton>
                        <MdDelete color="red" size={20}/>
                      </IconButton> */}
                      <IconButton onClick={() => editHandeler(item?.vehicleId)}>
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

export default ListVehicle;

