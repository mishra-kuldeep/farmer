
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

//this is  router
export default class vendorMasterServices {

    static async getAllVendor() {
        const token = getCookie("token");
        const url = `${BASE_URL}/vendorServices/all`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    static async getSingleVendor(id) {
        const token = getCookie("token");
        const url = `${BASE_URL}/vendorServices/${id}`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
 
    static async addVendorMaster(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/vendorServices/add`;
        return axios.post(url, data, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    }
    static async EditVendor(id, data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/vendorServices/${id}`;
        return axios.put(url, data, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    static async EditStatus(id) {
        const token = getCookie("token");
        const url = `${BASE_URL}/vendorServices/status/${id}`;
        return axios.put(url, "data", {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    static async deleteVendor(id) {
        const token = getCookie("token");
        const url = `${BASE_URL}/vendorServices/${id}`;
        return axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }





}