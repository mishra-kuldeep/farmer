
import axios from "axios";

export default class GetQuardinatesServices {
  static async getCoordinates(pincode) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`
    );
    console.log(response);
    
    const { lat, lng } = response.data.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  }
  
}