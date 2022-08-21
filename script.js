// This is function api json and desplay Weather 

let weather = {
  apiKey: "94b923a3ba6e6a26329e3136f2d21e7f",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  },
  displayWeather: function (data) {},
};
