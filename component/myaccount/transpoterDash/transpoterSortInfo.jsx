

import React, { useEffect, useState } from 'react'
import { PiContactlessPaymentBold } from "react-icons/pi";
import { FaTruckFront } from "react-icons/fa6";;
import { GiTakeMyMoney } from "react-icons/gi";
import { FaTruck } from "react-icons/fa";
import "../farmerDash/farmerDesh.css"
import ReportsServices from '@/services/ReportServices';

const TranspoterSortInfo = () => {
    const [totalVehicle, setTotalVehicle] = useState()
    const [totalRevenue, setTotalRevenue] = useState()
    const [totalOrderPickup, setTotalOrderPickup] = useState([])


    const TotalVehicleApiCall = () => {
        ReportsServices.totalVehicle()
            .then(({ data }) => {
                setTotalVehicle(data?.count);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });

    }

    const TotalOrdersApiCall = () => {
        ReportsServices.totalOrders()
            .then(({ data }) => {
                setTotalOrderPickup(data.count);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });
    }
    const TotalRevenuebytranApiCall = () => {
        ReportsServices.totalRevenue()
            .then(({ data }) => {
                setTotalRevenue(data?.count);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });
    }

    useEffect(() => {
        TotalVehicleApiCall();
        TotalOrdersApiCall()
        TotalRevenuebytranApiCall()
    }, [])

    const totalPendingTransportCharge = totalOrderPickup?.filter(item => item?.review === "Pending") // Filter by pending paymentStatus
        .reduce((sum, current) => sum + current?.totalTranportCharge, 0)

    return (
        <div><main className='main-container '>
            <div className='main-title'>
                <h4 className="text-secondary">DASHBOARD</h4>
            </div>
            <hr />
            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Order Pickup</h3>
                        <div className='card_icon'>
                            <FaTruckFront />
                        </div>
                    </div>
                    <h1>{totalOrderPickup?.length || 0}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Vehicle</h3>
                        <div className='card_icon'>
                            <FaTruck />
                        </div>
                    </div>
                    <h1>{totalVehicle || 0}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Revenue</h3>
                        <div className='card_icon'>
                            <GiTakeMyMoney />
                        </div>
                    </div>
                    <h1>{totalRevenue?.reduce((sum, current) => sum + current.totalRevenue, 0).toFixed(2) || 0}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Pending </h3>
                        <div className='card_icon'>
                            <PiContactlessPaymentBold />
                        </div>
                    </div>
                    <h1>{totalPendingTransportCharge.toFixed(2) || 0}</h1>
                </div>
            </div>
            <hr />
        </main>
        </div>
    )
}

export default TranspoterSortInfo