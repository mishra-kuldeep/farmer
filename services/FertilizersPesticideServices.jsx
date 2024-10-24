import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

//this is  router
export default class vendorMasterServices {
    static async getAllVendorServices(data) {
        const token = getCookie("token");
        const url = `${BASE_URL}/vendor/services?status=${data?.status}&Fertilizer_PesticideId=${data?.slug}&page=${data?.page}&searchText=${data?.searchText}&countryId=${data?.countryId}`;
        return axios.get(url, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }
}