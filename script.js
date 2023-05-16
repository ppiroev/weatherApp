const weatherAPIKEY = "4655a96f90547018072efbc65f9b0f5f";

const background = document.querySelector('.content');
const searchBtn = document.querySelector('.search-button');
const weatherInfo = document.querySelector('.current-weather-data');
const currentTemp = document.querySelector('.current-temp');
const feelsLike = document.querySelector('.feels-like');
const maxTemp = document.querySelector('.max-temp');
const minTemp = document.querySelector('.min-temp');
const descriptionWeather = document.querySelector('.description');
const img = document.querySelector('img');
const form = document.querySelector('form');
const cityName = document.querySelector('.city-name');
const weatherIcon = document.querySelector('.weather-icon');
const p = document.querySelectorAll('p');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function getWeatherData(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPIKEY}&units=metric`, {mode: 'cors'})
        const weatherData = await response.json();
        return { 
            cityName : weatherData.name,
            temp : weatherData.main,
            wind : weatherData.wind,
            description : weatherData.weather[0],
    };
    }
    catch (e) {
        console.log(e);
    }
}

async function displayWeatherData(location) {
    const weatherData = await getWeatherData(location);
    const tempData = weatherData.temp
    const description = weatherData.description
    const windData = weatherData.wind
    const humidityData = tempData.humidity
    const icon = description.icon

    changeBackground(description.description);
    cityName.textContent = `${weatherData.cityName}`;
    descriptionWeather.textContent = `${description.description}`
    currentTemp.textContent = `${Math.round(tempData.temp)} °C`;
    feelsLike.textContent = `Feels like: ${Math.round(tempData.feels_like)} °C`;
    maxTemp.textContent = `Max: ${Math.round(tempData.temp_max)} °C`;
    minTemp.textContent = `Min: ${Math.round(tempData.temp_min)} °C`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    wind.textContent = `Wind: ${windData.speed} m/s`
    humidity.textContent = `Humidity: ${humidityData}%`;
    
}

searchBtn.addEventListener('click', (e) => {
    const location = document.querySelector('input').value;
    displayWeatherData(location);
    e.preventDefault();
    form.reset();
})

displayWeatherData("Sofia");


function changeBackground(weather){
    switch (weather) {
        case "clear sky" || "few clouds":
            background.style.backgroundImage = "url(img/clearsky.jpg)";
            break;
        case "broken clouds" || "scattered clouds":
            background.style.backgroundImage = "url(img/cloudy.jpg)";
            break;
        case "shower rain" || "rain":
            background.style.backgroundImage = "url(img/rain.png)";
            p.forEach(e =>{
                e.style.color = "white";
            })
            break;
        case    "light rain":
            background.style.backgroundImage = "url(img/rain.png)";
            p.forEach(e =>{
                e.style.color = "white";
            })
            break;    
        case "thunderstorm":
            background.style.backgroundImage = "url(img/thunderstorm.jpg)";
            break;
        case "snow":
            background.style.backgroundImage = "url(img/snow.jpg)";
            break;
        case "mist":
            background.style.backgroundImage = "url(img/mist.jpg)";
            p.forEach(e =>{
                e.style.color = "white";
            })
            break;
        case "fog":
            background.style.backgroundImage = "url(img/mist.jpg)";
            p.forEach(e =>{
                e.style.color = "white";
            })
            break;
        default:
            break;
    }
}