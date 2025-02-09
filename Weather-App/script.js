

const yourtab = document.querySelector(".your-weather");
const searchtab = document.querySelector(".search-weather");
const grantUI = document.querySelector(".grant-location");
const grantbtn = document.querySelector(".loc");
const loadingUI = document.querySelector(".loading");
const input_field = document.querySelector("[input-field]");
const searchbtn = document.querySelector("[btn-search]");
const weatherUI = document.querySelector(".user-info");
const searchform = document.querySelector("#search-tab");
const vid = document.querySelector(".src");
const video = document.querySelector(".vid");
const volume = document.querySelector(".volo");
const novolume = document.querySelector(".xmark");
const videox = document.querySelector(".vide");
const novideo = document.querySelector(".slash");
novideo.classList.add("remove");
volume.classList.add("remove");
const videobtn = document.querySelector("#videox");
const volumebtn = document.querySelector(".voice1");
const prop = {};
const api = "60303b0f3ae8644b3632967cc2fb9480";
let currenttab = yourtab;
currenttab.classList.add("current-tab");
grantbtn.addEventListener('click', getlocation);
yourtab.addEventListener('click', () => { switchtab(yourtab); });
searchtab.addEventListener('click', () => { switchtab(searchtab); });
const msg = new SpeechSynthesisUtterance();
const err = document.querySelector(".error");

function getlocation() {
    stop();
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(usercoords);
    }
    else {
        alert('Location Permission Denied, Unable to detect Weather');
    }
}

function usercoords(position) {
    const coordinates = {
        lats: position.coords.latitude,
        long: position.coords.longitude,
    };
    sessionStorage.setItem('user-coords', JSON.stringify(coordinates));
    fetchuserweather(coordinates);
}

async function fetchuserweather(position) {
    const lat = position.lats;
    const lon = position.long;

    grantUI.classList.remove("active");
    weatherUI.classList.remove("active");
    loadingUI.classList.add("active");
    volume.classList.add("remove");
    novolume.classList.remove("remove");
    window.speechSynthesis.cancel(msg);
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`);
        const data = await response.json();
        loadingUI.classList.remove("active");
        err.classList.remove("active");
        weatherUI.classList.add("active");
        volumebtn.classList.add("active");
        videobtn.classList.add("active");
        renderinfo(data);
        Object.assign(prop, data);
    }
    catch {
        loadingUI.classList.remove("active");
        err.classList.add("active");
    }
}
async function displayStoredWeather() {
    try {
        const response = await fetch('/api/weather');
        const weatherData = await response.json();

        const weatherList = document.createElement('div');
        weatherList.classList.add('stored-weather');

        weatherData.forEach(data => {
            const weatherItem = document.createElement('p');
            weatherItem.innerText = `${data.city}, ${data.country}: ${data.temperature} °C`;
            weatherList.appendChild(weatherItem);
        });

        document.body.appendChild(weatherList); // Append to body or a specific section
    } catch (error) {
        console.error('Error fetching stored weather data:', error);
    }
}

// Call this function on page load
window.onload = displayStoredWeather;

function renderinfo(stats) {
    const cityname = document.querySelector("[city-name]");
    const countryicon = document.querySelector("[country-icon]");
    const weatherdes = document.querySelector("[weather-desc]");
    const weathericon = document.querySelector("[weather-icon]");
    const temp = document.querySelector("[temp]");
    const windspeed = document.querySelector("[windspeed]");
    const humidity = document.querySelector("[humidity]");
    const cloud = document.querySelector("[cloud]");
    const clothingRecommendation = document.getElementById("clothing-recommendation");

    cityname.innerText = stats?.name;
    countryicon.src = `https://flagcdn.com/144x108/${stats?.sys?.country.toLowerCase()}.png`;
    weatherdes.innerText = stats?.weather[0]?.description;
    weathericon.src = `https://openweathermap.org/img/wn/${stats?.weather[0]?.icon}.png`;

    // Get the temperature in Celsius
    const tempCelsius = stats?.main?.temp;

    // Convert to Kelvin and Fahrenheit
    const tempKelvin = tempCelsius + 273.15;
    const tempFahrenheit = (tempCelsius * 9 / 5) + 32;

    // Update temperature display
    temp.innerText = `${tempCelsius} °C / ${tempFahrenheit.toFixed(2)} °F`;

    windspeed.innerText = `${stats?.wind?.speed} m/s`;
    humidity.innerText = `${stats?.main?.humidity}%`;
    cloud.innerText = `${stats?.clouds?.all}%`;

    const main = stats?.weather[0]?.main;
    bgchange(main);

    // Hide all clothing options initially
    document.querySelectorAll('.clothing').forEach(el => {
        el.style.display = 'none';
    });

    // Clothing recommendation logic
    if (main === "Clear") {
        clothingRecommendation.innerText = "It's a clear day! Wear light clothing.";
        document.querySelector('.clear').style.display = 'block';
    } else if (main === "Thunderstorm") {
        clothingRecommendation.innerText = "It's stormy! Wear a raincoat.";
        document.querySelector('.thunder').style.display = 'block';
    } else if (main === "Drizzle" || main === "Rain") {
        clothingRecommendation.innerText = "It's rainy! Don't forget an umbrella.";
        document.querySelector('.rain').style.display = 'block';
    } else if (main === "Snow") {
        clothingRecommendation.innerText = "It's snowy! Dress warmly.";
        document.querySelector('.winter').style.display = 'block';
    } else if (["Mist", "Smoke", "Haze", "Dust", "Fog"].includes(main)) {
        clothingRecommendation.innerText = "It's foggy! Wear layers.";
        document.querySelector('.fog').style.display = 'block';
    } else if (main === "Clouds") {
        clothingRecommendation.innerText = "It's cloudy! A light jacket would be a good choice.";
        document.querySelector('.clouds').style.display = 'block';
    } else {
        clothingRecommendation.innerText = "Check the weather conditions and dress accordingly!";
    }
}


function switchtab(clickedtab) {
    if (clickedtab != currenttab) {
        currenttab.classList.remove("current-tab");
        currenttab = clickedtab;
        currenttab.classList.add("current-tab");
        video.classList.add("remove");
        stop();
    }
    if (!searchform.classList.contains("active")) {
        weatherUI.classList.remove("active");
        volumebtn.classList.remove("active");
        videobtn.classList.remove("active");
        grantUI.classList.remove("active");
        err.classList.remove("active");
        searchform.classList.add("active");
    }
    else {
        searchform.classList.remove("active");
        weatherUI.classList.remove("active");
        volumebtn.classList.remove("active");
        videobtn.classList.remove("active");
        err.classList.remove("active");
        getsessionstorage();
        video.classList.remove("remove");
    }
}

function getsessionstorage() {
    const localcord = sessionStorage.getItem('user-coords');
    if (localcord) {
        const coordinate = JSON.parse(localcord);
        fetchuserweather(coordinate);
    }
    else {
        grantUI.classList.add("active");
    }

}

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input_field.value == "") return;
    else fetchsearchweather(input_field.value);
});

async function fetchsearchweather(loc) {
    loadingUI.classList.add("active");
    weatherUI.classList.remove("active");
    volumebtn.classList.remove("active");
    videobtn.classList.remove("active");
    grantUI.classList.remove("active");
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${api}&units=metric`);
        const data = await response.json();
        loadingUI.classList.remove("active");
        weatherUI.classList.add("active");
        volumebtn.classList.add("active");
        videobtn.classList.add("active");
        renderinfo(data);
        Object.assign(prop, data);
    }
    catch {
        loadingUI.classList.remove("active");
        err.classList.add("active");
    }
}
getsessionstorage();

function bgchange(main) {
    video.classList.remove("remove");
    if (main == "Clear") {
        vid.src = "video/clear.mp4";
        video.load();
    }
    else if (main == "Thunderstorm") {
        vid.src = "video/light.mp4";
        video.load();
    }
    else if (main == "Drizzle" || main == "Rain") {
        vid.src = "video/rain.mp4";
        video.load();
    }
    else if (main == "Snow") {
        vid.src = "video/snow.mp4";
        video.load();
    }
    else if (main == "Mist" || main == "Smoke" || main == "Haze" || main == "Dust" || main == "Fog" || main == "Sand" || main == "Ash" || main == "Squall" || main == "Tornado") {
        vid.src = "video/fog.mp4";
        video.load();
    }
    else if (main == "Clouds") {
        vid.src = "video/clouds.mp4";
        video.load();
    }
}

videobtn.addEventListener('click', () => {
    switchvideobtn();
});

function switchvideobtn() {
    if (novideo.classList.contains("remove")) {
        novideo.classList.remove("remove");
        videox.classList.add("remove");
        video.classList.add("remove");
    }
    else {
        novideo.classList.add("remove");
        videox.classList.remove("remove");
        video.classList.remove("remove");
    }
}


volumebtn.addEventListener('click', () => {
    switchvolumebtn();
});
function switchvolumebtn() {
    if ('speechSynthesis' in window) {
        const voicestr = voice_assist();
        msg.text = voicestr.toString();
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices[0];
        if (volume.classList.contains("remove")) {
            volume.classList.remove("remove");
            novolume.classList.add("remove");
            window.speechSynthesis.speak(msg);
            alert("your browser support voive assistant 🎉");
        }
        else if (novolume.classList.contains("remove") || flag) {
            volume.classList.add("remove");
            novolume.classList.remove("remove");
            window.speechSynthesis.cancel(msg);
        }

    }
    else {
        alert("Sorry, your browser donot support voice assistant.");
    }
}
function voice_assist() {
    const denotionstr = gettimestr();
    const temp = `${prop?.main?.temp}`;
    const city = prop?.name;
    const name = "From B4";
    const desc = prop?.weather[0]?.description;
    const windspeed = `${prop?.wind?.speed}`;
    const maxtemp = `${prop?.main?.temp_max}`;
    const mintemp = `${prop?.main?.temp_min}`;
    const humidity = `${prop?.main?.humidity}`;
    const cloud = `${prop?.clouds?.all}`;
    const d1 = prop?.sys?.sunrise;
    const dat1 = new Date(d1 * 1000);
    const hrsr = String(dat1.getHours());
    const minr = String(dat1.getMinutes());
    const secr = String(dat1.getSeconds());


    const d2 = prop?.sys?.sunset;
    const dat2 = new Date(d2 * 1000);
    const hrss = String(dat2.getHours());
    const mins = String(dat2.getMinutes());
    const secs = String(dat2.getSeconds());

    const voicestr = `${denotionstr}, ${city}! I'm ${name}, and it's time for your daily weather update.

Right now, we have a ${desc} with a temperature of ${temp} degrees Celsius. The wind is coming in at ${windspeed} kilometers per hour.
As we move through the day, temperatures will reach a high of ${maxtemp} degrees Celsius with a low of ${mintemp} degrees Celsius.

Here are some additional details for your day:

Humidity stands at ${humidity}.
The clouds is ${cloud}.
Sunrise is at ${hrsr}hours ${minr}minutes ${secr}seconds and sunset at ${hrss}hours ${mins}minutes ${secs}seconds.

Stay tuned for further updates and have a fantastic day.
`;

    return voicestr;


}

function gettimestr() {
    const d = new Date();
    const currhrs = d.getHours();
    if (currhrs < 12) {
        return "Good Morning"
    }
    else if (currhrs < 17) {
        return "Good Afternoon";
    }
    else {
        return "Good Evening";
    }
}

function stop() {
    volume.classList.add("remove");
    novolume.classList.remove("remove");
    window.speechSynthesis.cancel(msg);
}




const city = prop?.name;
const country = prop?.sys?.country;
const formattedLocation = encodeURIComponent(`${city}, ${country}`);

document.querySelector("img[alt='wind']").addEventListener('click', function () {
    window.open(`https://www.windy.com/en/search-locations?query=${formattedLocation}`, '_blank');
});

document.querySelector("img[alt='humidity']").addEventListener('click', function () {
    window.open(`https://www.windy.com/en/search-locations?query=${formattedLocation}`, '_blank');
});

document.querySelector("img[alt='cloud']").addEventListener('click', function () {
    window.open(`https://www.windy.com/en/search-locations?query=${formattedLocation}`, '_blank');
});


const api2 = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

async function fetchForecast(lat, lon) {
    try {
        // Fetch 5-day forecast
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}&units=metric`);
        const forecastData = await forecastResponse.json();
        renderForecast(forecastData);  // Call function to render forecast data
    } catch (error) {
        console.error("Error fetching forecast data:", error);
    }
}

function renderForecast(forecastData) {
    const forecastContainer = document.querySelector(".forecast");
    forecastContainer.innerHTML = "";  // Clear any existing forecast data

    // Loop through the forecast data to display the next 5 days
    const days = {};
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!days[date]) {
            days[date] = [];
        }
        days[date].push(item);
    });

    const forecastEntries = Object.keys(days).slice(0, 5); // Get the first 5 days
    forecastEntries.forEach(date => {
        const dailyData = days[date][0]; // Use the first entry for each day
        const forecastDiv = document.createElement("div");
        forecastDiv.classList.add("forecast-item");

        const weatherDesc = dailyData.weather[0].description;
        const icon = dailyData.weather[0].icon;
        const temp = Math.round(dailyData.main.temp);

        forecastDiv.innerHTML = `
<p>${date}</p>
<img src="https://openweathermap.org/img/wn/${icon}.png" alt="${weatherDesc}" />
<p>${temp} °C</p>
<p>${weatherDesc}</p>
`;
        forecastContainer.appendChild(forecastDiv);
    });
}

// Example usage: Call fetchForecast with latitude and longitude
// fetchForecast(latitude, longitude);

// THIS IS THE DB CODE FOR XAMPP
document.getElementById('grant-access').addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // Fetch weather data using latitude and longitude, then send to save_weather.php
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=60303b0f3ae8644b3632967cc2fb9480&units=metric`)
        .then(response => response.json())
        .then(data => {
            const city = data.name;
            const temperature = data.main.temp;

            document.querySelector('[city-name]').textContent = city;
            document.getElementById('temp').textContent = `${temperature} °C`;
            document.getElementById('weather-desc').textContent = data.weather[0].description;

            // Save to database
            saveWeatherData(city, temperature, latitude, longitude);
        });
}

document.getElementById('search-tab').addEventListener('submit', function (event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;

    // Fetch weather data by city name
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=60303b0f3ae8644b3632967cc2fb9480&units=metric`)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const latitude = data.coord.lat;
            const longitude = data.coord.lon;

            document.querySelector('[city-name]').textContent = city;
            document.getElementById('temp').textContent = `${temperature} °C`;
            document.getElementById('weather-desc').textContent = data.weather[0].description;

            // Save to database
            saveWeatherData(city, temperature, latitude, longitude);
        });
});

function saveWeatherData(city, temperature, latitude, longitude) {
    fetch('save_weather.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `city=${encodeURIComponent(city)}&temperature=${encodeURIComponent(temperature)}&latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
document.getElementById('fetch-data-btn').onclick = function() {
    fetch('fetch_data.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('data-table');
            tableBody.innerHTML = ''; // Clear previous data

            data.forEach(row => {
                const newRow = tableBody.insertRow();
                newRow.insertCell(0).textContent = row.city;
                newRow.insertCell(1).textContent = row.temperature;
                newRow.insertCell(2).textContent = row.latitude;
                newRow.insertCell(3).textContent = row.longitude;
            });

            $('#dataModal').modal('show'); // Show the modal
        })
        .catch(error => console.error('Error fetching data:', error));
};
