//TO DO:
// 1. set up 3 API Keys to include, temp, humidity, wind speed, uv index and 5 day forcast
//2. save searched city to local storage
//3. append previously searched cities to right sidebar

console.log("loaded");

// Event listener for all button elements
$("#citySearch").on("submit", function (event) {
  event.preventDefault();
  console.log("click registered");

  var city = $("#input-city").val();
  var date = new Date();
  //   var today = date
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=7c6c4a90f3674b080b9c698fb64961da&units=imperial";
  // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (currentForecast) {
    console.log(currentForecast);
    console.log(currentForecast.city.coord.lat);
    console.log(currentForecast.city.coord.lon);

    $("#cityName").text(currentForecast.city.name + " (" + date + ")");
    $("#temp").text(
      "Temperature: " + currentForecast.list[0].main.temp + "° F"
    );
    $("#humidity").text(
      "Humidity: " + currentForecast.list[0].main.humidity + "%"
    );
    $("#wind-speed").text(
      "Wind Speed: " + currentForecast.list[0].wind.speed + " MPH"
    );

    var lat = currentForecast.city.coord.lat;
    var lon = currentForecast.city.coord.lon;
    var oneCallURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly,&appid=7c6c4a90f3674b080b9c698fb64961da";

    //i need to get the long and lat for the one call api
    $.ajax({
      url: oneCallURL,
      method: "GET",
    }).then(function (oneCall) {
      //   var uv = oneCall.current.uvi;

      $("#uv-index").text(oneCall.current.uvi);
      //   $("#uv-index").text("UV Index: " + uv);
      //   $(uv).attr(background - color, red);
      $("#day1").text(oneCall.daily[0]);
      $("#day2").text(oneCall.daily[1]);
      $("#day3").text(oneCall.daily[2]);
      $("#day4").text(oneCall.daily[3]);
      $("#day5").text(oneCall.daily[4]);
      console.log(oneCall);
    });
  });
});
