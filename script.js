const locationInput = document.querySelector("#location-input");
const searchButton = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");

function finishSearch() {
  searchBar.classList.add("moved");
  locationInput.value = ""; // Clear the input
  searchBar.blur();
}

locationInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    fetchWeather();
    finishSearch();
  }
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (document.activeElement === searchButton) {
    fetchWeather();
    finishSearch();
  }
});

async function getWeatherData(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=c644132ade9244c0ad960006250303&q=${location}`
  );

  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}

function processData(weatherData) {
  return {
    locationName: weatherData.location.name,
    country: weatherData.location.country,
    conditions: weatherData.current.condition.text,
    feelsLike: Math.round(weatherData.current.feelslike_c),
    currentTemp: Math.round(weatherData.current.temp_c),
    uv: Math.round(weatherData.current.uv),
    wind: Math.round(weatherData.current.wind_kph),
    iconUrl: weatherData.current.condition.icon,
  };
}

const fetchWeather = async () => {
  const location = locationInput.value; // Get the location value from input field
  if (!location) {
    alert("Please enter a location!");
    return;
  }

  const data = await getWeatherData(location);
  const processedData = processData(data);
  console.log(processedData);

  const weatherResult = document.querySelector("#weather-result");

  // Clear any previous results
  weatherResult.innerHTML = "";

  const locationText = document.createElement("p");
  locationText.id = "location-text";
  locationText.textContent = processedData.locationName + ", " + processedData.country;
  weatherResult.appendChild(locationText);

  // Create and append weather icon
  const weatherIcon = document.createElement("img");
  weatherIcon.src = processedData.iconUrl;
  weatherResult.appendChild(weatherIcon);

  // Create and append condition text
  const conditionText = document.createElement("p");
  conditionText.id = "conditions";
  conditionText.textContent = processedData.conditions;
  weatherResult.appendChild(conditionText);

  // Optionally, append more data like temperature, wind, etc.
  const temperatureText = document.createElement("p");
  temperatureText.textContent = `Temperature: ${processedData.currentTemp}°C, Feels Like: ${processedData.feelsLike}°C`;
  weatherResult.appendChild(temperatureText);

  const windText = document.createElement("p");
  windText.textContent = `Wind: ${processedData.wind} km/h`;
  weatherResult.appendChild(windText);
};
