import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {cityReducer} from "./cityReducer";
import {locationReducer} from "./locationReducer";
import {savedCitiesReducer} from "./savedCitiesReducer";

const rootReducer = combineReducers({
    cityReducer,
    locationReducer,
    savedCitiesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;