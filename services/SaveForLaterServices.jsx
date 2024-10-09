import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";
// const url = `${BASE_URL}/user/registration`;

export default class SaveForLaterServices {
    
  static async saveForLater(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/SaveForLater/save`;
    return axios.post(url, data,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    });
  }

  static async getAllWishList() {
    const token = getCookie("token");
    const url = `${BASE_URL}/SaveForLater`;
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
    });
  }

  static async removeForLater(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/SaveForLater/${id}`;
    return axios.delete(url,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    });
  }
}