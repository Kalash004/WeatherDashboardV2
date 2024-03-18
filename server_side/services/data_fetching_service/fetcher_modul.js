import https from "https"

const weatherApiKey = "83037af74791252875f34544e141853a"
const refreshRateNanoSec = 60000
const cities = ["Prague", "San-Francisco", "Donetsk"]

export const startDataFetcher = async () => {
    setInterval(fetchHandler, refreshRateNanoSec)
}

const fetchHandler = async () => {
    /* todo: 
        - fetch data
        - place data to cache
    */
    const data = await dataFetching()
    saveData()
}

const dataFetching = async () => {
    // api https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=${units}
    https.get()
}

const saveData = async () => {
    // does nothing
}

