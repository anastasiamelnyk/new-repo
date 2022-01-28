const defaultSate = {
    location: null,
    locationError: null
};

const SET_LOCATION = "SET_LOCATION";
const SET_LOCATION_ERROR = "SET_LOCATION_ERROR";

export const locationReducer = (state = defaultSate, action) => {
    switch (action.type) {
        case SET_LOCATION:
            return { ...state, location: action.payload };
        case SET_LOCATION_ERROR:
            return { ...state, locationError: action.payload };
        default:
            return state;
    }
}

export const setLocationAction = location => {
    return { type: SET_LOCATION, payload: location };
}

export const setLocationErrorAction = locationError => {
    return { type: SET_LOCATION_ERROR, payload: locationError };
}