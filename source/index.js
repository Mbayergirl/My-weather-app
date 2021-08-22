let now = new Date();
let time = document.querySelector("#date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${day}, ${hours}:${minutes}`;

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

function showTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#actual-temp");
  temperatureElement.innerHTML = `${temperature}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind}mph`;
  let description = document.querySelector("#weather");
  description.innerHTML = response.data.weather[0].description;
  let yourCity = document.querySelector("#place");
  yourCity.innerHTML = response.data.name;
  let realTemperature = Math.round(response.data.main.feels_like);
  let realFeelTempElement = document.querySelector("#real-feel");
  realFeelTempElement.innerHTML = `Real feel: ${realTemperature}°C`;

  let now = new Date();
  let time = document.querySelector("#date");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time.innerHTML = `${day}, ${hours}:${minutes}`;
}

function showCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "60a412f8c05beac91972a0460cb4acc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCoordinates);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);
