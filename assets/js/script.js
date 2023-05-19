var city = document.getElementById("city");
var userCity = document.getElementById("user-city");



//stores the user city input to local storage
city.addEventListener("submit", function(e) {
    e.preventDefault();
    var cityName = userCity.value;
    localStorage.setItem("city", cityName);
})

function getCoordinates() {
    var apiKey = "762fda56a56eacfff2fbc0b55b63619a";
    var apiCoordinates = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=${apiKey}";
    fetch(apiCoordinates)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            console.log(data);
        })

}


getCoordinates();