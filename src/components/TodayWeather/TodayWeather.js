import PropTypes from 'prop-types';
import LoadingIndicator from "../UI/LoadingIndicator/LoadingIndicator";
import format from 'date-fns/format'
import classes from './todayWeather.module.scss';
import {useMemo} from "react";
import {capitalizeFirstLetter} from "../../utils/js";
// import Slider from "react-slick";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

const ICON_PATH = 'http://openweathermap.org/img/wn';

const TodayWeather = ({ weather }) => {
    const todayDate = useMemo(() => weather
        ? format(new Date(weather.current.dt), 'EEEE, MMMM do')
        : '', [weather]);

    const weatherDescription = useMemo(() => weather
        ? capitalizeFirstLetter(weather.current.weather[0].description)
        : '', [weather]);

    const getIconPath = icon => `${ICON_PATH}/${icon}@2x.png`;

    const getSunTime = sunTime => format(new Date(sunTime), 'HH:mm');

    const getHourDate = hourDate => format(new Date(hourDate), 'HH:mm');

    const renderHourly = () => {
        const dayHourly = weather.hourly.splice(0, 24);

        return dayHourly.map(hour => (
            <div className={classes['hourly-item']} key={hour.dt}>
                <h4 className={classes['hour']}>{getHourDate(hour.dt)}</h4>
                <img src={getIconPath(hour.weather[0].icon)} alt={hour.weather[0].description} width='40' height='40' />
                <div>{Math.round(hour.temp)}&#176;C</div>
            </div>
        ));
    }

    if (!weather) return <LoadingIndicator />

    return (
        <section className={classes['container']}>
            <h2 className={classes['date']}>
                {todayDate}
            </h2>
            <div className={classes['general']}>
                <img src={getIconPath(weather.current.weather[0].icon)} alt={weatherDescription} width='70' height='70' />
                <span className={classes['main-temp']}>{Math.round(weather.current.temp)}&#176;C</span>
                <div className={classes['secondary']}>
                    <span>{weatherDescription}</span>
                    <span>Feels like {Math.round(weather.current.feels_like)}&#176;C</span>
                </div>
                <div className={classes['secondary']}>
                    <span>Sunrise: {getSunTime(weather.current.sunrise)}</span>
                    <span>Sunset: {getSunTime(weather.current.sunset)}</span>
                </div>
            </div>
            <div className={classes['hourly']}>
                {renderHourly()}
            </div>
        </section>
    );
};

export default TodayWeather;

TodayWeather.propTypes = {
    weather: PropTypes.exact({
        current: PropTypes.object,
        hourly: PropTypes.arrayOf(PropTypes.object)
    })
}