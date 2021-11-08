import TodayWeather from "../../components/TodayWeather/TodayWeather";
import SeveralDaysForecast from "../../components/SeveralDaysForecast/SeveralDaysForecast";
import classes from './CityPage.module.scss';
import classNames from "classnames/bind";
import {useRef, useContext, useEffect} from "react";
import {WeatherApi} from "../../api/weatherApi";
import {LocationContext} from "../../context/locationContext";

const CityPage = () => {
    const cx = useRef(classNames.bind(classes));
    const cityPageClasses = cx.current('edge-padding', 'page-container', 'city-page');
    const location = useContext(LocationContext);

    useEffect(() => {
        async function getWeather() {
            if (!location.city) return;

            const cityWeather = await WeatherApi.getCityWeather(location.city.lat, location.city.lon);
            console.log(cityWeather);
        }

        getWeather();
    }, [location]);

    return (
        <div className={cityPageClasses}>
            <TodayWeather />
            <SeveralDaysForecast />
        </div>
    );
};

export default CityPage;