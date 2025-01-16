import React, { useEffect, useState } from 'react'
import { FaTruck } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbShoppingCartCheck } from "react-icons/tb";
import "./farmerDesh.css"
import ReportsServices from '@/services/ReportServices';
const Sortinfo = () => {
    const [totalProduct, setTotalProduct] = useState()
    const [totalRevenue, setTotalRevenue] = useState()
    const [totalOrder, setTotalOrder] = useState()
    const [totalDelivered, setTotalDelivered] = useState()

    const ProductApiCall = () => {
        ReportsServices.farmerNoOfProduct()
            .then(({ data }) => {
                setTotalProduct(data.data);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });

    }
    const NoOfOrdersApiCall = () => {
        ReportsServices.farmerNoOfOrders()
            .then(({ data }) => {
                setTotalOrder(data?.data);
                setTotalDelivered(data?.data[0]);
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
        ProductApiCall();
        NoOfOrdersApiCall()
        TotalRevenueApiCall()
    }, [])
    return (
        <div><main className='main-container '>
            <div className='main-title'>
                <h4 className="text-secondary">DASHBOARD</h4>
            </div>
            <hr />
            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Products</h3>
                        <div className='card_icon'>
                            <FaProductHunt />
                        </div>
                    </div>
                    <h1>{totalProduct?.reduce((total, item) =>
                        total + item.verifiedProducts + item.pendingProducts + item.rejectedProducts, 0) || 0}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Order</h3>
                        <div className='card_icon'>
                            <TbShoppingCartCheck />
                        </div>
                    </div>
                    <h1>{totalOrder?.reduce((total, item) => total + item.orderCount, 0) || 0}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Delivered</h3>
                        <div className='card_icon'>
                            <FaTruck />
                        </div>
                    </div>
                    <h1>{totalDelivered?.orderCount || 0}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Revenue</h3>
                        <div className='card_icon'>
                            <FaMoneyBillTrendUp />
                        </div>
                    </div>
                    <h1>{totalRevenue?.TotalRevenue?.toFixed(2)||0}</h1>
                </div>
            </div>
            <hr />

        </main></div>
    )
}

export default Sortinfo