import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";
// const url = `${BASE_URL}/user/registration`;

export default class AdminDashboardServices {

  static async getTotaluser(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/report/admin/totalUser?startDate=${data.fromDate}&endDate=${data.toDate}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async getTotalOrders(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/report/admin/totalOder?startDate=${data.fromDate}&endDate=${data.toDate}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async getTotalAds(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/report/admin/totalAds?startDate=${data.fromDate}&endDate=${data.toDate}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async getDateWiseOrder(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/report/admin/DateWiseOrder?startDate=${data.fromDate}&endDate=${data.toDate}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async getDateWiseOrderPayment(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/report/admin/DateWiseOrderPayment?startDate=${data.fromDate}&endDate=${data.toDate}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}