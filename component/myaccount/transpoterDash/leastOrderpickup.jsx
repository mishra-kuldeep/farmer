import React, { useEffect, useState } from 'react'
import ReportsServices from "@/services/ReportServices";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const LeastOrderpickup = () => {
    const [leastOrderlist, setLeastOrderlist] = useState()
    const router = useRouter()

    function formatDateToDDMMYYYY(isoDate) {
        const date = new Date(isoDate);

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getUTCFullYear();

        return `${day}-${month}-${year}`;
    }
    
    const LeastOrderApiCall = () => {
        ReportsServices.latestPickupOrder()
            .then(({ data }) => {
                setLeastOrderlist(data?.data);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });
    }

    useEffect(() => {
        LeastOrderApiCall()
    }, [])

    return (
        <div>
            <div className="container mt-1 border rounded mt-3">
                <div className='mt-4 mb-2 d-flex justify-content-between '>
                    <h5 className="text-dark">Latest Order Pickup</h5>
                    <Link href="myAccount/customerOrder">Seen More</Link>
                </div>
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Vehicle</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leastOrderlist?.map((item, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td
                                    style={{ cursor: "pointer" }}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="bottom"
                                    title={item.productName}
                                > {item?.productName?.length < 16
                                    ? item?.productName
                                    : `${item?.productName.substring(0, 16)}...`}</td>
                                <td>{item.quantity}{"-"}{item.unit}</td>
                                <td>{item.vehicleName}</td>
                                <td>{formatDateToDDMMYYYY(item?.updatedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LeastOrderpickup