
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

export default class ReportsServices {

    static async farmerNoOfProduct() {
        const token = getCookie("token");
        const url = `${BASE_URL}/report/farmer/noOfProduct`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }  
    static async farmerTotalRevenue() {
        const token = getCookie("token");
        const url = `${BASE_URL}/report/farmer/totalRevenue`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }  
    static async farmerNoOfOrders() {
        const token = getCookie("token");
        const url = `${BASE_URL}/report/farmer/noOfOrders`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }  
    static async farmerLeastOrder() {
        const token = getCookie("token");
        const url = `${BASE_URL}/report/farmer/latestOrders`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }  
    static async totalSaleProductWise() {
        const token = getCookie("token");
        const url = `${BASE_URL}/report/farmer/totalsale`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }  
    static async farmerRevenue(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/report/farmer/revenue?startDate=${data?.startDate}&endDate=${data?.endDate}&duration=${data?.duration}`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }  

}