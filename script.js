let weather = {
    apiKey: "4b15f2065129d597c75a0372a770af42",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        const {sunrise} = data.sys;
        const {sunset} = data.sys;
        const sunriseTime = new Date(sunrise*1000);
        const sunriseHours = sunriseTime.getHours();
        const sunriseMinutes = sunriseTime.getMinutes();
        const sunsetTime = new Date(sunset*1000);
        const sunsetHours = sunsetTime.getHours();
        const sunsetMinutes = sunsetTime.getMinutes();
        console.log(name
            , icon
            , description
            , temp
            , humidity
            , speed
            , sunriseHours
            , sunriseMinutes
            , sunsetHours
            , sunsetMinutes
            );
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = Math.round(temp) + " °C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity-text").innerText = humidity + "%";
        document.querySelector(".wind-text").innerText = speed + " km/h";
        document.querySelector(".sunrise-text").innerText = sunriseHours + " : " + sunriseMinutes;
        document.querySelector(".sunset-text").innerText = sunsetHours + " : " + sunsetMinutes;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
    });

    document
        .querySelector(".search-bar")
        .addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
                weather.search();
            }
        })