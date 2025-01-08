
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

export default class ProductsDtlServices {
    static async getProductsDtl(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/productDtl/productsDtl/?page=${data?.page}&search=${data?.search}&countryIds=${data?.countryId}&category=${data?.category}&subCategory=${data?.subCategory}&brand=${data?.brand}`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
    }
    static async getsingleProductsDtl(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/productDtl/productsDtlSlug/${data}`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
    }
}