import PropTypes from 'prop-types';
import LoadingIndicator from "../UI/LoadingIndicator/LoadingIndicator";
import classes from './todayWeather.module.scss';
import {useMemo} from "react";
import {capitalizeFirstLetter} from "../../utils/js";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { getFullDate, getHourMinuteDate, getIconPath } from "../../utils/js";

const TodayWeather = ({ weather }) => {
    const weatherDescription = useMemo(() => weather
        ? capitalizeFirstLetter(weather.current.weather[0].description)
        : '', [weather]);

    const renderHourly = () => {
        const dayHourly = weather.hourly.splice(0, 24);

        return dayHourly.map(hour => (
            <div className={classes['hourly-item']} key={hour.dt}>
                <h4 className={classes['hour']}>{getHourMinuteDate(hour.dt)}</h4>
                <img src={getIconPath(hour.weather[0].icon)} alt={hour.weather[0].description} width='40' height='40' />
                <div>{Math.round(hour.temp)}&#176;C</div>
            </div>
        ));
    }

    // carousel
    const responsive = {
        0: { items: 3 },
        420: { items: 4 },
        520: { items: 5 },
        620: { items: 6 },
        720: { items: 7 },
        820: { items: 8 },
        920: { items: 9 },
        979: { items: 5 },
        1400: { items: 6 },
    };

    const renderPrevButton = ({ isDisabled }) => (
        <button style={{ opacity: isDisabled ? '0.5' : 1}} className={classes['carousel-prev-btn']}/>
    );

    const renderNextButton = ({ isDisabled }) => (
        <button style={{ opacity: isDisabled ? '0.5' : 1 }} className={classes['carousel-next-btn']}/>
    );

    if (!weather) return <LoadingIndicator />

    return (
        <section className={classes['container']}>
            <h2 className={classes['date']}>
                {getFullDate(weather.current.dt)}
            </h2>
            <div className={classes['general']}>
                <img src={getIconPath(weather.current.weather[0].icon)} alt={weatherDescription} width='70' height='70' />
                <span className={classes['main-temp']}>{Math.round(weather.current.temp)}&#176;C</span>
                <div className={classes['secondary']}>
                    <span>{weatherDescription}</span>
                    <span>Feels like {Math.round(weather.current.feels_like)}&#176;C</span>
                </div>
                <div className={classes['secondary']}>
                    <span>Sunrise: {getHourMinuteDate(weather.current.sunrise)}</span>
                    <span>Sunset: {getHourMinuteDate(weather.current.sunset)}</span>
                </div>
            </div>
            <div className={classes['hourly']}>
                <AliceCarousel
                    items={renderHourly()}
                    responsive={responsive}
                    disableDotsControls={true}
                    renderPrevButton={renderPrevButton}
                    renderNextButton={renderNextButton}
                />
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