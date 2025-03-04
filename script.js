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
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=c644132ade9244c0ad960006250303&q=${location}`,
      {
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null; // or handle it accordingly
  }
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
  weatherResult.className = "fade-in"; // Add fade-in class

  // Clear any previous results
  weatherResult.innerHTML =
    '<div class="result-container"><div id="inner-container-1"></div><div id="inner-container-2"></div></div><div class="result-container2"><div id="inner-container-3"></div><div id="inner-container-4"></div></div>';

  const resultContainer = weatherResult.querySelector(".result-container");
  const resultContainer2 = weatherResult.querySelector(".result-container2");
  const innerContainer1 = resultContainer.querySelector("#inner-container-1");
  const innerContainer2 = resultContainer.querySelector("#inner-container-2");
  const innerContainer3 = resultContainer2.querySelector("#inner-container-3");
  const innerContainer4 = resultContainer2.querySelector("#inner-container-4");
  // Create and append condition text
  const conditionText = document.createElement("p");
  conditionText.id = "conditions";
  conditionText.textContent = processedData.conditions;
  innerContainer1.appendChild(conditionText);

  const locationText = document.createElement("p");
  locationText.id = "location-text";
  locationText.textContent = processedData.locationName + ", " + processedData.country;
  innerContainer1.appendChild(locationText);

  // Create and append weather icon
  const weatherIcon = document.createElement("img");
  weatherIcon.src = processedData.iconUrl;
  innerContainer2.appendChild(weatherIcon);

  const temperatureText = document.createElement("p");
  temperatureText.textContent = `${processedData.currentTemp}°C`;
  innerContainer3.appendChild(temperatureText);

  const feelsLikeText = document.createElement("p");
  feelsLikeText.textContent = `FEELS LIKE: ${processedData.feelsLike}°C`;
  innerContainer4.appendChild(feelsLikeText);

  const windText = document.createElement("p");
  windText.textContent = `WIND: ${processedData.wind} km/h`;
  innerContainer4.appendChild(windText);

  const uvText = document.createElement("p");
  uvText.textContent = `UV INDEX: ${processedData.uv}`;
  innerContainer4.appendChild(uvText);

  setTimeout(() => {
    weatherResult.classList.remove("fade-in");
  }, 500);
};
