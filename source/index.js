function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let yourCity = document.querySelector("#place");
  yourCity.innerHTML = `${cityInput.value}`;
  let apiKey = "55f59614e2025a21009b8c49463db5d3";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
let cityForm = document.querySelector("#enter-your-city");
cityForm.addEventListener("submit", showCity);

function search(city) {
  let apiKey = "55f59614e2025a21009b8c49463db5d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function formatDateOne(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDateSunset(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "55f59614e2025a21009b8c49463db5d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = temperature;

  let temperatureElement = document.querySelector("#actual-temp");
  temperatureElement.innerHTML = `${temperature}`;
  let iconElement = document.querySelector("#sunny-interval");
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind}km/h`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDateOne(response.data.dt * 1000);
  let description = document.querySelector("#weather");
  description.innerHTML = response.data.weather[0].description;
  let yourCity = document.querySelector("#place");
  yourCity.innerHTML = response.data.name;
  let realTemperature = Math.round(response.data.main.feels_like);
  let realFeelTempElement = document.querySelector("#real-feel");
  realFeelTempElement.innerHTML = `Real feel: ${realTemperature}°C`;
  let sunriseElement = document.querySelector("#sunrise1");
  sunriseElement.innerHTML = formatDate(response.data.sys.sunrise * 1000);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formatDateSunset(response.data.sys.sunset * 1000);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="images/${forecastDay.weather[0].icon}.png"
           alt=""
          width="42"
          
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">  ${Math.round(
            forecastDay.temp.max
          )}°C </span>
          <div class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}°C </div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "55f59614e2025a21009b8c49463db5d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCoordinates);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);

function showCelsius(event) {
  event.preventDefault();

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let celsiusTemp = document.querySelector("#actual-temp");
  celsiusTemp.innerHTML = celsiusTemperature;
}
let celsius = document.querySelector("#units-celsius");
celsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = document.querySelector("#actual-temp");

  let fahrenheitConvert = (celsiusTemperature * 9) / 5 + 32;
  fahrenheitTemp.innerHTML = Math.round(fahrenheitConvert);
}

let fahrenheit = document.querySelector("#units-fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsiusTemperature = null;

search("Edinburgh");
