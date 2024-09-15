import { BASE_URL, getCookie } from "@/helper/common";
import axios from "axios";

export default class CartService {
  static async AddToCart(data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/cart/cart`;
    return axios.post(url,data, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  }

  static async UpdateCart(cartId,data) {
    const token = getCookie("token");
    const url = `${BASE_URL}/cart/cart/${cartId}`;
    return axios.put(url,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async RemoveFromCart(cartId) {
    const token = getCookie("token");
    const url = `${BASE_URL}/cart/cart/${cartId}`;
    return axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  }

  static async getCartItems(buyerId) {
    const token = getCookie("token");
    const url = `${BASE_URL}/cart/cart/${buyerId}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  }
}
