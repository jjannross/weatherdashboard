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

    $.ajax({
      url: oneCallURL,
      method: "GET",
    }).then(function (oneCall) {
      console.log(oneCall);
      $("#uv-index").text(oneCall.current.uvi);

      // attempt at change uv index//
      // var uv = $("#uv-index").text(oneCall.current.uvi);
      // if (uv  3)
      // else if (uv < 6)
      // else if (uv < 10)
      // $("#cityName").append(oneCall.current.weather[0].icon);

      //  attempt at get icon//
      var iconcode = oneCall.current.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
      console.log(iconurl);
      $("#wicon").attr("src", iconurl);

      $("#day1").text(oneCall.daily[0]);
      $("#day2").text(oneCall.daily[1]);
      $("#day3").text(oneCall.daily[2]);
      $("#day4").text(oneCall.daily[3]);
      $("#day5").text(oneCall.daily[4]);
      console.log(oneCall);
      // //trying to get 5 day fore
      var forecastDate = new Date(oneCall.daily[1].dt * 1000);
      var dateArray = [];

      for (var i = 1; i < 6; i++) {
        var finalForecastDate = finalForecastDate[i];
        var finalForecastDate =
          date.getMonth() +
          1 +
          "/" +
          (date.getDate() + i) +
          "/" +
          date.getFullYear();
        dateArray.push(finalForecastDate);
      }
      console.log(dateArray);

      for (var d = 0; d < forecastDays.length; d++) {
        var forecastDays = forecastDays[d];
        console.log(forecastDays);
      }

      $(forecastDays).html(`
      <h6>${finalForecastDate}</h6>
      <p>Temperature: ${oneCall.daily[1].temp.day}° F</p>
      <p>Humidity: ${oneCall.daily[1].humidity}%</p>`);

      // $("#day1").html(`
      //   <h6>${forecastDays[0]}</h6>
      //   <p>Temperature: ${oneCall.daily[1].temp.day}° F</p>
      //   <p>Humidity: ${oneCall.daily[1].humidity}%</p>`);

      // $("#day2").html(`
      //   <h6>${finalForecastDate}</h6>
      //   <p>Temperature: ${oneCall.daily[1].temp.day}° F</p>
      //   <p>Humidity: ${oneCall.daily[1].humidity}%</p>`);

      //   $("#day2").text(oneCall.daily[1]);
      //   $("#day3").text(oneCall.daily[2]);
      //   $("#day4").text(oneCall.daily[3]);
      //   $("#day5").text(oneCall.daily[4]);

      //attempt at local storage//
    });
  });
});
