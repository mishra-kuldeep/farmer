import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

//this is  router
export default class vendorMasterServices {
  static async getAllVendor() {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendorServices/all`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async getSingleVendor(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendorServices/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async addVendorMaster(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendorServices/add`;
    return axios.post(url, data, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async EditVendor(id, data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendorServices/${id}`;
    return axios.put(url, data, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async EditStatus(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendorServices/status/${id}`;
    return axios.put(url, "data", {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async deleteVendor(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendorServices/${id}`;
    return axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /////////////////////////////////// vender user routes //////////////////////////////////////

  static async addVendorServices(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendor/services`;
    return axios.post(url, data, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async getVendorServices(vendorId, page, searchText) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendor/services/vendor/${vendorId}?page=${page}?searchText=${searchText}`;
    return axios.get(url, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async getAllVendorServices( status,slug,page, searchText) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendor/services?status=${status}&id=${slug}&page=${page}&searchText=${searchText}`;
    return axios.get(url, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async getSingleService(serviceId) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendor/SingleService/${serviceId}`;
    return axios.get(url, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async getsingleVendorServices(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendor/services/vendor/${id}`;
    return axios.get(url, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async deleteVendorServices(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendor/services/${id}`;
    return axios.delete(url, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async reviewVendorServices(serviceId,data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendor/services/admin-review/${serviceId}`;
    return axios.patch(url, data,{
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static async UpdateVendorServices(serviceId,data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/vendor/services/${serviceId}`;
    return axios.put(url, data,{
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
