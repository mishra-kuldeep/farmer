

import React, { useEffect, useState } from 'react'
import { BiSolidPurchaseTag } from "react-icons/bi";
import { PiContactlessPaymentBold } from "react-icons/pi";
import { FaTruckFront } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import "../farmerDash/farmerDesh.css"
import ReportsServices from '@/services/ReportServices';
const BuyerSortInfo = () => {
    const [totalProduct, setTotalProduct] = useState(null)
    const [totalPurchase, setTotalPurchase] = useState()
    const [totalRevenue, setTotalRevenue] = useState()
    const [totalTransportation, setTotalTransportation] = useState()


    const TotalPurchaseApiCall = () => {
        ReportsServices.PurchaseHistory()
            .then(({ data }) => {
                setTotalPurchase(data?.data);
                setTotalProduct(data?.data.length);

            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });

    }

    const TransportDetailsApiCall = () => {
        ReportsServices.TransportDetails()
            .then(({ data }) => {
                setTotalTransportation(data?.data);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });
    }
    const TotalRevenueApiCall = () => {
        ReportsServices.farmerTotalRevenue()
            .then(({ data }) => {
                setTotalRevenue(data?.data[0]);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });
    }

    useEffect(() => {
        TotalPurchaseApiCall();
        TransportDetailsApiCall()
        TotalRevenueApiCall()
    }, [])

    const totalPendingPrice = totalPurchase?.filter(item => item.paymentStatus === "Pending") // Filter items with "Pending" paymentStatus
        .reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);

    return (
        <div><main className='main-container '>
            <div className='main-title'>
                <h4 className="text-secondary">DASHBOARD</h4>
            </div>
            <hr />
            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Order</h3>
                        <div className='card_icon'>
                            <FaShoppingCart />
                        </div>
                    </div>
                    <h1>{totalProduct || 0}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Purchase</h3>
                        <div className='card_icon'>
                            <BiSolidPurchaseTag />
                        </div>
                    </div>
                    <h1>{totalPurchase?.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0).toFixed(2) || 0}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Transport</h3>
                        <div className='card_icon'>
                            <FaTruckFront />
                        </div>
                    </div>
                    <h1>{totalTransportation?.reduce((sum, item) => sum + (item?.transportCharge || 0), 0).toFixed(2) || 0}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Pending </h3>
                        <div className='card_icon'>
                            <PiContactlessPaymentBold />
                        </div>
                    </div>
                    <h1>{totalPendingPrice?.toFixed(2) || 0}</h1>
                </div>
            </div>
            <hr />

        </main></div>
    )
}

export default BuyerSortInfo