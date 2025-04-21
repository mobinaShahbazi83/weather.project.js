const API_KEY = "2a07d2f3fe66616a5b944cbe7498902f";

const BASE_URL = "http://api.openweathermap.org/data/2.5";

const getWeatherData = async (type, data) => {
  let url = null;

  switch (type) {
    case "current":
      if (typeof data === "string") {
        url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
      }
      break;
    case "forecast":
      if (typeof data === "string") {
        url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      }
      break;
    default:
      url = `${BASE_URL}/weather?q=zanjan&APPID=${API_KEY}&units=metric`;
      break;
  }

  try {
    const res = await fetch(url);
  const json = await res.json();
  if(+json.cod === 200) {
    return json;
  } else {
    console.log(json.meesageا)
  }
  } catch (error) {
    console.log("An errror occured when fetching data") 
  }
};


export default getWeatherData

// const { latitude, longitude } = position.coords;