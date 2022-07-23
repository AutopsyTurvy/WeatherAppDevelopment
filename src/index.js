// Date and time information

let currentTime = new Date();
let date = document.querySelector("#date");

let dayNumber = currentTime.getDate();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = currentTime.getFullYear();

let days = [
  "Sunday",
  "monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[currentTime.getMonth()];
console.log(date);

date.innerHTML = `${hours}:${minutes}, ${day}, ${dayNumber} ${month}--${year}`;

//City Searches and innerHTML Information

function showTheWeather(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector(
    "#city"
  ).innerHTML = `In ${response.data.name}- The weather will be: `;
  document.querySelector("#tempvalue").innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemperature = response.data.main.temp;

  //weather facts collection

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//city API

function searchCity(city) {
  let apiKey = "2054b4e7093f717fe48ca5b5d67c0e82";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTheWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchBarInput = document.querySelector("#cityinput");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `In ${cityinput.value}: The Weather will be:`;
  let city = document.querySelector("#cityinput").value;
  searchCity(city);
}

let form = document.querySelector("#searchform");
form.addEventListener("submit", handleSubmit);

//geolocation code

function searchLocation(position) {
  let apiKey = "2054b4e7093f717fe48ca5b5d67c0e82";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTheWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentTempButton = document.querySelector("#currenttempbutton");
currentTempButton.addEventListener("click", getCurrentLocation);

//fahrenheit conversion

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#tempvalue");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#tempvalue");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Copenhagen");
