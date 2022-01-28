import {WeatherApi} from "../api/weatherApi";
import {getUniqueItemsArray, deleteCityFromArray} from "../utils/js";

const defaultSate = {
    searchedCityResults: null,
    otherCitiesList: [],
    otherCitiesWeatherList: [],
}

const SET_SEARCHED_RESULTS = "SET_SEARCHED_RESULTS";
const SET_OTHER_CITIES = "SET_OTHER_CITIES";
const ADD_TO_OTHER_CITIES = "ADD_TO_OTHER_CITIES";
const DELETE_FROM_OTHER_CITIES = "DELETE_FROM_OTHER_CITIES";
const ADD_TO_WEATHER_LIST = "ADD_TO_WEATHER_LIST";

export const otherCitiesReducer = (state = defaultSate, action) => {
    switch (action.type) {
        case SET_SEARCHED_RESULTS:
            return { ...state, searchedCityResults: action.payload };
        case ADD_TO_OTHER_CITIES:
            return {
                ...state,
                otherCitiesList: getUniqueItemsArray(
                    [...state.otherCitiesList, action.payload],
                    ['lat', 'lon']
                ) };
        case DELETE_FROM_OTHER_CITIES:
            return {
                ...state,
                otherCitiesList: deleteCityFromArray(state.otherCitiesList, action.payload)
            }
        case ADD_TO_WEATHER_LIST:
            return {  ...state, otherCitiesWeatherList: [...state.otherCitiesWeatherList, action.payload] }
        default:
            return state;
    }
}

const setSearchedResultsAction = (results) => {
    return { type: SET_SEARCHED_RESULTS, payload: results };
}

export const addToOtherCitiesAction = (city) => {
    return { type: ADD_TO_OTHER_CITIES, payload: city };
}

export const deleteFromOtherCitiesAction = (city) => {
    return { type: DELETE_FROM_OTHER_CITIES, payload: city };
}

export const addToWeatherListAction = (city, weather) => {
    return { type: ADD_TO_WEATHER_LIST, payload: { city, weather } };
}

export const searchCity = (cityName) => {
    return async dispatch => {
        const { data } = await WeatherApi.getCityByName(cityName);
        dispatch(setSearchedResultsAction(data));
    }
}
