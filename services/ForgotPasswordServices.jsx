
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

export default class ForgotPasswordServices {

    static async forgotPassword(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/security/forgotPassword`;
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    static async verifyOTP(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/security/verifyOTP`;
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    static async changePassword(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/security/changePassword`;
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

}