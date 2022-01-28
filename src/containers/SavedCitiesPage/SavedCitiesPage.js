import classNames from "classnames/bind";
import {useEffect, useRef, useState} from "react";
import classes from "./SavedCitiesPage.module.scss";
import TodayWeather from "../../components/TodayWeather/TodayWeather";
import SeveralDaysForecast from "../../components/SeveralDaysForecast/SeveralDaysForecast";
import {useDispatch, useSelector} from "react-redux";
import {searchCity,
    addToSavedCitiesAction,
    deleteFromSavedCitiesAction,
    addToWeatherListAction} from "../../store/savedCitiesReducer";
import Tabs from "../../components/UI/Tabs/Tabs";
import {useMediaQuery} from 'react-responsive';
import { getCityWeather } from "../../store/cityReducer";
import cloneDeep from "lodash.clonedeep";
import CitySearchBox from "../../components/CitySearchBox/CitySearchBox";
import CitySearchResults from "../../components/CitySearchResults/CitySearchResults";

const SavedCitiesPage = () => {
    const cx = useRef(classNames.bind(classes));
    const savedCitiesPageClasses = cx.current('edge-padding', 'container');
    const areTabsHorizontal = useMediaQuery({
        query: '(max-width: 767px)'
    })
    const dispatch = useDispatch();
    const searchResults = useSelector(store => store.savedCitiesReducer.searchedCityResults);
    const savedCitiesList = useSelector(store => store.savedCitiesReducer.savedCitiesList);
    const savedCitiesWeatherList = useSelector(store => store.savedCitiesReducer.savedCitiesWeatherList);
    const [showedCity, setShowedCity] = useState(null);
    const [showedCityWeather, setShowedCityWeather] = useState(null);

    useEffect(() => {
        if (savedCitiesList.length === 0) setShowedCity(null);
        if (savedCitiesList.length === 1) setShowedCity(cloneDeep(savedCitiesList[0]));
    }, [savedCitiesList]);

    useEffect(() => {
        if (!showedCity) {
            setShowedCityWeather(null);
            return;
        }

        const showedCityWeatherSaved = savedCitiesWeatherList
            .find(({ city }) => city.lat === showedCity.lat && city.lon === showedCity.lon);

        if (showedCityWeatherSaved) {
            setShowedCityWeather(cloneDeep(showedCityWeatherSaved));
            return;
        }

        getCityWeather(showedCity.lat, showedCity.lon)
            .then(weather => {
                dispatch(addToWeatherListAction(cloneDeep(showedCity), weather));
            })

    }, [showedCity, savedCitiesWeatherList])

    const search = (e, searchReq) => {
        e.preventDefault();
        if (searchReq) dispatch(searchCity(searchReq));
    }

    return (
        <div className={savedCitiesPageClasses}>
            <div className={classes['list']}>
                <CitySearchBox search={search} />
                <CitySearchResults
                    searchResults={searchResults}
                    addToList={(city) => dispatch(addToSavedCitiesAction(city))}
                />
                <Tabs
                    options={savedCitiesList}
                    keysToDisplay={['name', 'country', 'state']}
                    variant={areTabsHorizontal ? 'horizontal' : 'vertical'}
                    value={showedCity}
                    setValue={setShowedCity}
                    hasDeleteBtn
                    deleteTab={(city) => dispatch(deleteFromSavedCitiesAction(city))}
                />
            </div>
            {(showedCityWeather && savedCitiesList.length) &&
            <div className={classes['weather-widget']}>
                <TodayWeather
                    className={classes['current-weather']}
                    weather={{
                        current: showedCityWeather?.weather?.current,
                        hourly: showedCityWeather?.weather?.hourly}}
                    isSavedCity
                />
                <SeveralDaysForecast forecast={showedCityWeather?.weather?.daily} />
            </div>
            }
        </div>
    );
};

export default SavedCitiesPage;