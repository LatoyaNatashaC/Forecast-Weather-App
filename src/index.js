function changeTheme() {
  let body = document.querySelector("body");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
}

let themeButton = document.querySelector(".theme-button");
themeButton.addEventListener("click", changeTheme);

function displayWeather(response) {
  let temperatureElement = Math.round(response.data.temperature.current);
  let displayTemperature = document.querySelector("#current-temperature");
  let weatherDescription = document.querySelector("#condition");
  let cityElement = document.querySelector("#city-result");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#display-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  displayTemperature.innerHTML = `${temperatureElement}`;
  weatherDescription.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} mph`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class=".sun-icon"/>`;

  getForecast(response.data.city);
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "4f3b0tf3219b4c7758082d0o48eabbbe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "4f3b0tf3219b4c7758082d0o48eabbbe";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
 <div class= "weather-forecast-day">
  <div class="weather-forecast-date">${day}</div>
  <div class="weather-forecast-icon">🌤</div>
  <div class="Weather-forecast-temperatures">
  <span class="weather-forecast-temperature-max">
  <strong>79º</strong>
  </span>
  <span class="weather-forecast-temperature-min"> 55º</span>
  </div>
  </div>
`;
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", search);

searchCity("California");
