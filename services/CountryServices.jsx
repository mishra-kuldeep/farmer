import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

// const url = `${BASE_URL}/user/registration`;

export default class CountryServices {
  ////////////////////////////  country  ///////////////////////////////

  static async getAllCountry() {
    const token = getCookie("token");
    const url = `${BASE_URL}/country/countries`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
  static async getCountrybyId(id) {
    const token = getCookie("token");
    const url = `${BASE_URL}/country/countries/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token in the Authorization header
      },
    });
  }
}