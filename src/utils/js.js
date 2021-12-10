import format from 'date-fns/format';

const ICON_PATH = 'http://openweathermap.org/img/wn';

export const capitalizeFirstLetter = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getIconPath = weatherData => `${ICON_PATH}/${weatherData.weather[0].icon}@2x.png`;

export const getWeatherDescription = weatherData => capitalizeFirstLetter(weatherData.weather[0].description);

export const getFullDate = date => format(new Date(date), 'EEEE, MMMM do');

export const getWeekdayDate = date => format(new Date(date), 'EEEE');

export const getMonthDayDate = date => format(new Date(date), 'MMMM do');

export const getHourMinuteDate = date => format(new Date(date), 'HH:mm');

