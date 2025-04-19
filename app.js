const API_KEY = "2a07d2f3fe66616a5b944cbe7498902f"

const BASE_URL = "http://api.openweathermap.org/data/2.5"

const searchInput = document.querySelector("input")
const searchButton = document.querySelector("button")
const weatherCountry = document.getElementById("weather")


const getCurrentWeatherByName =async (city) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
   const res = await fetch(url);
    const json = await res.json();
    return json;
}


const renderCurrentWeather = (data) => {
const weatherJSX =`
<h1>${data.name} , ${data.sys.country}</h1>
<div id="main">
<img alt="weather icon" src="http://api.openweathermap.org/img/w/${data.weather[0].icon}.png"/>
<span>${data.weather[0].main}</span>
<p>${Math.round(data.main.temp)} ℃</p>
</div>
<div id="info">
<p>Humidity: <span>${data.main.humidity} %</span></p>
<p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
</div>
`;
weatherCountry.innerHTML = weatherJSX;
}
const searchHandler = async () => {
    const cityName = searchInput.value;

    if(!cityName) {
        alert("please enter city name!")
    }

    const currentData = await getCurrentWeatherByName(cityName)
    renderCurrentWeather(currentData)

}
searchButton.addEventListener("click", searchHandler) 