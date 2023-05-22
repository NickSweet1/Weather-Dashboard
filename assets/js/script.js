var city = document.getElementById("city");
var userCity = document.getElementById("user-city");
var currentWeather = document.getElementsByClassName("currentWeather");


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
    //   console.log(data.list[0].main.feels_like); //example of the format to retrive weather variables
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
}
getCoordinates();
