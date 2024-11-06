import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

// const url = `${BASE_URL}/user/registration`;

export default class RentProductsServices {
    static async getAllRentCategories() {
        const token = getCookie("token");
        const url = `${BASE_URL}/rentCategory`
        return axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the Authorization header
          },
        });
      }

      static async addRentProducts(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/rentProduct`;
        return axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the Authorization header
          },
        });
      }
}