document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("weather-button");
    const weathearInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-msg");
    const API_Key = "a1a091ced7df95233b46c28cad3f97e9";

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;

        const response = await fetch(url);
        if(!response.ok) {
            throw new error("City not found");
        }
        const data = response.json();
        return data;
    }
    
    function displayWeatherData(data) {
        console.log(data);
        const {name, main, weather} = data;
        cityName.textContent = name;
        temperature.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Description : ${weather[0].description}`;

        // unlocking the display
        weathearInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError() {
        weathearInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
    
    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (city == "") return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

        cityInput.value = "";
    });

})