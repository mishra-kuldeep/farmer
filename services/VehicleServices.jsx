
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

//this is Vehicle router
export default class VehicleServices {


    static async getVehicleType(page = 1, search = "") {
        const token = getCookie("token");
        const url = `${BASE_URL}/vehicle/active`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // Set the token in the Authorization header
            },
        });
    }
    static async getAllVehicle(id, page = 1, search = "") {
        const token = getCookie("token");
        const url = `${BASE_URL}/transpoter/transpoter/${id}?page=${page}&search=${search}`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    static async getSingleTranspoterVehicle(id) {
        const token = getCookie("token");
        const url = `${BASE_URL}/transpoter/${id}`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    static async getTranspoterForBuyer(location) {
        const token = getCookie("token");
        const url = `${BASE_URL}/transpoter/transpoterForBuyer/${location}`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    // 
    static async addTranspoterVehicle(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/transpoter/add`;
        return axios.post(url, data, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    }
    static async EditTranspoterVehicle(id, data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/transpoter/${id}`;
        return axios.put(url, data, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    static async deleteTranspoterVehicle(id) {
        const token = getCookie("token");
        const url = `${BASE_URL}/transpoter/${id}`;
        return axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }


    static async selectTranspoterForOrderProduct(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/transpoterDelivery/`;
        return axios.post(url, data, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

    }

    static async chengeTranspoterForOrderProduct(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/transpoterDelivery/`;
        return axios.put(url, data, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    }
}