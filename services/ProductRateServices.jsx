
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

export default class ProductRateServices {
    // add rate service     
    static async addRate(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/rating/reviews`
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`, // Set the token in the Authorization header
            },
        });
    }
    // Get rate service 
    static async getRate(productDtlId) {
        const token = getCookie("token");
        const url = `${BASE_URL}/rating/reviews/${productDtlId}`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // Set the token in the Authorization header
            },
        });
    }
    // Upadte rate service 
    static async UpdateRate(reviewId, data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/rating/reviews/${reviewId}`
        return axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`, // Set the token in the Authorization header
            },
        });
    }

    static async getRatingDistributionById(productDtlId) {
        const token = getCookie("token");
        const url = `${BASE_URL}/rating/product/${productDtlId}/rating-distribution`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}