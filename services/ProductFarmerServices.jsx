import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

// const url = `${BASE_URL}/user/registration`;

export default class ProductFarmerServices {
  ////////////////////////////  category  ///////////////////////////////

  static async getProductsFarmer(page = 1, search = "") {
    const token = getCookie("token");
    const url = `${BASE_URL}/productDtl/products_farmer?page=${page}&search=${search}`;
    return axios.get(url,  {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
}
