import TodayWeather from "../../components/TodayWeather/TodayWeather";
import SeveralDaysForecast from "../../components/SeveralDaysForecast/SeveralDaysForecast";
import classes from './cityPage.module.scss';
import classNames from "classnames/bind";
import {useRef, useContext, useEffect, useState} from "react";
import {WeatherApi} from "../../api/weatherApi";
import {LocationContext} from "../../context/locationContext";

const CityPage = () => {
    const cx = useRef(classNames.bind(classes));
    const cityPageClasses = cx.current('edge-padding', 'page-container', 'city-page');
    const location = useContext(LocationContext);
    const [todayWeather, setTodayWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        async function getWeather() {
            if (!location.city) return;

            const { current, hourly, daily } = await WeatherApi.getCityWeather(location.city.lat, location.city.lon);
            setTodayWeather({current, hourly});
            setForecast(daily);
        }

        getWeather();
    }, [location]);

    return (
        <div className={cityPageClasses}>
            <TodayWeather weather={todayWeather} />
            <SeveralDaysForecast forecast={forecast} />
        </div>
    );
};

export default CityPage;