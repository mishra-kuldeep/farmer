
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

//this is Vehicle Master router
export default class VehicleMasterServices {


    static async getVehicle(page = 1, search = "") {
        const token = getCookie("token");
        const url = `${BASE_URL}/vehicle/all`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // Set the token in the Authorization header
            },
        });
    }
    static async SingleVehicle(id) {
        const token = getCookie("token");
        const url = `${BASE_URL}/vehicle/${id}`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // Set the token in the Authorization header
            },
        });
    }

    static async addVehicle(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/vehicle/add`;
        return axios.post(url, data, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // Set the token in the Authorization header
            },
        });
    }
}