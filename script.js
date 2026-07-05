const apiKey = "9fc3ad6ae85e71809ca3569e30a96cba";

async function getWeather() {

    const city = document.getElementById("city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();

        document.getElementById("cityName").innerText =
            data.name + ", " + data.sys.country;

        document.getElementById("temp").innerText =
            data.main.temp + " °C";

        document.getElementById("desc").innerText =
            data.weather[0].description;

        document.getElementById("humidity").innerText =
            data.main.humidity;

        document.getElementById("wind").innerText =
            data.wind.speed;

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("error").innerText = "";

    } catch (error) {

        document.getElementById("error").innerText =
            "Invalid city name. Please try again.";

    }

}