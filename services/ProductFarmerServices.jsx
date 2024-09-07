import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

// const url = `${BASE_URL}/user/registration`;

export default class ProductFarmerServices {
  ////////////////////////////  category  ///////////////////////////////

  static async getProductsFarmer(page = 1, search = "") {
    const token = getCookie("token");
    const url = `${BASE_URL}/productDtl/products_farmer?page=${page}&search=${search}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async getfarmerlistforAdmin() {
    const token = getCookie("token");
    const url = `${BASE_URL}/user/farmer/list`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async getAllproductslistforAdmin({
    page = 1,
    search = "",
    category = "",
    subCategory = "",
    brand = "",
    sellerId = "",
  }) {
    const token = getCookie("token");
    const url = `${BASE_URL}/productDtl/products_admin?page=${page}&search=${search}&category=${category}&subCategory=${subCategory}&brand=${brand}&sellerId=${sellerId} `;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async deleteProductsFarmer(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/productDtl/productsDtl/${id}`;
    return axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async getSingleProductsFarmer(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/productDtl/productsDtl/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async editProductsFormer(id, data) {
    console.log(data);
    const token = getCookie("token");
    const url = `${BASE_URL}/productDtl/productsDtl/${id}`;
    return axios.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async approveProductsFarmer(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/productDtl/products/aprove/${id}`;
    return axios.put(url, "aprove", {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async rejectProductsFarmer(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/productDtl/products/reject/${id}`;
    return axios.put(url, "reject", {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async getAllImage(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/image/get/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async getAllproductsAdmin({
    name,
    page = 1,
    search = "",
    category = "",
    subCategory = "",
    brand = "",
    sellerId = "",
  }) {
    console.log(search);
    const token = getCookie("token");
    const url = `${BASE_URL}/productDtl/products_admin/${name}?page=${page}&search=${search}&category=${category}&subCategory=${subCategory}&brand=${brand}&sellerId=${sellerId} `;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
}
