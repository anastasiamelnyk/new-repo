import TodayWeather from "../../components/TodayWeather/TodayWeather";
import SeveralDaysForecast from "../../components/SeveralDaysForecast/SeveralDaysForecast";
import classes from './cityPage.module.scss';
import classNames from "classnames/bind";
import {useRef, useContext, useEffect} from "react";
import {LocationContext} from "../../context/locationContext";
import {fetchCityWeather} from "../../store/cityReducer";
import {useDispatch} from "react-redux";

const CityPage = () => {
    const cx = useRef(classNames.bind(classes));
    const cityPageClasses = cx.current('edge-padding', 'page-container', 'city-page');
    const location = useContext(LocationContext);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!location.city) return;

        dispatch(fetchCityWeather(location.city.lat, location.city.lon));
    }, [location]);

    return (
        <div className={cityPageClasses}>
            <TodayWeather />
            <SeveralDaysForecast />
        </div>
    );
};

export default CityPage;