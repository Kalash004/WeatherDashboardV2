const weatherApiKey = '83037af74791252875f34544e141853a';
let city;
let units;
let apiUrl;

$(document).ready(function () {
    // var apiUrl = 'https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=YOUR_LOCATION&days=5';
    // Check if user has saved city in local storage -> yes : set city from local storage; no : try to obtain data from database -> yes : get city from the db no : set city prague automatically
    city = getCity();
    units = getUnits();
    bLoadedForecastContentent = false;
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=${units}`;
    fetchWeatherDataInterval(); // initial fetch
    setInterval(() => {fetchWeatherDataInterval()},60000);//initial fetch
});

function fetchWeatherDataInterval() {
    if (!fetchWeatherDataInterval.isCallingAPI) {
        fetchWeatherDataInterval.isCallingAPI = true;

        fetchForecast(apiUrl);

        setTimeout(() => {
            fetchWeatherDataInterval.isCallingAPI = false;
        }, 60000); // 60 seconds delay
    }
};

function fetchForecast(apiUrl) {
    console.log("fetched");
    try {
        $.get(apiUrl, (dataFromApi) => { onSuccessFetch(dataFromApi) });
        bLoadedForecastContent = true;
    } catch (error) {
        console.log(`An error happened while reading data from the api ${error}`);
    }
}

function onSuccessFetch(dataFromApi) {
    $("#forecast-container").html("");
    var forecastContainer = $('#forecast-container').addClass("container-fluid");
    var cityText = $('<h2>').text(`${city}:`);
    forecastContainer.append(cityText);
    // Group data by date
    let days = groupByDays(dataFromApi);
    days.shift();
    console.log(days);
    days.forEach(element => {
        var forecastCard = createForecastCard(element, forecastContainer);
        forecastContainer.append(forecastCard);
    })
}

function groupByDays(data) {
    let days = [];
    let dayData = []
    let lastPutDayDate;
    const length = data.list.length;
    for (var i = 0; i < length; i++) {
        // Group data by date
        let listItem = data.list[i];
        let date = listItem.dt_txt.split(" ")[0];
        if (i == length) {
            dayData.push(listItem);
            days.push(dayData);
        }
        else if (date != lastPutDayDate) {
            days.push(dayData);
            dayData = [];
            dayData.push(listItem);
            lastPutDayDate = date;
        }
        else if (date === lastPutDayDate) {
            dayData.push(listItem);
        }
    }
    return days;
}

function createForecastCard(dayData, forecastContainer) {
    var forecastDay = $('<div>').addClass('card mb-4 shadow');
    var forecastDate = $('<h2>').text(dayData[0].dt_txt.split(" ")[0]).addClass("ps-3 pt-3");
    var forecastCardBody = $('<div>').addClass('card-body d-flex row justify-content-evenly flex-wrap')
    forecastDay.append(forecastDate);
    dayData.forEach(element => {
        var wrapper = $('<div>').addClass('col flex-item min-width min-height');
        var forecastTime = element;
        var iconUrl = `https://openweathermap.org/img/wn/${forecastTime.weather[0].icon}.png`;
        var description = forecastTime.weather[0].description;
        var temperature = forecastTime.main.temp;
        var date = forecastTime.dt_txt.split(" ")[1];
        // Create forecast card
        var tempTime = date.split(":");
        var timeElement = $('<h3>').text(`${tempTime[0]}:${tempTime[1]}`);
        var iconElement = $('<img>').attr('src', iconUrl);
        var firstLetter = description.charAt(0);
        var tempString = firstLetter.toUpperCase() + description.slice(1);
        var tempTemperatureSignString;
        if (units.toLowerCase() == "metric") {
            tempTemperatureSignString = '°C';
        }
        else if (units.toLowerCase() == "imperial") {
            tempTemperatureSignString = '°F';
        }
        else {
            tempTemperatureSignString = '°';
        }
        var descriptionElement = $('<p>').text(`Weather: ${tempString}`).addClass('card-text');
        var temperatureElement = $('<p>').text(`Temperature: ${temperature}${tempTemperatureSignString}`).addClass('card-text');
        wrapper.append(timeElement, iconElement, descriptionElement, temperatureElement)
        forecastCardBody.append(wrapper);
        forecastDay.append(forecastCardBody);
    });
    return forecastDay;
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
    if (tempCity == null) {
        tempCity = 'Prague';
    }
    return tempCity;
}

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

// TODO:
function dbHasCity() {
    return false;
}
// TODO:
function dbHasUnits() {
    return false;
}

