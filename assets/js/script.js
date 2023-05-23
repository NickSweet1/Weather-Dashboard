var city = document.getElementById("city");
var userCity = document.getElementById("user-city");
var currentWeather = document.querySelector(".current-weather p");
var future = document.querySelector(".future-forcast p");
var nav = document.getElementById("nav");
var apiKey = '762fda56a56eacfff2fbc0b55b63619a';

var day = dayjs().day();
var date = dayjs();
  var weekday = ['Sunday', "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  console.log(date);
  var now = dayjs().format('MM/DD/YYYY');
 nav.append(weekday[day] + ", " + now);



//stores the user city input to local storage
city.addEventListener("submit", function(e) {
    e.preventDefault();
    var cityName = userCity.value;
    localStorage.setItem("city", cityName);
    getCoordinates(cityName)
})

function getCoordinates() {
    var userChoice = localStorage.getItem("city");
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
      currentWeather.innerHTML = '<strong>' + now + '</strong>';
      currentWeather.append( `Temp: ${temperature}`);
      currentWeather.append( `Wind: ${wind}`);
      currentWeather.append(` Humidity: ${humidity}`);
      var day1 = document.getElementById("day-1")
      var day2 = document.getElementById("day-2")
      var day3 = document.getElementById("day-3")
      var day4 = document.getElementById("day-4")
      var day5 = document.getElementById("day-5")
      var days = [day1, day2, day3, day4, day5];
      for (i = 0; i < 5; i++) {
        var temperature = data.list[i * 7].main.temp;
        var wind = data.list[i * 7].wind.speed;
        var humidity = data.list[i * 7].main.humidity;
        var futuredate = date.add(i + 1, 'day').format('MM/DD/YYYY');
        console.log(futuredate)
        days[i].textContent = futuredate + ` Temp: ${temperature}` + ` Wind: ${wind}` + ` Humidity: ${humidity}`;
        // days[i].append(futuredate);
        // days[i].append(` Temp: ${temperature}`);
        // days[i].append(` Wind: ${wind}`);
        // days[i].append(` Humidity: ${humidity}`);
      }
      
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
}
getCoordinates();
