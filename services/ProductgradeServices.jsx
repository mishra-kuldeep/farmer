
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

// const url = `${BASE_URL}/user/registration`;

export default class ProductgradeServices {
  ////////////////////////////  grades  ///////////////////////////////


    static async getProductgrades() {
    const token = getCookie("token");
    const url = `${BASE_URL}/grade/grades`
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
}