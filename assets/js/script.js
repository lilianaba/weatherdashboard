var userFormEl = document.querySelector("#user-form");
var currentweather = document.querySelector(".currentweather");
var cityList = document.querySelector("#city-list");
// var forecast = document.querySelector('#forecast');
var userCity = document.querySelector("#userCity");
var historyCity = document.querySelector(".btn-outline-info");
var forecastListEl = document.querySelector("#forecast-list");
const apiKey = "5f95d7a679cab867a94961cf83fc403f";

const displayCurrentWeather = (data) => {
  currentweather.innerText = "";
  let dateEl = document.createElement("h2");
  let cityEl = document.createElement("h2");
  let tempEl = document.createElement("p");
  let humidityEl = document.createElement("p");
  let windSpeedEl = document.createElement("p");
  let icon = document.createElement("img");
  dateEl.innerText = new Date().toLocaleDateString();
  cityEl.innerText = data.name;
  tempEl.innerText = "The Temperature: " + data.main.temp + " °C";
  humidityEl.innerText = "Humidity: " + data.main.humidity + "%";
  windSpeedEl.innerText = "Windy speed:  " + data.wind.speed;
  icon.setAttribute(
    "src",
    "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  );

  currentweather.append(dateEl, cityEl, tempEl, humidityEl, windSpeedEl, icon);
};

const forecast = (city) => {
  forecastListEl.innerText = "";
  var apiUrlWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrlWeather).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < data.list.length; i++) {
          // let divEl=document.createElement("div");
          // divEl.classList.add("day");
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            console.log(data);
            let divEl = document.createElement("div");
            let dateEl = document.createElement("h2");
            let cityEl = document.createElement("h2");
            let tempEl = document.createElement("p");
            let humidityEl = document.createElement("p");
            let windSpeedEl = document.createElement("p");
            let icon = document.createElement("img");
            dateEl.innerText = new Date(
              data.list[i].dt_txt
            ).toLocaleDateString();
            cityEl.innerText = data.city.name;
            tempEl.innerText =
              "The Temperature: " + data.list[i].main.temp + " °C";
            humidityEl.innerText =
              "Humidity: " + data.list[i].main.humidity + "%";
            windSpeedEl.innerText = "Windy speed:  " + data.list[i].wind.speed;
            icon.setAttribute(
              "src",
              "https://openweathermap.org/img/w/" +
                data.list[i].weather[0].icon +
                ".png"
            );

            divEl.append(dateEl, cityEl, tempEl, humidityEl, windSpeedEl, icon);
            forecastListEl.append(divEl);
          }
        }
      });
    }
  });
};

const fetchCurrentWeather = (city) => {
  var apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=metric`;

  fetch(apiUrlWeather)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var lon = data.coord.lon;
          var lat = data.coord.lat;

          const uvCond = (city) => {
            var apiUrlUvCond =
              `https://api.openweathermap.org/data/2.5/uvi?&units=metric&appid=${apiKey}&lat=` +
              lat +
              `&lon=` +
              lon;
            fetch(apiUrlUvCond).then(function (response) {
              if (response.ok) {
                response.json().then(function (uvdata) {
                  console.log(uvdata);
                  let uvCondEl = document.createElement("span");

                  uvCondEl.innerText = "UV Condition: " + uvdata.value;
                  value = uvdata.value;

                  if (value < 3) {
                    uvCondEl.classList.add("btn-success");
                  } else if (value < 7) {
                    uvCondEl.classList.add("btn-warning");
                  } else {
                    uvCondEl.classList.add("btn-danger");
                  }

                  currentweather.append(uvCondEl);
                });
              }
            });
          };

          displayCurrentWeather(data);
          uvCond(data);
          createRow(data.name);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to weather API");
    });
};

function createRow(city) {
  // cityList = []
  let cityIt = document.createElement("btn");
  // cityIt.classList.add("btn");
  cityIt.classList.add("btn-outline-info");
  cityIt.setAttribute("data-city", city);
  cityIt.innerText = city;
  cityList.append(cityIt);
  // console.log("Requested city: " + city);
  // console.log(cityList);
}

const searchCity = (event) => {
  event.preventDefault();
  let search = userCity.value;
  fetchCurrentWeather(search);
  forecast(search);
  userCity.value = "";
};

function getHistory() {
  var hcity = this.getAttribute("data-city");
  console.log(hcity);
  fetchCurrentWeather(hcity);
  forecast(hcity);
}


userFormEl.addEventListener("submit", searchCity);
