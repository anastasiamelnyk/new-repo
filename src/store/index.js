import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {cityReducer} from "./cityReducer";
import {locationReducer} from "./locationReducer";
import {savedCitiesReducer} from "./savedCitiesReducer";
import {authReducer} from "./authReducer";
import createSagaMiddleware from "redux-saga";
import {rootWatcher} from "../saga";


const saga = createSagaMiddleware();

const rootReducer = combineReducers({
    cityReducer,
    locationReducer,
    savedCitiesReducer,
    authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, saga));

export default store;

saga.run(rootWatcher);