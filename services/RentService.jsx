
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

export default class RentServices {

    static async addRentCategory(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/rentCategory`;
        return axios.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
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

    static async getRentCategoryById(id) {
        const token = getCookie("token");
        const url = `${BASE_URL}/rentCategory/single/${id}`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
  

    static async EditRentCategory(id, data) {
        for (const [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
          }
        const token = getCookie("token");
        const url = `${BASE_URL}/rentCategory/${id}`;
        return axios.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    }

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