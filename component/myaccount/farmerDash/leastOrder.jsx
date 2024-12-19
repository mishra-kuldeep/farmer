import React, { useEffect, useState } from 'react'
import ReportsServices from "@/services/ReportServices";
import { useRouter } from 'next/navigation';

const LeastOrder = () => {
    const router = useRouter()
    const [leastOrderlist, setLeastOrderlist] = useState()

    const LeastOrderApiCall = () => {
        const data = {
            page: 1,
            pageSize: 10
        }
        ReportsServices.farmerLeastOrder(data)
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
            <div className="container mt-1">
                <div className='my-2 d-flex justify-content-between '>
                    <h5>Least Order</h5>
                    <h5 className="cursor" onClick={() => router.push('myAccount/orderedProduct')}>Seen More</h5>
                </div>
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
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
                                <td>{item.quantity}</td>
                                <td>{item.priceAtPurchase}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LeastOrder