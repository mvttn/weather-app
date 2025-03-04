const locationInput = document.querySelector("#location-input");
locationInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    fetchWeather();
  }
});

const searchButton = document.querySelector(".search-btn");
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (document.activeElement === searchButton) {
    fetchWeather();
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
    region: weatherData.location.region,
    conditions: weatherData.current.condition.text,
    feelsLike: Math.round(weatherData.current.feelslike_c),
    currentTemp: Math.round(weatherData.current.temp_c),
    uv: Math.round(weatherData.current.uv),
    wind: Math.round(weatherData.current.wind_kph),
    iconUrl: weatherData.current.condition.icon,
  };
}

const fetchWeather = async () => {
  if (!locationInput.value) {
    alert("Please enter a location!");
    return;
  }

  const data = await getWeatherData(location);
  const processedData = processData(data);
  console.log(processedData);

  const weatherIcon = document.createElement("img");
  weatherIcon.src = processedData.iconUrl;
  document.body.appendChild(weatherIcon);
  const conditionText = document.createElement("h2");
  conditionText.textContent = processedData.conditions;
  document.body.appendChild(conditionText);
};
