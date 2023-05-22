var city = document.getElementById("city");
var userCity = document.getElementById("user-city");
var currentWeather = document.querySelector(".current-weather p");
var future = document.querySelector(".future-forcast p");

//stores the user city input to local storage
city.addEventListener("submit", function(e) {
    e.preventDefault();
    var cityName = userCity.value;
    localStorage.setItem("city", cityName);
    getCoordinates(cityName)
})

function getCoordinates() {
    var userChoice = localStorage.getItem("city");
    var apiKey = '762fda56a56eacfff2fbc0b55b63619a' ;
    var apiCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${userChoice}&appid=${apiKey}`;
    fetch(apiCoordinates)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            console.log(data);
            var latitude = data[0].lat;
            var longitude = data[0].lon;
            getWeather(latitude, longitude);
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
        
    }

function getWeather(latitude, longitude) {
    var apiKey = '762fda56a56eacfff2fbc0b55b63619a';
    var apiWeather = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetch(apiWeather)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      var temperature = data.list[0].main.temp;
      var wind = data.list[0].wind.speed;
      var humidity = data.list[0].main.humidity;
      currentWeather.textContent = `Temp: ${temperature}`;
      currentWeather.append(`Wind: ${wind}`);
      currentWeather.append(` Humidity: ${humidity}`);
      for (i = 1; i < 6; i++) {
        var temperature = data.list[i * 7].main.temp;
        var wind = data.list[i * 7].wind.speed;
        var humidity = data.list[i * 7].main.humidity;
        future.append(` Temp: ${temperature}`);
        future.append(` Wind: ${wind}`);
        future.append(` Humidity: ${humidity}`);
        console.log(i);
      }
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
}
getCoordinates();
