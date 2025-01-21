import React, { useEffect, useState } from "react";
import "./sortinfodash.css";
import { FaUsers } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { FaHeadset } from "react-icons/fa6";
import AdminDashboardServices from "@/services/AdminDashboardServices";

const SortinfoDash = ({ dateRange }) => {
    const [totalUser, setTotalUser] = useState([]);
    const [totalOrder, setTotalOrder] = useState([]);
    const [totalAds, setTotalAds] = useState([]);

    const userApiCall = async () => {
        AdminDashboardServices.getTotaluser(dateRange).then((res) => {
            setTotalUser(res.data);

        }).catch((err) => {
            console.log(err)
        })
    }

    const OrderApiCall = async () => {
        AdminDashboardServices.getTotalOrders(dateRange).then((res) => {
            setTotalOrder(res.data);
        }).catch((err) => {
            console.log(err)
        })
    }
    const adsApiCall = async () => {
        AdminDashboardServices.getTotalAds(dateRange).then((res) => {
            console.log(res);
            setTotalAds(res.data);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (dateRange?.fromDate && dateRange?.toDate) {
            userApiCall();
            OrderApiCall();
            adsApiCall();
        };
    }, [dateRange])



    return (
        <>
            <hr className="text-secondary" />
            <div className="row mt-3">
                <div className="col-md-3">
                    <div className="dahAdmimcard">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="text-secondary">User</h3>
                            <div className="iconswrapadmin">
                                <FaUsers size={30} color="#fff" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75">Farmer </h6>
                                <h6 className="text-dark w-25"> : {totalUser?.find(role => role?.roleName == "Farmers")?.totalUsers}</h6>
                            </div>
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75">Buyers </h6>
                                <h6 className="text-dark w-25"> : {totalUser?.find(role => role?.roleName == "Buyers")?.totalUsers}</h6>
                            </div>
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75">Transporters </h6>
                                <h6 className="text-dark w-25"> : {totalUser?.find(role => role?.roleName == "Transportation")?.totalUsers}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dahAdmimcard">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="text-secondary">Orders</h3>
                            <div className="iconswrapadmin">
                                <IoBagHandleSharp size={30} color="#fff" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75">Total Orders </h6>
                                <h6 className="text-dark w-25"> : {totalOrder?.totalOrders}</h6>
                            </div>
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75">Total Amounts </h6>
                                <h6 className="text-dark w-25"> : {totalOrder?.totalAmount}</h6>
                            </div>
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75">Avg Orders Values </h6>
                                <h6 className="text-dark w-25"> : {totalOrder?.avgOrderValue?.toFixed(2)}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dahAdmimcard">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="text-secondary">Ads</h3>
                            <div className="iconswrapadmin">
                                <FaHeadset size={30} color="#fff" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75">Advertisments </h6>
                                <h6 className="text-dark w-25"> : {totalAds?.totalRentOrSaleProducts}</h6>
                            </div>
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75">For Rent  </h6>
                                <h6 className="text-dark w-25"> : {totalAds?.totalRentProducts}</h6>
                            </div>
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75"> For Sale</h6>
                                <h6 className="text-dark w-25"> : {totalAds?.totalSaleProducts}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dahAdmimcard">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="text-secondary">Venders</h3>
                            <div className="iconswrapadmin">
                                <FaHeadset size={30} color="#fff" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75">Total VenderServices </h6>
                                <h6 className="text-dark w-25"> : 1000</h6>
                            </div>
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75">cold storage </h6>
                                <h6 className="text-dark w-25"> : 200</h6>
                            </div>
                            <div className="d-flex justify-content-between mb-2 w-100">
                                <h6 className="text-secondary w-75">cold storage </h6>
                                <h6 className="text-dark w-25"> : 2000</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="text-secondary" />
        </>
    );
};

export default SortinfoDash;
