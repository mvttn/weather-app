async function getWeatherDataForLocation(location) {
  const API_KEY = config.WEATHER_API_KEY;
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}`
  );

  const weatherDataJson = await response.json();
  console.log(weatherDataJson);
  return weatherDataJson;
}

function processData(weatherDataJson) {
  return {
    address: weatherDataJson.resolvedAddress,
    datetime: weatherDataJson.currentConditions.datetime,
    condition: weatherDataJson.currentConditions.conditions,
    sunrise: weatherDataJson.currentConditions.sunrise,
    sunset: weatherDataJson.currentConditions.sunset,
    currentTemp: weatherDataJson.currentConditions.temp,
  };
}
(async () => {
  const data = await getWeatherDataForLocation("Sydney");
  console.log(processData(data));
})();
