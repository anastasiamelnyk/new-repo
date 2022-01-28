import axios from 'axios';
const BASE_URL = 'http://api.openweathermap.org';
const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export class WeatherApi {
    static getLocalityFromCoords(lat, lon) {
        return axios.get(`${BASE_URL}/geo/1.0/reverse`, {
            params: { lat, lon, limit: 1, appid: API_KEY }
        }).then(result => result.data);
    }

    static getCityWeather(lat, lon) {
        return axios.get(`${BASE_URL}/data/2.5/onecall`, {
            params: {
                lat, lon, exclude: 'minutely,alerts', units: 'metric', appid: API_KEY
            }
        }).then(result => result.data);
    }

    static getCityByName(cityName) {
        return axios.get(`${BASE_URL}/geo/1.0/direct`, {
            params: { q: cityName, limit: 5, appid: API_KEY}
        })
    }
}