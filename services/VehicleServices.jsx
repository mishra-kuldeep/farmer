
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

    static async addTranspoterVehicle(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/transpoter/add`;
        return axios.post(url, data, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // Set the token in the Authorization header
            },
        });
    }
}