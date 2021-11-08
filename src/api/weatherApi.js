import axios from 'axios';
const BASE_URL = 'http://api.openweathermap.org';
const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export class WeatherApi {
    static getLocalityFromCoords(lat, lon) {
        return axios.get(`${BASE_URL}/geo/1.0/reverse`, {
            params: { lat, lon, limit: 1, appid: API_KEY }
        }).then(result => result.data);
    }
}