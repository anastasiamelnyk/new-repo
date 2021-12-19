import {WeatherApi} from "../api/weatherApi";
import {getUniqueItemsArray} from "../utils/js";

const defaultSate = {
    searchedCityResults: null,
    otherCitiesList: [],
    otherCitiesWeatherList: null,
}

const SET_SEARCHED_RESULTS = "SET_SEARCHED_RESULTS";
const SET_OTHER_CITIES = "SET_OTHER_CITIES";
const ADD_TO_OTHER_CITIES = "ADD_TO_OTHER_CITIES";
const DELETE_FROM_OTHER_CITIES = "DELETE_FROM_OTHER_CITIES";

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
        default:
            return state;
    }
}

const setSearchedResultsAction = (results) => {
    return { type: SET_SEARCHED_RESULTS, payload: results };
}

export const addToOtherCitiesActions = (city) => {
    return { type: ADD_TO_OTHER_CITIES, payload: city };
}

export const searchCity = (cityName) => {
    return async dispatch => {
        const { data } = await WeatherApi.getCityByName(cityName);
        dispatch(setSearchedResultsAction(data));
    }
}
