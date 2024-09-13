import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

// const url = `${BASE_URL}/user/registration`;

export default class ProductUnitServices {
  ////////////////////////////  category  ///////////////////////////////


    static async getProductUnit() {
    const token = getCookie("token");
    const url = `${BASE_URL}/unit/units`
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

//   static async addCategory(data) {
//     const token = getCookie("token");
//     const url = `${BASE_URL}/category/categories`;
//     return axios.post(url, data, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Set the token in the Authorization header
//       },
//     });
//   }

//   static async getCategory(page, search) {
//     const token = getCookie("token");
//     const url = `${BASE_URL}/category/categories?page=${page}`;
//     return axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Set the token in the Authorization header
//       },
//     });
//   }

  
//   static async getSingeCategory(id) {
//     const token = getCookie("token");
//     const url = `${BASE_URL}/category/categories/${id}`;
//     return axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Set the token in the Authorization header
//       },
//     });
//   }
//   static async deleteCategory(id) {
//     const token = getCookie("token");
//     const url = `${BASE_URL}/category/categories/${id}`;
//     return axios.delete(url, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Set the token in the Authorization header
//       },
//     });
//   }
//   static async editCategory(data, id) {
//     const token = getCookie("token");
//     const url = `${BASE_URL}/category/categories/${id}`;
//     return axios.put(url, data, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Set the token in the Authorization header
//       },
//     });
//   }
}