//grabbing ids and classes from html
var city = document.getElementById("city");
var userCity = document.getElementById("user-city");
var currentWeather = document.querySelector(".current-weather p");
var future = document.querySelector(".future-forcast p");
var nav = document.getElementById("nav");
var apiKey = "762fda56a56eacfff2fbc0b55b63619a";
var historyList = document.querySelector(".history ul");
  //sets the date
var day = dayjs().day();
var date = dayjs();
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
//prints the current date
var now = dayjs().format("MM/DD/YYYY");
nav.append(weekday[day] + ", " + now);

//stores the user city input to local storage
city.addEventListener("submit", function (e) {
  e.preventDefault();
  var cityName = userCity.value;

  localStorage.setItem("city", cityName);

  cityName ? getCoordinates(cityName) : " ";
});


//gets the latitude and longitude for the city searched
function getCoordinates() {
  var userChoice = localStorage.getItem("city");
  var apiCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${userChoice}&appid=${apiKey}`;
  fetch(apiCoordinates)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      getWeather(latitude, longitude);

      var cityName = userCity.value;
      var listItem = document.createElement("button");
      listItem.textContent = cityName;
      listItem.classList.add("history-button");
      historyList.appendChild(listItem);
      
      listItem.addEventListener("click", function (e) {
        e.preventDefault();
        var cityHistory = this.textContent;
        localStorage.setItem("city", cityHistory);
        userCity.value = cityHistory;
        getCoordinates(cityHistory);
      });
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

//gets weather from the coordinates
function getWeather(latitude, longitude) {
  var apiWeather = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  fetch(apiWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //grabs all the specific days
      var day1 = document.getElementById("day-1");
      var day2 = document.getElementById("day-2");
      var day3 = document.getElementById("day-3");
      var day4 = document.getElementById("day-4");
      var day5 = document.getElementById("day-5");
      var day6 = document.getElementById("day-6");
      var days = [day1, day2, day3, day4, day5, day6];
      //itterates through the days to pring the needed information from the api
      for (i = 0; i < 6; i++) {
        var temperature = data.list[i * 6].main.temp;
        var wind = data.list[i * 6].wind.speed;
        var humidity = data.list[i * 6].main.humidity;
        var futuredate = date.add(i, "day").format("MM/DD/YYYY");
        var icon = `https://openweathermap.org/img/wn/${
          data.list[i * 6].weather[0].icon
        }@2x.png`;
        console.log(futuredate);
        days[i].innerHTML =
          userCity.value +
          `<img class="weather-icon" src=${icon} alt="weather icon"/>` +
          futuredate +
          ` Temp: ${temperature} \u00B0F` +
          ` Wind: ${wind} MPH` +
          ` Humidity: ${humidity} %`;
      }
    })
    //logs error if something goes wrong
    .catch(function (error) {
      console.log("Error:", error);
    });
}
