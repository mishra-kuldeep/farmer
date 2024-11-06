
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

export default class RentServices {

    static async addRentCategory(data) {
        console.log(data);
        
        const token = getCookie("token");
        const url = `${BASE_URL}/rentCategory`;
        return axios.post(url, data, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    static async getRentCategory() {
        const token = getCookie("token");
        const url = `${BASE_URL}/rentCategory`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
    }
    // static async getAllVehicle(id, page = 1, search = "") {
    //     const token = getCookie("token");
    //     const url = `${BASE_URL}/transpoter/transpoter/${id}?page=${page}&search=${search}`;
    //     return axios.get(url, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    // }
    // static async getSingleTranspoterVehicle(id) {
    //     const token = getCookie("token");
    //     const url = `${BASE_URL}/transpoter/${id}`;
    //     return axios.get(url, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    // }
    // static async getTranspoterForBuyer(data) {
    //     const token = getCookie("token");
    //     const url = `${BASE_URL}/transpoter/transpoterForBuyer/${data?.countryId}/${data?.location}`;
    //     return axios.get(url, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    // }
    // // 

    // static async EditTranspoterVehicle(id, data) {
    //     const token = getCookie("token");
    //     const url = `${BASE_URL}/transpoter/${id}`;
    //     return axios.put(url, data, {
    //         headers: {
    //             // 'Content-Type': 'multipart/form-data',
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    // }

    // static async deleteTranspoterVehicle(id) {
    //     const token = getCookie("token");
    //     const url = `${BASE_URL}/transpoter/${id}`;
    //     return axios.delete(url, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    // }


    // static async selectTranspoterForOrderProduct(data) {
    //     const token = getCookie("token");
    //     const url = `${BASE_URL}/transpoterDelivery/`;
    //     return axios.post(url, data, {
    //         headers: {
    //             // 'Content-Type': 'multipart/form-data',
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });

    // }

    // static async chengeTranspoterForOrderProduct(data) {
    //     const token = getCookie("token");
    //     const url = `${BASE_URL}/transpoterDelivery/`;
    //     return axios.put(url, data, {
    //         headers: {
    //             // 'Content-Type': 'multipart/form-data',
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    // }
}