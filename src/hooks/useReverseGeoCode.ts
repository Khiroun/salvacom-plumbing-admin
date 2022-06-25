import { useState } from "react";

const useReverseGeoCode = () => {
  const [address, setAddress] = useState("");
  const getAddress = async (
    latitude: number | string,
    longitude: number | string
  ) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a5fe97e320mshbe04253044f8b5cp15279ejsne4358a1be896",
        "X-RapidAPI-Host": "geocodeapi.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=${latitude}&longitude=${longitude}&range=0`,
      options
    );
    const jsonResponse = await response.json();
    setAddress(JSON.stringify(jsonResponse));
  };
  return { address, getAddress };
};
export default useReverseGeoCode;
