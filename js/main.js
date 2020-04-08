(function (global, doc) {
    let address;
    let weather;
    let date = new Date();
    let dayState = "day"

    $("#date").text(date.toDateString());
    fetch("https://ipinfo.io/json?token=09abe359294ed6")
        .then((res) => getAddress(res))
        .then(() => getWeather())
        .catch();

    async function getAddress(res) {
        address = await res.json();
        address.lat = address.loc.split(',')[0];
        address.long = address.loc.split(',')[1];
        delete address.loc;
        $("#location").text(`${address.city}, ${address.country}`);
    }
    async function getWeather() {
        let appid = "APPID=9c31c558c286f7406b9c343f33ee4611"
        let res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${address.lat}&lon=${address.long}&${appid}&units=metric`);
        weather = await res.json();
        renderWeather();
        console.log(weather);
    }
    let renderWeather = () => {
        $("#temperature").empty();
        $("#temperature").append(`${weather.main.temp} <i id="icon-thermometer" class="wi wi-thermometer"></i>`);
        $("#humidity").text(`${weather.main.humidity}%`);
        $("#wind").text(`${weather.wind.speed}Km/hr`);
        $("#visibility").text(`${weather.main.pressure}hPa`);
        let currentTime = date / 1000;
        currentTime < weather.sys.sunset ? "day" : "night"
        $("#description").empty();
        $("#description").append(`<i id="icon-desc" class="wi wi-owm-${dayState}-${weather.weather[0].id}"></i><p>${weather.weather[0].description}</p>`)
    }

}(this, document));