import GetQuardinatesServices from "@/services/GetQuardinatesServices";

export async function calculateDistance(pincode1, pincode2) {
  const location1 = await GetQuardinatesServices.getCoordinates(pincode1);
  const location2 = await GetQuardinatesServices.getCoordinates(pincode2);
  const lat1 = location1?.latitude;
  const lon1 = location1?.longitude;
  const lat2 = location2?.latitude;
  const lon2 = location2?.longitude;
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
