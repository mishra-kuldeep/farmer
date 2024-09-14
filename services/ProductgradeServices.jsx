
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

// const url = `${BASE_URL}/user/registration`;

export default class ProductgradeServices {
  ////////////////////////////  grades  ///////////////////////////////


  static async getProductgrades() {
    const token = getCookie("token");
    const url = `${BASE_URL}/grade/grades`
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async addGrade(data) {
    console.log(data)
    const token = getCookie("token");
    const url = `${BASE_URL}/grade/grades`;
    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }

  static async getGrade(page, search) {
    const token = getCookie("token");
    const url = `${BASE_URL}/grade/gradesforadmin?page=${page}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }


  static async getSingeGrade(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/grade/grades/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async editGrade(data, id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/grade/grades/${id}`;
    return axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async EditgradStatus(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/grade/gradStatus/${id}`;
    return axios.put(url, "data", {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }




}