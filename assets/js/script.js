var userFormEl = document.querySelector('#user-form');
var currentweather = document.querySelector('.currentweather');
var cityList = document.querySelector('#city-list');
// var forecast = document.querySelector('#forecast');
var userCity = document.querySelector('#userCity');
var forecastListEl = document.querySelector('#forecast-list');
const apiKey = '5f95d7a679cab867a94961cf83fc403f';

const displayCurrentWeather=(data)=>{
    let dateEl = document.createElement("h2");
    let cityEl = document.createElement("h2");
    let tempEl = document.createElement("p");
    let humidityEl = document.createElement("p");
    let windSpeedEl= document.createElement("p");
    let icon = document.createElement("img");
    dateEl.innerText = (new Date().toLocaleDateString());
    cityEl.innerText = (data.name);
    tempEl.innerText = ("The Temperature: " + data.main.temp);
    humidityEl.innerText = ("Humidity: " +data.main.humidity + "%");
    windSpeedEl.innerText = ("Windy speed:  "+data.wind.speed);
    icon.setAttribute("src","https://openweathermap.org/img/w/"+data.weather[0].icon+".png")



    currentweather.append(dateEl,cityEl,tempEl,humidityEl,windSpeedEl, icon);

}

const forecast=(city) =>{
  var apiUrlWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`

  fetch(apiUrlWeather)
  .then(function (response) {

      if (response.ok) {
        response.json().then(function (data) {
        for (var i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          
          console.log(data);
     
          displayCurrentWeather(data);
            }}})}})    };
  
const fetchCurrentWeather =(city) =>{
    var apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=metric`
    fetch(apiUrlWeather)
    .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
          console.log(data);
     
          displayCurrentWeather(data);
          forecast(city);
          createRow(data.name)

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to weather API');
    });

}

function createRow(city) {
// cityList = []
let cityIt = document.createElement("li");

cityIt.innerText=(city)
  cityList.append(cityIt);
  console.log("Requested city: " + city );
  console.log(cityList);

}
const searchCity = (event)=>{
    event.preventDefault();
    let search = userCity.value;
    fetchCurrentWeather(search);
    userCity.value = '';


}


userFormEl.addEventListener('submit',searchCity);