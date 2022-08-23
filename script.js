// This is function api json and desplay Weather

let weather = {
  apiKey: "94b923a3ba6e6a26329e3136f2d21e7f",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  // Display all the element into the  page
  displayWeather: (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // To get a different photos for each country you search
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
    //console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "Km/h";
    // This a when you reload the page
    document.querySelector(".weather").classList.remove("loading");
  },
  // This is for the search button
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
// Getting the user's location with OpenCage Geocoding API in javascript
let geocode = {
  reverseGeocode: function (latitude, longitude) {
    var api_key = "c287a425beb74d32b44aea7cc93549e9";

    var api_url = "https://api.opencagedata.com/geocode/v1/json";

    var request_url =
      api_url +
      "?" +
      "key=" +
      api_key +
      "&q=" +
      encodeURIComponent(latitude + "," + longitude) +
      "&pretty=1" +
      "&no_annotations=1";

    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward

    var request = new XMLHttpRequest();
    request.open("GET", request_url, true);

    request.onload = function () {
      // see full list of possible response codes:
      // https://opencagedata.com/api#codes

      if (request.status === 200) {
        // Success!
        var data = JSON.parse(request.responseText);
        // console.log(data.results[0].components); // print the location
        weather.fetchWeather(data.results[0].components.state_district);
      } else if (request.status <= 500) {
        // We reached our target server, but it returned an error

        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log("error msg: " + data.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function () {
      // There was a connection error of some sort
      console.log("unable to connect to server");
    };

    request.send(); // make the request
  },
  getLocation: function () {
    function success(data) {
      geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, console.error);
    } else {
      // This a when you reload the page
      weather.fetchWeather("Barcelona");
    }
  },
};

// This is for the search button
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

geocode.getLocation();

function showLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  alert("Latitude : " + latitude + " Longitude: " + longitude);
}

function errorHandler(err) {
  if (err.code == 1) {
    alert("Error: Access is denied!");
  } else if (err.code == 2) {
    alert("Error: Position is unavailable!");
  }
}

function getLocation() {
  if (navigator.geolocation) {
    // timeout at 60000 milliseconds (60 seconds)
    var options = { timeout: 60000 };
    navigator.geolocation.getCurrentPosition(
      showLocation,
      errorHandler,
      options
    );
  } else {
    alert("Sorry, browser does not support geolocation!");
  }
}
