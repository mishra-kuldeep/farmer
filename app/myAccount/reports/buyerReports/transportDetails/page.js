
"use client"
import Pagination from '@/component/reusableComponent/Pagination';
import ReportsServices from '@/services/ReportsServices';
import React, { useEffect, useState } from 'react'


const Page = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [metaData, setMetaData] = useState({});
  const [totalTransportation, setTotalTransportation] = useState([]);


  const TotalTransportDetailsApiCall = () => {
    ReportsServices.TransportDetails()
      .then(({ data }) => {
        console.log(data)
        setTotalTransportation(data?.data);
        setMetaData(data?.meta)
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }
  useEffect(() => {
    TotalTransportDetailsApiCall()
  }, [])
  return (
    <div>
      <Pagination
        page={page}
        setPage={setPage}
        searchText={searchText}
        setSearchText={setSearchText}
        List={totalTransportation}
        metaData={metaData}
        searchShow={false}
      />
      <div className="d-flex gap-4 mb-3 ms-3" style={{ marginTop: "-40px" }}>
        <div className="d-flex gap-2">
          <h4 style={{ color: "grey", }}>Total Transportation List</h4>
        </div>
      </div>
      <div className="w-100">
        <div className="w-100 overflow-auto">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>SrNo</th>
                <th>product</th>
                <th className="text-center">Total Quantity</th>
                <th className="text-center">totalDistance</th>
                <th className="text-center">Transpoter Charge</th>
                <th className="text-center">Delivery Status</th>
                <th className="text-center">Payment Status</th>
              </tr>
            </thead>
            {totalTransportation?.length > 0 && (
              <tbody>
                {totalTransportation?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.productName||"N/A"}</td>
                      <td
                        className="text-center"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title={item?.quantity}
                      >
                        {item?.quantity ||"N/A"}
                      </td>
                      <td className="text-center" style={{ backgroundColor: "transparent" }}>
                        {item?.totalDistance ||"N/A"}
                      </td>
                      <td className="text-center">
                      {item?.transportCharge ||"N/A"}
                      </td>
                      <td className="text-center">
                      {item?.deliveryStatus ||"N/A"}
                      </td>
                      <td className="text-center">
                      {item?.paymentStatus ||"N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page