import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

// const url = `${BASE_URL}/user/registration`;

export default class CategoryServices {
  ////////////////////////////  category  ///////////////////////////////

  static async addCategory(data) {
    const url = `${BASE_URL}/category/categories`;
    return axios.post(url, data);
  }
  static async getCategory(page, search) {
    const url = `${BASE_URL}/category/categories?page=${page}`;
    return axios.get(url);
  }
  static async getSingeCategory(id) {
    const url = `${BASE_URL}/category/categories/${id}`;
    return axios.get(url);
  }
  static async deleteCategory(id) {
    const url = `${BASE_URL}/category/categories/${id}`;
    return axios.delete(url);
  }
  static async editCategory(data, id) {
    console.log(data, id);
    const url = `${BASE_URL}/category/categories/${id}`;
    return axios.put(url, data);
  }

  ////////////////////////////  sub category  ///////////////////////////////

  static async addSubCategory(data) {
    const url = `${BASE_URL}/subcategory/subcategories`;
    return axios.post(url, data);
  }
  static async getSubCategory() {
    const token = getCookie("token");
    const url = `${BASE_URL}/subcategory/subcategories`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async editSubCategory(data, id) {
    const url = `${BASE_URL}/subcategory/subcategories/${id}`;
    return axios.put(url, data);
  }
  static async getSingesubCategory(id) {
    const url = `${BASE_URL}/subcategory/subcategories/${id}`;
    return axios.get(url);
  }

  ////////////////////////////  brand  ///////////////////////////////

  static async addBrand(data) {
    const url = `${BASE_URL}/brand/brand`;
    return axios.post(url, data);
  }
  static async getBrand() {
    const url = `${BASE_URL}/brand/brand`;
    return axios.get(url);
  }
  static async getSingeBrand(id) {
    const url = `${BASE_URL}/brand/brand/${id}`;
    return axios.get(url);
  }
  static async editBrand(data, id) {
    const url = `${BASE_URL}/brand/brand/${id}`;
    return axios.put(url, data);
  }

  ////////////////////////////  products  ///////////////////////////////

  static async getProducts(page = 1, search = "") {
    const token = getCookie("token");
    const url = `${BASE_URL}/product/products?page=${page}&search=${search}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async addProductsFormer(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/productDtl/productsDtl`;
    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async addProduct(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/product/products`;

    return axios.post(
      url,
      data, // Pass the data as the second argument
      {
        headers: {
          Authorization: `Bearer ${token}`, // Set the token in the Authorization header
        },
      }
    );
  }

  static async getSingeProduct(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/product/products/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async deleteProduct(id) {
    const url = `${BASE_URL}/product/products/${id}`;
    return axios.delete(url);
  }
  static async editProduct(data, id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/product/products/${id}`;
    return axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async statusUpdateProduct(id, stat) {
    const url = `${BASE_URL}/product/products/status/${id}`;
    return axios.put(url, { status: stat });
  }
}
