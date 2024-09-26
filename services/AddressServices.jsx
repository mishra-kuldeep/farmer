import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";
// const url = `${BASE_URL}/user/registration`;

export default class AddressServices {
    
  static async addAddress(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/address/add`;
    return axios.post(url, data,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    });
  }

  static async getAddressList() {
    const token = getCookie("token");
    const url = `${BASE_URL}/address`;
    return axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    });
  }
}