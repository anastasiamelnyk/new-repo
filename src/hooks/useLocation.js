import {useEffect, useState} from "react";
import add from 'date-fns/add';
import isAfter from 'date-fns/isAfter';
import {WeatherApi} from "../api/weatherApi";

const getValidSavedLocation = async () => {
    const storageLocation = localStorage.getItem('location');
    const storageLocationParsed = await JSON.parse(storageLocation);
    const isLocationValid = storageLocation && isAfter(new Date(storageLocationParsed.expiryDate), new Date());

    return isLocationValid ? storageLocationParsed.location : null;
}

const getCityNameFromCoords = async (coords) => {
    try {
        const cities = await WeatherApi.getLocalityFromCoords(coords.latitude, coords.longitude);
        saveLocation(cities[0]);
        return cities[0];
    } catch (err) {
        console.log(err)
    }
}

const getGeoErrorText = (code) => {
    /*
        ERROR CODES:
        1: PERMISSION_DENIED: The acquisition of the geolocation information failed because the page didn't have the permission to do it.
        2: POSITION_UNAVAILABLE: The acquisition of the geolocation failed because one or several internal sources of position returned an internal error.
        3: TIMEOUT: Geolocation information was not obtained in the allowed time.
    * */
    switch (code) {
        case 1:
            return 'Please allow location for this site in your browser'

        case 2:
            return 'Your location can not be found due to internal error'

        case 3:
            return 'Your location can not be found in allowed time'

        default:
            return 'Something went wrong'
    }
}

const saveLocation = (location) => {
    localStorage.setItem('location', JSON.stringify({
        location,
        expiryDate: add(new Date(), {minutes: 1}), // should be 1 week or so, 1 min is for testing
    }));
}

export const useLocation = () => {
    const [geo, setGeo] = useState(null);
    const [geoError, setGeoError] = useState(null);

    async function manageLocation () {
        const validSavedLocation = await getValidSavedLocation();
        if (validSavedLocation) {
            setGeo(validSavedLocation);
            return;
        }

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async (resp) => {
                const cityName = await getCityNameFromCoords(resp.coords);
                setGeo(cityName);
            }, (err) => {
                console.log(err);
                setGeoError(getGeoErrorText(err.code));
            }, {enableHighAccuracy: true});
        } else {
            console.log('No geolocation in browser');
        }
    }

    useEffect(() => {
        manageLocation();
    }, []);

    return [geo, geoError, setGeoError];
}





