let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayofWeek = document.querySelector("#day-of-week");
dayofWeek.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}
let form = document.querySelector("#search-weather");
form.addEventListener("submit", search);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempMassage = `${temperature} °C`;
  let tempElement = document.querySelector("#current-temperature");
  tempElement.innerHTML = tempMassage;
  let windValue = Math.round(response.data.wind.speed);
  let windMassage = `Wind: ${windValue} km/h`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = windMassage;
  let humidityValue = response.data.main.humidity;
  let humidityMassage = `Humidity: ${humidityValue}%`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidityMassage;

  let descriptionValue = response.data.weather[0].description;
  let descriptionMassage = `${descriptionValue}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = descriptionMassage;
}
function searchCity(city) {
  let units = "metric";
  let apiKey = "ea9ebece6d43f4740f0c24d6061ae5bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
searchCity("Kyiv");

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ea9ebece6d43f4740f0c24d6061ae5bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", currentLocation);
