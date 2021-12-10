import PropTypes from 'prop-types';
import {getFullDate, getIconPath, getWeatherDescription, getHourMinuteDate} from "../../utils/js";
import classes from './forecastItem.module.scss';

const ForecastItem = ({forecast}) => {
    return (
        <section>
            <h3 className={classes['forecast-date']}>
                {getFullDate(forecast.dt)}
            </h3>
            <div className={classes['forecast-weather']}>
                <img src={getIconPath(forecast)} alt={getWeatherDescription(forecast)} width={80} height={80}/>
                <div>
                    <span>{getWeatherDescription(forecast)}</span>
                    <div>
                        <span>{Math.round(forecast.temp.max)}&#176;C</span>
                        &nbsp;/&nbsp;
                        <span>{Math.round(forecast.temp.min)}&#176;C</span>
                    </div>
                </div>
            </div>
            <div className={classes['forecast-timing']}>
                <div className={classes['timing-item']}>
                    <div className={classes['timing-row']}>
                        <span>Sunrise:</span>
                        {getHourMinuteDate(forecast.sunrise)}
                    </div>
                    <div className={classes['timing-row']}>
                        <span>Sunset:</span>
                        {getHourMinuteDate(forecast.sunset)}
                    </div>
                </div>
                <div className={classes['timing-item']}>
                    <div className={classes['timing-row']}>
                        <span>Moonrise:</span>
                        {getHourMinuteDate(forecast.moonrise)}
                    </div>
                    <div className={classes['timing-row']}>
                        <span>Moonset:</span>
                        {getHourMinuteDate(forecast.moonset)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForecastItem;

ForecastItem.propTypes = {
    forecast: PropTypes.object,
}