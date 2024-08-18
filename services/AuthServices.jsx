
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";
// const url = `${BASE_URL}/user/registration`;

export default class AuthService {
  static async registration(data) {
    const url = `${BASE_URL}/user/registration`;
    return axios.post(url, data);
  }
  static async login(data) {
    console.log(data)
    const url = `${BASE_URL}/user/login`;
    return axios.post(url, data);
  }
  static async getUserInfo() {
    const token = getCookie("token")
    console.log(data)
    const url = `${BASE_URL}/user/info`;
    return axios.get(url, data);
  }
  
}
