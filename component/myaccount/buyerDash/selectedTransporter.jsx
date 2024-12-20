import React, { useEffect, useState } from "react";
import ReportsServices from "@/services/ReportServices";
import Link from "next/link";

const SelectedTransporter = () => {
  const [selectedTransporter, setSelectedTransporter] = useState();

  const LeastOrderApiCall = () => {
    ReportsServices.frequentlySelectedTransporter()
      .then(({ data }) => {
        setSelectedTransporter(data?.data);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  };

  useEffect(() => {
    LeastOrderApiCall();
  }, []);

  return (
    <div>
      <div className="container mt-1 border rounded mt-3">
        <div className="mt-4 mb-2 d-flex justify-content-between">
          <h5 className="text-dark">Selected Transporter</h5>
          <Link href="#">Seen More</Link>
        </div>

        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Vehicle Type</th>
              <th>Selected</th>
              <th>Charge</th>
            </tr>
          </thead>
          <tbody>
            {selectedTransporter?.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title={item.productName}
                >
                  {" "}
                  {item?.productName?.length < 16
                    ? item?.transporterName
                    : `${item?.transporterName?.substring(0, 16)}...`}
                </td>
                <td>{item.vehicleName}</td>
                <td>{item.totalTimesVehicleSelected}/time</td>
                <td>{item.ChargePerKM}/KM</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedTransporter;
