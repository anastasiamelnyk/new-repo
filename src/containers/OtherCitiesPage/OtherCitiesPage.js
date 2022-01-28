import classNames from "classnames/bind";
import {useEffect, useRef, useState} from "react";
import classes from "./OtherCitiesPage.module.scss";
import TodayWeather from "../../components/TodayWeather/TodayWeather";
import SeveralDaysForecast from "../../components/SeveralDaysForecast/SeveralDaysForecast";
import {useDispatch, useSelector} from "react-redux";
import {searchCity,
    addToOtherCitiesAction,
    deleteFromOtherCitiesAction,
    addToWeatherListAction} from "../../store/otherCitiesReducer";
import Tabs from "../../components/UI/Tabs/Tabs";
import {useMediaQuery} from 'react-responsive';
import { getCityWeather } from "../../store/cityReducer";
import cloneDeep from "lodash.clonedeep";
import CitySearchBox from "../../components/CitySearchBox/CitySearchBox";
import CitySearchResults from "../../components/CitySearchResults/CitySearchResults";

const OtherCitiesPage = () => {
    const cx = useRef(classNames.bind(classes));
    const otherCitiesPageClasses = cx.current('edge-padding', 'container');
    const areTabsHorizontal = useMediaQuery({
        query: '(max-width: 767px)'
    })
    const dispatch = useDispatch();
    const searchResults = useSelector(store => store.otherCitiesReducer.searchedCityResults);
    const otherCitiesList = useSelector(store => store.otherCitiesReducer.otherCitiesList);
    const otherCitiesWeatherList = useSelector(store => store.otherCitiesReducer.otherCitiesWeatherList);
    const [showedCity, setShowedCity] = useState(null);
    const [showedCityWeather, setShowedCityWeather] = useState(null);

    useEffect(() => {
        if (otherCitiesList.length === 0) setShowedCity(null);
        if (otherCitiesList.length === 1) setShowedCity(cloneDeep(otherCitiesList[0]));
    }, [otherCitiesList]);

    useEffect(() => {
        if (!showedCity) {
            setShowedCityWeather(null);
            return;
        }

        const showedCityWeatherSaved = otherCitiesWeatherList
            .find(({ city }) => city.lat === showedCity.lat && city.lon === showedCity.lon);

        if (showedCityWeatherSaved) {
            setShowedCityWeather(cloneDeep(showedCityWeatherSaved));
            return;
        }

        getCityWeather(showedCity.lat, showedCity.lon)
            .then(weather => {
                dispatch(addToWeatherListAction(cloneDeep(showedCity), weather));
            })

    }, [showedCity, otherCitiesWeatherList])

    const search = (e, searchReq) => {
        e.preventDefault();
        if (searchReq) dispatch(searchCity(searchReq));
    }

    return (
        <div className={otherCitiesPageClasses}>
            <div className={classes['list']}>
                <CitySearchBox search={search} />
                <CitySearchResults
                    searchResults={searchResults}
                    addToList={(city) => dispatch(addToOtherCitiesAction(city))}
                />
                <Tabs
                    options={otherCitiesList}
                    keysToDisplay={['name', 'country', 'state']}
                    variant={areTabsHorizontal ? 'horizontal' : 'vertical'}
                    value={showedCity}
                    setValue={setShowedCity}
                    hasDeleteBtn
                    deleteTab={(city) => dispatch(deleteFromOtherCitiesAction(city))}
                />
            </div>
            {(showedCityWeather && otherCitiesList.length) &&
            <div className={classes['weather-widget']}>
                <TodayWeather
                    className={classes['current-weather']}
                    weather={{
                        current: showedCityWeather?.weather?.current,
                        hourly: showedCityWeather?.weather?.hourly}}
                    isOtherCity
                />
                <SeveralDaysForecast forecast={showedCityWeather?.weather?.daily} />
            </div>
            }
        </div>
    );
};

export default OtherCitiesPage;