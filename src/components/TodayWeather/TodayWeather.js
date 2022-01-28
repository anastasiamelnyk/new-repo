import LoadingIndicator from "../UI/LoadingIndicator/LoadingIndicator";
import classes from './todayWeather.module.scss';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { getFullDate, getHourMinuteDate, getIconPath, getWeatherDescription } from "../../utils/js";
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import {useMemo} from "react";

const TodayWeather = ({ weather, isSavedCity }) => {
    const dayHourly = useMemo(() => {
        const dayHourlyFull = cloneDeep(weather?.hourly);
        return dayHourlyFull?.splice(0, 24);
    }, [weather]);

    const renderHourly = () => {
        return dayHourly.map(hour => (
            <div className={classes['hourly-item']} key={hour.dt}>
                <h4 className={classes['hour']}>{getHourMinuteDate(hour.dt)}</h4>
                <img src={getIconPath(hour)} alt={getWeatherDescription(hour)} width='40' height='40' />
                <div>{Math.round(hour.temp)}&#176;C</div>
            </div>
        ));
    }

    // carousel
    const responsive = isSavedCity
        ? {
            0: { items: 2 },
            420: { items: 3 },
            520: { items: 5 },
            620: { items: 6 },
            720: { items: 7 },
            768: { items: 4 },
            920: { items: 5 },
            1120: { items: 6 },
            1220: { items: 7 },
            1400: { items: 8 }
        } : {
            0: { items: 3 },
            420: { items: 4 },
            520: { items: 5 },
            620: { items: 6 },
            720: { items: 7 },
            820: { items: 8 },
            920: { items: 9 },
            979: { items: 5 },
            1400: { items: 6 }
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
                <img src={getIconPath(weather.current)} alt={getWeatherDescription(weather.current)} width='70' height='70' />
                <span className={classes['main-temp']}>{Math.round(weather.current.temp)}&#176;C</span>
                <div className={classes['secondary']}>
                    <span>{getWeatherDescription(weather.current)}</span>
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
    weather: PropTypes.shape({
        current: PropTypes.object,
        hourly: PropTypes.array
    }),
    isSavedCity: PropTypes.bool
}

TodayWeather.defaultProps = {
    weather: null,
    isSavedCity: false
}