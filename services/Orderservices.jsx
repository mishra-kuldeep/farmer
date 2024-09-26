
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
  static async getOrderDetailAdmin(orderId) {
    const token = getCookie("token");
    const url = `${BASE_URL}/order/orderDetailadmin/${orderId}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async AdminApproveOrder(orderId,data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/order/approve/${orderId}`;
    return axios.put(url,data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async AdminRejectOrder(orderId,data) {
    console.log(data);
    
    const token = getCookie("token");
    const url = `${BASE_URL}/order/reject/${orderId}`;
    return axios.put(url,{adminReviewComment:data}, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async BuyerOrderList(status,page) {    
    console.log("status,page",status,page)
    const token = getCookie("token");
    const url = `${BASE_URL}/order/orderbuyer/${status}?page=${page}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async BuyerOrderSingleList(orderId) {
    console.log(orderId);
    const token = getCookie("token");
    const url = `${BASE_URL}/order/orderDetailadmin/${orderId}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async getOrderedConfirmToSeller(status) {
    console.log(status);
    const token = getCookie("token");
    const url = `${BASE_URL}/order/orderfarmer/${status}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  
}
