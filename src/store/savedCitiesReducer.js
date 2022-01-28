import {WeatherApi} from "../api/weatherApi";
import {getUniqueItemsArray, deleteCityFromArray} from "../utils/js";

const defaultSate = {
    searchedCityResults: null,
    savedCitiesList: [],
    savedCitiesWeatherList: [],
}

const SET_SEARCHED_RESULTS = "SET_SEARCHED_RESULTS";
const ADD_TO_SAVED_CITIES = "ADD_TO_SAVED_CITIES";
const DELETE_FROM_SAVED_CITIES = "DELETE_FROM_SAVED_CITIES";
const ADD_TO_WEATHER_LIST = "ADD_TO_WEATHER_LIST";

export const savedCitiesReducer = (state = defaultSate, action) => {
    switch (action.type) {
        case SET_SEARCHED_RESULTS:
            return { ...state, searchedCityResults: action.payload };
        case ADD_TO_SAVED_CITIES:
            return {
                ...state,
                savedCitiesList: getUniqueItemsArray(
                    [...state.savedCitiesList, action.payload],
                    ['lat', 'lon']
                ) };
        case DELETE_FROM_SAVED_CITIES:
            return {
                ...state,
                savedCitiesList: deleteCityFromArray(state.savedCitiesList, action.payload)
            }
        case ADD_TO_WEATHER_LIST:
            return {  ...state, savedCitiesWeatherList: [...state.savedCitiesWeatherList, action.payload] }
        default:
            return state;
    }
}

const setSearchedResultsAction = (results) => {
    return { type: SET_SEARCHED_RESULTS, payload: results };
}

export const addToSavedCitiesAction = (city) => {
    return { type: ADD_TO_SAVED_CITIES, payload: city };
}

export const deleteFromSavedCitiesAction = (city) => {
    return { type: DELETE_FROM_SAVED_CITIES, payload: city };
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
