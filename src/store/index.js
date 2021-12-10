import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {cityReducer} from "./cityReducer";

const rootReducer = combineReducers({
    cityReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;