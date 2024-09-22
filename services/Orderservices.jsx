
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

export default class OrderService {
  
  static async checkoutCart(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/order/checkout`;
    return axios.post(url,data, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  }
  static async getOrderAdmin({
    name,
    page = 1,
    search = "",
   
  }) {
    const token = getCookie("token");
    const url = `${BASE_URL}/order/orderadmin/${name}?page=${page}&search=${search}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async getOrderDetailAdmin({
    cartId
  }) {
    const token = getCookie("token");
    const url = `${BASE_URL}/order/orderDetailadmin/${cartId}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
}
