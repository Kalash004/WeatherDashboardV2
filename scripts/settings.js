var city;
var units;

$(document).ready(function () {
    // get data from settings or local storage
    city = getCity();
    units = getUnits();
    $("#cityInput").val(city);
    var unitInput = document.querySelector(`[value='${units.toLowerCase()}']`);
    unitInput.checked = true;
    unitInput.className = unitInput.className + " bg-dark";
});

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

function dbHasCity() {
    return false;
}

function getUnits() {
    var tempUnits;
    if (localStorage.getItem('units') != null) {
        tempUnits = localStorage.getItem('units');
    }
    if (dbHasUnits()) {
        tempUnits = getCityFromDb();
    }
    if (tempUnits == null) {
        tempUnits = 'metric';
    } 
    return tempUnits;
}

function dbHasUnits() {
    return false;
}

document.getElementById("settingsForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    // Get the city input value
    var city = document.getElementById("cityInput").value;
    let units = document.querySelectorAll("[name='unitsInput']");
    var unit = "metric";
    units.forEach(element => {
        if (element.checked) {
            unit = element.value;
        }
    });
    // Save the city into local storage
    localStorage.setItem("city", city);
    localStorage.setItem("units", unit);
    // Redirect to the home page
    window.location.href = "/";
});
