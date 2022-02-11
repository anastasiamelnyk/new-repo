const defaultState = {
    isAuth: false,
    user: {},
    authError: {},
    isAuthModalOpened: false
}

const SET_IS_AUTH = "SET_IS_AUTH";
const SET_USER = "SET_USER";
const SET_AUTH_ERROR = "SET_AUTH_ERROR";
const SET_AUTH_MODAL_OPENED = "SET_AUTH_MODAL_OPENED";
export const LOG_IN = "LOG_IN";
export const SIGN_IN = "SIGN_IN";
export const LOG_OUT = "LOG_OUT";

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
            return { ...state, isAuth: action.payload };
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_AUTH_ERROR:
            return { ...state, authError: action.payload };
        case SET_AUTH_MODAL_OPENED:
            return { ...state, isAuthModalOpened: action.payload };
        default:
            return state;
    }
}

export const setIsAuthAction = (isAuth) => {
    return { type: SET_IS_AUTH, payload: isAuth }
}

export const setUserAction = (user) => {
    return { type: SET_USER, payload: user }
}

export const setAuthErrorAction = (error) => {
    return { type: SET_AUTH_ERROR, payload: error };
}

export const setIsAuthModalOpenedAction = (isModalOpened) => {
    return { type: SET_AUTH_MODAL_OPENED, payload: isModalOpened };
}

export const logInAction = (creds) => {
    return { type: LOG_IN, payload: creds }
}

export const signInAction = (creds) => {
    return { type: SIGN_IN, payload: creds }
}

export const logOutAction = () => {
    return { type: LOG_OUT }
}