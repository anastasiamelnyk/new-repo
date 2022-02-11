import {all} from "redux-saga/effects";
import {authWatcher} from "./authSaga";

export function* rootWatcher () {
    yield all([
        authWatcher()
    ])
}