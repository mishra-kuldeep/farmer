import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

//this is  router
export default class FertilizersPesticideServices {
    static async getAllFertilizersPesticide(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/vendor/services?status=${data?.status}&DistributorsType=${data?.slug}&pageSize=${data?.pageSize}&page=${data?.page}&searchText=${data?.searchText}&location=${data?.location}&countryId=${data?.countryId}`;
        return axios.get(url, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }
    static async getSinglFertilizersPesticide(serviceId) {
        const token = getCookie("token");
        const url = `${BASE_URL}/vendor/Singl/services/${serviceId}`;
        return axios.get(url, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }
}