import {WeatherApi} from "../api/weatherApi";

const defaultState = {
    todayWeather: null,
    forecast: null
}

const SET_TODAY_WEATHER = "SET_TODAY_WEATHER";
const SET_FORECAST = "SET_FORECAST";

export const cityReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_TODAY_WEATHER:
            return { ...state, todayWeather: action.payload };
        case SET_FORECAST:
            return { ...state, forecast: action.payload };
        default:
            return state;
    }
}

const setTodayWeatherAction = (todayWeather) => {
    return { type: SET_TODAY_WEATHER, payload: todayWeather };
}

const setForecastAction = (forecast) => {
    return { type: SET_FORECAST, payload: forecast }
}

export const getCityWeather = (lat, lon) => {
    return WeatherApi.getCityWeather(lat, lon);
}

export const fetchCityWeather = (lat, lon) => {
    return async dispatch => {
        const { current, hourly, daily } = await getCityWeather(lat, lon);
        dispatch(setTodayWeatherAction({ current, hourly }));
        dispatch(setForecastAction(daily));
    }
}
