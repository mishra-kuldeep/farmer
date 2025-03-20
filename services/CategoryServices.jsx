import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

// const url = `${BASE_URL}/user/registration`;

export default class CategoryServices {
  ////////////////////////////  category  ///////////////////////////////

  static async addCategory(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/category/categories`;
    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async getCategory(page, search) {
    const token = getCookie("token");
    const url = `${BASE_URL}/category/categories?page=${page}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async getCategorySubCategory() {
    const token = getCookie("token");
    const url = `${BASE_URL}/category/category/subcategory/list`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async getSubCategorybycategoryId(id) {
    const url = `${BASE_URL}/subcategory/category/subcategories/${id}`;
    return axios.get(url);
  }
  
  
  static async getSingeCategory(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/category/categories/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async deleteCategory(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/category/categories/${id}`;
    return axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async editCategory(data, id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/category/categories/${id}`;
    return axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  ////////////////////////////  sub category  ///////////////////////////////

  static async addSubCategory(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/subcategory/subcategories`;
    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
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
    const token = getCookie("token");
    const url = `${BASE_URL}/subcategory/subcategories/${id}`;
    return axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async getSingesubCategory(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/subcategory/subcategories/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async deleteSubCategory(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/subcategory/subcategories/${id}`;
    return axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  ////////////////////////////  brand  ///////////////////////////////

  static async addBrand(data) {
     const token = getCookie("token");
    const url = `${BASE_URL}/brand/brand`;
    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async getBrand() {
     const token = getCookie("token");
    const url = `${BASE_URL}/brand/brand`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async getSingeBrand(id) {
     const token = getCookie("token");
    const url = `${BASE_URL}/brand/brand/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async editBrand(data, id) {
     const token = getCookie("token");
    const url = `${BASE_URL}/brand/brand/${id}`;
    return axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
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
  static async getSearchProducts(search = "") {
    const token = getCookie("token");
    const url = `${BASE_URL}/product/search?search=${search}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async getSingleProduct(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/product/singleProduct/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async addProductsFormer(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/productDtl/productsDtls`;
    return axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
    const token = getCookie("token");
    const url = `${BASE_URL}/product/products/${id}`;
    return axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
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
    const token = getCookie("token");
    const url = `${BASE_URL}/product/productStatus/${id}`;
    return axios.put(url, { status: stat }, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
}
