function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#weather-description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#weather-icon");
    let dateElement = document.querySelector("#current-date");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    dateElement.innerHTML = formatDate(new Date());
    
    // Use SheCodes weather icon directly
    iconElement.src = response.data.condition.icon_url;
}

function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value.trim();

    if (city) {
        let apiKey = "df0784t786f3bo13067efba6f53aff47";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayTemperature);
    }
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
}

// Set up event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Set up form submission
    let searchForm = document.querySelector("#search-form");
    searchForm.addEventListener("submit", search);

    // Load Dallas weather by default
    let apiKey = "df0784t786f3bo13067efba6f53aff47";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Dallas&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}); 