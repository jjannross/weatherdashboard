//TO DO:
// 1. set up 3 API Keys to include, temp, humidity, wind speed, uv index and 5 day forcast
//2. save searched city to local storage
//3. append previously searched cities to right sidebar

// Event listener for all button elements
$("#citySearch").on("submit", function (event) {
  event.preventDefault();
  var city = $("#input-city").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=7c6c4a90f3674b080b9c698fb64961da&units=imperial";
  // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (currentforecast) {
    $("#cityName").text(response.name);
    $("#temp").text(response.main.temp);
    $("#humidity").text(response.main.humidity);
    $("#wind-speed").text(response.wind[0]);

    var oneCallURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly,&appid=7c6c4a90f3674b080b9c698fb64961da";
    var lat = $("#input-city").val(response.city.coord[0]);
    var lon = $("#input-city").val(response.city.coord[1]);

    //i need to get the long and lat for the one call api
    $.ajax({
      url: oneCallURL,
      method: "GET",
    }).then(function (onecall) {
      $("#uv-index").text(response.current[8]);
      $("#day1").text(response.daily[0]);
      $("#day2").text(response.daily[1]);
      $("#day3").text(response.daily[2]);
      $("#day4").text(response.daily[3]);
      $("#day5").text(response.daily[4]);
    });
  });
});
