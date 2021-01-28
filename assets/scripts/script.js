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

      //attempt at local storage//
      var searchedCitiesInput = $("#input-city");

      var citySearchForm = $("#citySearch");

      function storesearchedCities() {
        var searchedCities = localStorage.getItem("searched") || "[]";
        var parsedSearched = JSON.parse(searchedCities);
        parsedSearched.push(searchedCitiesInput.val());
        searchedCitiesInput.value = "";
        localStorage.setItem("searched", JSON.stringify(parsedSearched));
      }

      storesearchedCities();

      function rendersearchedCities() {
        var searchedCities = localStorage.getItem("searched") || "[]";
        var parsedSearched = JSON.parse(searchedCities);
        console.log(searchedCities);
        searchedCities.innterHTML = "";
        // var cityList = $("#searched");

        for (var i = 0; i < searchedCities.length; i++) {
          var searchedCities = searchedCities[i];

          $("#searched" + i).html(`
          <h6>${searchedCities[i]}</h6>;`);
        }
        rendersearchedCities();
      }
     searchedCities.addEventListener("click", function(event) {
        var element = event.target;
      
        // If that element is a button...
        if (element.matches("searchBtn") === true) {
          // // Get its data-index value and remove the todo element from the list
          // var index = element.parentElement.getAttribute("data-index");
          // todos.splice(index, 1);
      
          // Store updated todos in localStorage, re-render the list
          storesearchedCities();
          rendersearchedCities();
    });
  });
  
});
