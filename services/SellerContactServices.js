import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

export default class SellerContactServices {
  static getSellerContact = async (data) => {
    const response = await axios.post(
      `${BASE_URL}/sellerContact/get-contact`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return response;
  };
}
