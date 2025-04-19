const API_KEY = "2a07d2f3fe66616a5b944cbe7498902f"

const BASE_URL = "http://api.openweathermap.org/data/2.5"

const searchInput = document.querySelector("input")
const searchButton = document.querySelector("button")


const getCurrentWeatherByName =async (city) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
   const res = await fetch(url);
    const json = await res.json();
    return json;
}

const searchHandler = async () => {
    const cityName = searchInput.value;

    if(!cityName) {
        alert("please enter city name!")
    }

    const currentData = await getCurrentWeatherByName(cityName)
    console.log(currentData)

}
searchButton.addEventListener("click", searchHandler) 