"use client";
import VehicleMasterServices from "@/services/VehicleMasterServices";
import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    VehicleMasterServices.CustomerOrderToTranspoterList()
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>page</div>;
};

export default page;
