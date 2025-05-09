import { getWeekDay } from "./utils/customeDate.js";
import getWeatherData from "./utils/httpReq.js";
import { removeModal, showModal } from "./utils/modal.js";

const API_KEY = "2a07d2f3fe66616a5b944cbe7498902f";

const BASE_URL = "http://api.openweathermap.org/data/2.5";



const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherCountry = document.getElementById("weather");
const locationIcon = document.getElementById("location");
const forecastCountry = document.getElementById("forecast");
const modalButon = document.getElementById("modal-button")


const positionCallback = async (position) => {
  const currentData = await getWeatherData( "current",position.coords);
 getWeatherData(currentData);
  const forecastData = await getWeatherData( "forecast",position.coords);
  getWeatherData(forecastData)
};

const errorCallback = (error) => {
  showModal(error.message);
};

const initHandler =async () => {
    const currentData = await getWeatherData("current","tehran");
    renderCurrentWeather(currentData);
    const forecastData = await getWeatherData( "forecast", "tehran");
    renderForecastWeather(forecastData);
}
const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    showModal("Your browser dose not suppot geolocation");
    return;
  }
};

const renderCurrentWeather = (data) => {
    if(!data) return;
  const weatherJSX = `
<h1>${data.name} , ${data.sys.country}</h1>
<div id="main">
<img alt="weather icon" src="http://api.openweathermap.org/img/w/${
    data.weather[0].icon
  }.png"/>
   
<span>${data.weather[0].main}</span>
<p>${Math.round(data.main.temp)} ℃</p>
</div>
<div id="info">
<p>Humidity: <span>${data.main.humidity} %</span></p>
<p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
</div>
`;
  weatherCountry.innerHTML = weatherJSX;
};


const renderForecastWeather = (data) => {
    if(!data) return;
    forecastCountry.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const firecastJSX = `
    <div>
    <img alt="weather icon" src="http://api.openweathermap.org/img/w/${
      i.weather[0].icon
    }.png"/>
    <h3>${getWeekDay(i.dt)}</h3>
    <p>${Math.round(i.main.temp)} ℃</p>
    <span>${i.weather[0].main}</span>
    </div>
    
    `;
    forecastCountry.innerHTML += firecastJSX;
  });
};
const searchHandler = async () => {
  const cityName = searchInput.value;

  if (!cityName) {
    showModal("please enter city name!");
  }

  const currentData = await getWeatherData("current",cityName);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData( "forecast",cityName);
  renderForecastWeather(forecastData);
};
searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
modalButon.addEventListener("click", removeModal)
document.addEventListener("DOMContentLoaded", initHandler)
