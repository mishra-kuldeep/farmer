import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

// const url = `${BASE_URL}/user/registration`;

export default class ProductUnitServices {
  ////////////////////////////  category  ///////////////////////////////
  static async getUnitBycountry(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/unit/units/${id}`
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

    static async getProductUnit(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/unit/units/${id}`
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async addUnit(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/unit/units`;
    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async getunit(page, search) {
    const token = getCookie("token");
    const url = `${BASE_URL}/unit/UnitsforAdmin?page=${page}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  
  static async getSingeUnit(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/unit/unitSingle/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async editUnit(data, id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/unit/units/${id}`;
    return axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async EditunitStatus( id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/unit/unitStatus/${id}`;
    return axios.put(url, "data", {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
}