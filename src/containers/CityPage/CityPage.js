import TodayWeather from "../../components/TodayWeather/TodayWeather";
import SeveralDaysForecast from "../../components/SeveralDaysForecast/SeveralDaysForecast";
import classes from './CityPage.module.scss';
import classNames from "classnames/bind";
import {useRef} from "react";

const CityPage = () => {
    const cx = useRef(classNames.bind(classes));
    const cityPageClasses = cx.current('edge-padding', 'page-container', 'city-page');

    return (
        <div className={cityPageClasses}>
            <TodayWeather />
            <SeveralDaysForecast />
        </div>
    );
};

export default CityPage;