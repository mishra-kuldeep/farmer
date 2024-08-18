export const BASE_URL = "http://localhost:5000/api"

export function getCookie(cookiename) {
    // Get name followed by anything except a semicolon
    const cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(
      !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
    );
  }
  
  export function setToken(token) {
    const date = new Date();
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000); // FIXME: 240mins
    document.cookie = `token=${token};expires=${date.toUTCString()};path=/`;
  }