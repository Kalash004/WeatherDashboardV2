let weatherApiKey;
let city; // Replace with the desired location
let units; // defaul is metric
let bLoadedHomeContent;


const weatherElement = document.getElementById('weather');

$(document).ready(function () {
    // var apiUrl = 'https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=YOUR_LOCATION&days=5';
    // Check if user has saved city in local storage -> yes : set city from local storage; no : try to obtain data from database -> yes : get city from the db no : set city prague automatically
    weatherApiKey = '83037af74791252875f34544e141853a';
    bLoadedHomeContent = false;
    city = getCity();
    units = getUnits();
    fetchWeatherData();
});

function getUnits() {
    var tempUnits;
    if (localStorage.getItem('units') != null) {
        tempUnits = localStorage.getItem('units');
    }
    if (dbHasUnits()) {
        // might do this function
        tempUnits = getCityFromDb();
    }
    if (tempUnits == null) {
        tempUnits = 'metric';
    }
    return tempUnits;
}

// Function to fetch weather data at an interval
 function fetchWeatherDataInterval() {
    // Check if the previous API call has completed
    if (!fetchWeatherDataInterval.isCallingAPI) {
        // Set the flag to prevent concurrent API calls
        fetchWeatherDataInterval.isCallingAPI = true;

        // Call the API
        fetchWeatherData();

        // Reset the flag after a delay
        setTimeout(() => {
            fetchWeatherDataInterval.isCallingAPI = false;
        }, 60000); // 60 seconds delay
    }
};

// Function to make an AJAX request


function dbHasUnits() {
    return false;
}

function dbHasCity() {
    return false;
}

function getCity() {
    // Check if user has saved city in local storage -> yes : set city from local storage; no : try to obtain data from database -> yes : get city from the db no : set city prague automatically
    var tempCity;
    if (localStorage.getItem('city') != null) {
        tempCity = localStorage.getItem('city');
    }
    if (dbHasCity()) {
        tempCity = getCityFromDb();
    }
    if (tempUnits = null) {
        tempCity = 'Prague';
    }
    return tempCity;
}

// Function to fetch weather data from the API
async function fetchWeatherData() {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=${units}`;
    try {
        await $.get(apiUrl, (data) => {onSuccessFetch(data)});
        bLoadedHomeContent = true;
    } catch (error) {
        console.log(`An error happened while reading data from the api ${error}`);
    }
}

function onSuccessFetch(data) {
    let temperature = data.main.temp;
    const condition = data.weather[0].description;
    const countryCode = data.sys.country;
    const iconCode = data.weather[0].icon;
    switch (units.toLowerCase()) {
        case ('metric'): temperature = temperature + '°C';
            break;
        case ('imperial'): temperature = temperature + '°F'
            break;
        case ('standard'): temperature = temperature + '°'
            break;
    } 
    weatherElement.innerHTML = `<p>Location: ${city}</p><p>County: ${countryCode}</p><p>Temperature: ${temperature}</p><p>Condition: ${condition}</p><img src=${obtainIconFromWeather(iconCode)}></img>`;
}

function obtainIconFromWeather(iconId) {
    return `https://openweathermap.org/img/wn/${iconId}.png`;
}
// Call the function every 60 seconds
setInterval(() => {fetchWeatherDataInterval()}, 60000); // 60 seconds interval