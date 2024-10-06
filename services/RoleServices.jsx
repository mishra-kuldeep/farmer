
import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

export default class RoleServices {
    ////////////////////////////  RoleServices  ///////////////////////////////

    static async getRoleList() {
        const token = getCookie("token");
        const url = `${BASE_URL}/role/roles`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    static async addRole(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/role/roles`;
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    //   static async getGrade(page, search) {
    //     const token = getCookie("token");
    //     const url = `${BASE_URL}/grade/gradesforadmin?page=${page}`;
    //     return axios.get(url, {
    //       headers: {
    //         Authorization: `Bearer ${token}`, // Set the token in the Authorization header
    //       },
    //     });
    //   }

    static async getSingeRole(id) {
        const token = getCookie("token");
        const url = `${BASE_URL}/role/roles/${id}`;
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // Set the token in the Authorization header
            },
        });
    }

    static async editRole(data, id) {
        const token = getCookie("token");
        const url = `${BASE_URL}/role/roles/${id}`;
        return axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`, // Set the token in the Authorization header
            },
        });
    }


    //   static async EditgradStatus(id) {
    //     const token = getCookie("token");
    //     const url = `${BASE_URL}/grade/gradStatus/${id}`;
    //     return axios.put(url, "data", {
    //       headers: {
    //         Authorization: `Bearer ${token}`, // Set the token in the Authorization header
    //       },
    //     });
    //   }




}