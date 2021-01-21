// Event listener for all button elements
$("#citySearch").on("submit", function (event) {
  event.preventDefault();
  console.log("click registered");

  var city = $("#input-city").val();

  //   var today = date
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=7c6c4a90f3674b080b9c698fb64961da&units=imperial";
  // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (currentWeather) {
    console.log(currentWeather);
    console.log(currentWeather.coord.lat);
    console.log(currentWeather.coord.lon);

    var date = new Date(currentWeather.dt * 1000);
    var finalDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

    $("#cityName").text(currentWeather.name + " (" + finalDate + ")");
    $("#temp").text("Temperature: " + currentWeather.main.temp + "° F");
    $("#humidity").text("Humidity: " + currentWeather.main.humidity + "%");
    $("#wind-speed").text("Wind Speed: " + currentWeather.wind.speed + " MPH");

    var lat = currentWeather.coord.lat;
    var lon = currentWeather.coord.lon;
    var oneCallURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly&appid=7c6c4a90f3674b080b9c698fb64961da&units=imperial";

    //i need to get the long and lat for the one call api
    $.ajax({
      url: oneCallURL,
      method: "GET",
    }).then(function (oneCall) {
      $("#uv-index").text(oneCall.current.uvi);

      var forecastDate = new Date(oneCall.daily[1].dt * 1000);
      var finalForecastDate =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

      for (var i = 1; i < 6; i++) {
        var finalForecastDate = finalForecastDate[i];
        //   console.log(finalForecastDate);
      }

      var forecastDays = ["#day1", "#day2", "#day3", "#day4", "#day5"];
      for (var d = 0; d < forecastDays.length; i++) {
        var forecastDays = forecastDays[d];
        //   console.log(forecastDays);
      }

      $(forecastDays).html(`
      <h6>${finalForecastDate}</h6>
      <p>Temperature: ${oneCall.daily[1].temp.day}° F</p>
      <p>Humidity: ${oneCall.daily[1].humidity}%</p>`);

      //   $("#day1").html(`
      //   <h6>${finalForecastDate}</h6>
      //   <p>Temperature: ${oneCall.daily[1].temp.day}° F</p>
      //   <p>Humidity: ${oneCall.daily[1].humidity}%</p>`);

      //   $("#day2").text(oneCall.daily[1]);
      //   $("#day3").text(oneCall.daily[2]);
      //   $("#day4").text(oneCall.daily[3]);
      //   $("#day5").text(oneCall.daily[4]);
    });
  });
});
