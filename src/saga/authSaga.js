import {put, call, takeLatest} from "redux-saga/effects";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {setIsAuthAction, setIsAuthModalOpenedAction, setUserAction, SIGN_IN} from "../store/authReducer";

const auth = getAuth();

function* signInWorker ({ payload }) {
    const userCredential = yield call(createUserWithEmailAndPassword, auth, payload.email, payload.password);
    yield put(setUserAction(userCredential.user));
    yield put(setIsAuthAction(true));
    yield put(setIsAuthModalOpenedAction(false));
}

export function* authWatcher () {
    yield takeLatest(SIGN_IN, signInWorker);
}