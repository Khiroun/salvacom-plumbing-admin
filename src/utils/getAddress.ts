const getAddress = async (
  latitude: number | string,
  longitude: number | string
) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a5fe97e320mshbe04253044f8b5cp15279ejsne4358a1be896",
      "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
    },
  };

  const response = await fetch(
    `https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=${latitude}&lon=${longitude}&accept-language=en&polygon_threshold=0.0`,
    options
  );
  const jsonResponse = await response.json();
  const display_name = jsonResponse?.display_name;
  if (display_name) return display_name;
  return "";
};

export default getAddress;
