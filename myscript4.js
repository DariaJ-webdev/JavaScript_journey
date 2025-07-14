document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the stored assistant's name from localStorage
    const chosenAssistantName = localStorage.getItem('chosenAssistant');
    const chosenAssistantElement = document.getElementById('chosenAssistant');

    if (chosenAssistantName && chosenAssistantElement) {
        chosenAssistantElement.textContent = chosenAssistantName;
    } else {
        console.warn("No assistant found in local storage or target element missing.");
        if (chosenAssistantElement) {
            chosenAssistantElement.textContent = "someone (error)";
        }
    }

    // --- Clock ---
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock();
    setInterval(updateClock, 1000);

    // --- Temperature Conversion App ---
    const textBox = document.getElementById("textBox");
    const toFahrenheit = document.getElementById("toFahrenheit");
    const toCelsius = document.getElementById("toCelsius");
    const result = document.getElementById("result");

    window.convert = function () {
        let temp;

        if (toFahrenheit.checked) {
            temp = Number(textBox.value);
            temp = temp * 9 / 5 + 32;
            result.textContent = temp.toFixed(1) + "°F";
        } else if (toCelsius.checked) {
            temp = Number(textBox.value);
            temp = (temp - 32) * (5 / 9);
            result.textContent = temp.toFixed(1) + "°C";
        } else {
            result.textContent = "Select a unit";
        }
    };

    // --- Gas Conversion App ---
    const textBoxGas = document.getElementById("textBoxGas");
    const toGallons = document.getElementById("toGallons");
    const toLiters = document.getElementById("toLiters");
    const resultG = document.getElementById("resultG");

    window.convertGas = function () {
        let vol;

        if (toGallons.checked) {
            vol = Number(textBoxGas.value);
            vol = vol / 3.78541;
            resultG.textContent = vol.toFixed(2) + " Gal";
        } else if (toLiters.checked) {
            vol = Number(textBoxGas.value);
            vol = vol * 3.78541;
            resultG.textContent = vol.toFixed(2) + " L";
        } else {
            resultG.textContent = "Select the original unit";
        }
    };

    // --- Race Button Navigation ---
    const destinationButton = document.getElementById('race');
    if (destinationButton) {
        destinationButton.addEventListener('click', () => {
            window.location.href = 'finale.html';
        });
    }
});

// --- Weather App ---
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "176465f10d5be8c65a5b1157a20205f6";

let cityList = [];
async function loadCityList() {
    try {
        const response = await fetch('city.list.json/city.list.json');
        if (!response.ok) throw new Error('Could not load city list JSON.');
        cityList = await response.json();
        console.log('City list loaded successfully.');
    } catch (error) {
        console.error('Error loading city list:', error);
        displayError('Could not load city data');
    }
}
loadCityList();

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const cityName = cityInput.value.trim();

    if (cityName) {
        const foundCity = cityList.find(city => city.name.toLowerCase() === cityName.toLowerCase());

        if (foundCity) {
            try {
                const weatherData = await getWeatherData(foundCity.id);
                displayWeatherInfo(weatherData);
            } catch (error) {
                console.error(error);
                displayError(error.message);
            }
        } else {
            displayError("Please enter a valid city name.");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(cityId) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=imperial`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    card.textContent = "";
    card.style.display = "flex";

    const {
        name: cityName,
        main: { temp, humidity },
        weather: [{ description, id }],
        wind: { speed: windSpeed }
    } = data;

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const windDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // Set the content of the elementscityDisplay.style.marginBottom = "0.3rem";
    cityDisplay.style.marginBottom = "0.1rem";
    tempDisplay.style.marginBottom = "0.05rem";
    descDisplay.style.marginBottom = "0.05rem";
    humidityDisplay.style.marginBottom = "0.05rem";
    windDisplay.style.marginBottom = "0.05rem";
    weatherEmoji.style.marginTop = "0.025rem";

    


    
    cityDisplay.textContent = cityName;
    tempDisplay.textContent = `${temp.toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    windDisplay.textContent = `Wind Speed: ${windSpeed} mph`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    windDisplay.classList.add("windDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(windDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300): return "⛈️";
        case (weatherId >= 300 && weatherId < 400): return "🌧️";
        case (weatherId >= 500 && weatherId < 600): return "☔";
        case (weatherId >= 600 && weatherId < 700): return "❄️";
        case (weatherId >= 700 && weatherId < 800): return "🌫️";
        case (weatherId === 800): return "☀️";
        case (weatherId >= 801 && weatherId < 810): return "☁️";
        default: return "❓";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
