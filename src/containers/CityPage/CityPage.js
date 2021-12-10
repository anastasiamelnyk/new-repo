import TodayWeather from "../../components/TodayWeather/TodayWeather";
import SeveralDaysForecast from "../../components/SeveralDaysForecast/SeveralDaysForecast";
import classes from './cityPage.module.scss';
import classNames from "classnames/bind";
import {useRef, useEffect} from "react";
import {fetchCityWeather} from "../../store/cityReducer";
import {useDispatch, useSelector} from "react-redux";

const CityPage = () => {
    const cx = useRef(classNames.bind(classes));
    const cityPageClasses = cx.current('edge-padding', 'page-container', 'city-page');
    const location = useSelector(store => store.locationReducer.location);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!location) return;

        dispatch(fetchCityWeather(location.lat, location.lon));
    }, [location]);

    return (
        <div className={cityPageClasses}>
            <TodayWeather />
            <SeveralDaysForecast />
        </div>
    );
};

export default CityPage;