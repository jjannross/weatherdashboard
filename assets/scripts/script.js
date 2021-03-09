// Event listener for all button elements
$("#citySearch").on("submit", function (event) {
  event.preventDefault();

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
      $("#uv-index").text(oneCall.current.uvi);

      $("#uv-index").each(function () {
        var value = oneCall.current.uvi;
        if (value <= 2) {
          $("#uv-index").addClass("btn btn bg-success");
        } else if (value >= 6) {
          $("#uv-index").addClass("btn btn bg-danger");
        } else if (value >= 3) {
          $("#uv-index").addClass("btn btn bg-warning");
        }
      });

      // //trying to get 5 day fore
      var forecastDate = new Date(oneCall.daily[1].dt * 1000);
      var dateArray = [];

      for (var i = 1; i < 6; i++) {
        var finalForecastDate = oneCall.daily[i];
        var finalForecastDate =
          date.getMonth() +
          1 +
          "/" +
          (date.getDate() + i) +
          "/" +
          date.getFullYear();
        dateArray.push(finalForecastDate);
        $("#day" + i).html(`
      <h6>${dateArray[i - 1]}</h6>
      <p>Temperature: ${oneCall.daily[i].temp.day}° F</p>
      <p>Humidity: ${oneCall.daily[i].humidity}%</p>`);
      }

      var futureIconID1 = oneCall.current.weather[0].icon;
      var futureIconURL1 =
        "https://openweathermap.org/img/w/" + futureIconID1 + ".png";
      var futureIcon1 = $("<img>").attr("src", futureIconURL1);
      $(".futureIcon1").empty();
      $(".futureIcon1").append(futureIcon1);
      console.log(futureIcon1);

      var futureIconID2 = oneCall.current.weather[0].icon;
      var futureIconURL2 =
        "https://openweathermap.org/img/w/" + futureIconID2 + ".png";
      var futureIcon2 = $("<img>").attr("src", futureIconURL2);
      $(".futureIcon2").empty();
      $(".futureIcon2").append(futureIcon2);

      var futureIconID3 = oneCall.current.weather[0].icon;
      var futureIconURL3 =
        "https://openweathermap.org/img/w/" + futureIconID3 + ".png";
      var futureIcon3 = $("<img>").attr("src", futureIconURL3);
      $(".futureIcon3").empty();
      $(".futureIcon3").append(futureIcon3);

      var futureIconID4 = oneCall.current.weather[0].icon;
      var futureIconURL4 =
        "https://openweathermap.org/img/w/" + futureIconID4 + ".png";
      var futureIcon4 = $("<img>").attr("src", futureIconURL4);
      $(".futureIcon4").empty();
      $(".futureIcon4").append(futureIcon4);

      var futureIconID5 = oneCall.current.weather[0].icon;
      var futureIconURL5 =
        "https://openweathermap.org/img/w/" + futureIconID5 + ".png";
      var futureIcon5 = $("<img>").attr("src", futureIconURL5);
      $(".futureIcon5").empty();
      $(".futureIcon5").append(futureIcon5);

      //attempt at local storage//
      // var searchedCitiesInput = $("#input-city");

      // var citySearchForm = $("#citySearch");

      // function storesearchedCities() {
      //   var searchedCities = localStorage.getItem("searched") || "[]";
      //   var parsedSearched = JSON.parse(searchedCities);
      //   parsedSearched.push(searchedCitiesInput.val());
      //   searchedCitiesInput.value = "";
      //   localStorage.setItem("searched", JSON.stringify(parsedSearched));
      // }
    });
  });
});
