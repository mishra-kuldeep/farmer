
"use client"
import React, { useEffect, useState } from 'react'
import Pagination from '@/component/reusableComponent/Pagination';
import ReportsServices from '@/services/ReportServices.jsx';

const Page = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [metaData, setMetaData] = useState({});
  const [totalPurchase, setTotalPurchase] = useState([]);

  const TotalPurchaseHistoryApiCall = () => {
     const filter = "Paid"
    ReportsServices.PurchaseHistory(filter)
      .then(({ data }) => {
        setTotalPurchase(data?.data);
        setMetaData(data?.meta)
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }
  useEffect(() => {
    TotalPurchaseHistoryApiCall()
  }, [])
  return (
    <div>
      <Pagination
        page={page}
        setPage={setPage}
        searchText={searchText}
        setSearchText={setSearchText}
        List={totalPurchase}
        metaData={metaData}
        searchShow={false}
      />
      <div className="d-flex gap-4 mb-3 ms-3" style={{ marginTop: "-40px" }}>
        <div className="d-flex gap-2">
          <h4 style={{ color: "grey", }}>Total Product Purchase</h4>
        </div>
      </div>
      <div className="w-100">
        <div className="w-100 overflow-auto">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>SrNo</th>
                <th>Product</th>
                <th className="text-center">Total Quantity</th>
                <th className="text-center">Product Purchase price </th>
                <th className="text-center">Transpoter Charge</th>
                <th className="text-center">Delivery Status</th>
                <th className="text-center">Payment Status</th>
              </tr>
            </thead>
            {totalPurchase?.length > 0 && (
              <tbody>
                {totalPurchase?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.productDtlName}</td>
                      <td
                        className="text-center"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title={item?.quantity}
                      >
                        {item?.quantity}{"-"}{item.unitName}
                      </td>
                      <td className="text-center" style={{ backgroundColor: "transparent" }}>
                        {item?.priceAtPurchase}{"/"}{item.unitName}
                      </td>
                      <td className="text-center">
                      {item?.chargePerKm} per km
                      </td>
                      <td className="text-center">
                      {item?.deliveryStatus}
                      </td>
                      <td className="text-center">
                      {item?.paymentStatus}
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