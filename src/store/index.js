import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {cityReducer} from "./cityReducer";
import {locationReducer} from "./locationReducer";
import {otherCitiesReducer} from "./otherCitiesReducer";

const rootReducer = combineReducers({
    cityReducer,
    locationReducer,
    otherCitiesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;