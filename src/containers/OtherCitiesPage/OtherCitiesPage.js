import classNames from "classnames/bind";
import {useEffect, useRef, useState} from "react";
import classes from "./OtherCitiesPage.module.scss";
import TodayWeather from "../../components/TodayWeather/TodayWeather";
import SeveralDaysForecast from "../../components/SeveralDaysForecast/SeveralDaysForecast";
import {useDispatch, useSelector} from "react-redux";
import {searchCity, addToOtherCitiesActions, addToWeatherListAction} from "../../store/otherCitiesReducer";
import Button from "../../components/UI/Button/Button";
import Tabs from "../../components/UI/Tabs/Tabs";
import {useMediaQuery} from 'react-responsive';
import { getCityWeather } from "../../store/cityReducer";

const OtherCitiesPage = () => {
    const cx = useRef(classNames.bind(classes));
    const otherCitiesPageClasses = cx.current('edge-padding', 'container');
    const dispatch = useDispatch();
    const currentCity = useSelector(store => store.locationReducer.location);
    const searchResults = useSelector(store => store.otherCitiesReducer.searchedCityResults);
    const otherCitiesList = useSelector(store => store.otherCitiesReducer.otherCitiesList);
    const [searchReq, setSearchReq] = useState('');
    const [showedCity, setShowedCity] = useState(null);
    const areTabsHorizontal = useMediaQuery({
        query: '(max-width: 767px)'
    })
    const otherCitiesWeatherList = useSelector(store => store.otherCitiesReducer.otherCitiesWeatherList);
    const [showedCityWeather, setShowedCityWeather] = useState(null);

    useEffect(() => {
        if (otherCitiesList.length === 1) setShowedCity(otherCitiesList[0]);
    }, [otherCitiesList]);

    useEffect(() => {
        if (!showedCity) return;

        const showedCityWeatherSaved = otherCitiesWeatherList
            .find(({ city }) => city.lat === showedCity.lat && city.lon === showedCity.lon);

        if (showedCityWeatherSaved) {
            setShowedCityWeather(showedCityWeatherSaved);
            return;
        }

        getCityWeather(showedCity.lat, showedCity.lon)
            .then(weather => {
                dispatch(addToWeatherListAction(showedCity, weather));
                setShowedCityWeather({ city: showedCity, weather });
            })

    }, [showedCity])

    const search = (e) => {
        e.preventDefault();
        if (searchReq) dispatch(searchCity(searchReq));
    }

    const renderSearchedResults = () => {
        if (!searchResults) return null;
        if (searchResults.length === 0) return (
            <div className={classes['search-not-found']}>
                Nothing found, please try again
            </div>
        );
        return (
            <ul className={classes['search-list']}>
                {searchResults.map(result => (
                    <li className={classes['search-item']} key={result.lat}>
                        <Button variant='add' clicked={() => dispatch(addToOtherCitiesActions(result))}/>
                        <div className={classes['search-city']}>
                            {result.name}, {result.country}, {result.state}
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className={otherCitiesPageClasses}>
            <div className={classes['list']}>
                <form onSubmit={search} className={classes['input-row']}>
                    <div className={classes['search-icon-container']}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" width="32px" viewBox="0 0 32 32">
                            <path d="M19.4271164,20.4271164 C18.0372495,21.4174803 16.3366522,22 14.5,22 C9.80557939,22 6,18.1944206 6,13.5 C6,8.80557939 9.80557939,5 14.5,5 C19.1944206,5 23,8.80557939 23,13.5 C23,15.8472103 22.0486052,17.9722103 20.5104077,19.5104077 L26.5077736,25.5077736 C26.782828,25.782828 26.7761424,26.2238576 26.5,26.5 C26.2219324,26.7780676 25.7796227,26.7796227 25.5077736,26.5077736 L19.4271164,20.4271164 L19.4271164,20.4271164 Z M14.5,21 C18.6421358,21 22,17.6421358 22,13.5 C22,9.35786417 18.6421358,6 14.5,6 C10.3578642,6 7,9.35786417 7,13.5 C7,17.6421358 10.3578642,21 14.5,21 L14.5,21 Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <input
                        placeholder={currentCity?.name}
                        onChange={(e) => setSearchReq(e.target.value)}
                        className={classes['search-input']}
                        value={searchReq}
                    />
                </form>
                {renderSearchedResults()}
                <div>
                    <Tabs
                        options={otherCitiesList}
                        keysToDisplay={['name', 'country', 'state']}
                        variant={areTabsHorizontal ? 'horizontal' : 'vertical'}
                        value={showedCity}
                        setValue={setShowedCity}
                    />
                </div>
            </div>
            {showedCityWeather &&
            <div className={classes['weather-widget']}>
                <TodayWeather
                    className={classes['current-weather']}
                    weather={{
                        current: showedCityWeather.weather.current,
                        hourly: showedCityWeather.weather.hourly}}
                    isOtherCity
                />
                <SeveralDaysForecast forecast={showedCityWeather.weather.daily} />
            </div>
            }
        </div>
    );
};

export default OtherCitiesPage;