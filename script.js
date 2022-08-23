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

// This a when you reload the page
weather.fetchWeather("Barcelona");
