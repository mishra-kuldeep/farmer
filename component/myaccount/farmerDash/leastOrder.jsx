import React, { useEffect, useState } from 'react'
import ReportsServices from "@/services/ReportServices";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
            <div className="container mt-1 border rounded mt-3 ">
                <div className='mt-4 mb-2 d-flex justify-content-between '>
                    <h5 className='text-dark'>Least Order</h5>
                    <Link href="myAccount/orderedProduct">Seen More</Link>
                    {/* <h5 className="cursor" onClick={() => router.push('myAccount/orderedProduct')}>Seen More</h5> */}
                </div>
             <div style={{width:"100%",overflow:"auto"}}>
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
                                <td>{`${item.quantity} ${item?.unitName}`}</td>
                                <td>{item.priceAtPurchase}/{item?.unitName}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
            </div>
        </div>
    )
}

export default LeastOrder