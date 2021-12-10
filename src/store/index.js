import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {cityReducer} from "./cityReducer";
import {locationReducer} from "./locationReducer";

const rootReducer = combineReducers({
    cityReducer,
    locationReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;