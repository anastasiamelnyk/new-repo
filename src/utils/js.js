import format from 'date-fns/format';

const ICON_PATH = 'http://openweathermap.org/img/wn';

export const capitalizeFirstLetter = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getIconPath = weatherData => `${ICON_PATH}/${weatherData.weather[0].icon}@2x.png`;

export const getWeatherDescription = weatherData => capitalizeFirstLetter(weatherData.weather[0].description);

export const getFullDate = date => format(new Date(date), 'EEEE, MMMM do');

export const getWeekdayDate = date => format(new Date(date), 'EEEE');

export const getMonthDayDate = date => format(new Date(date), 'MMMM do');

export const getHourMinuteDate = date => format(new Date(date), 'HH:mm');

// returns array of unique objects
// objects are compared by single or multiple keys
export const getUniqueItemsArray = (array, keyToCompare) => {
    return array.reduce((acc, cur) => {
        const hasDuplicates = Array.isArray(keyToCompare)
            ? keyToCompare.every(key => acc.some(item => item[key] === cur[key]))
            : acc.some(item => item[keyToCompare] === cur[keyToCompare]);

        if (hasDuplicates) return acc;
        else return [...acc, cur];
    }, []);
}

// expects initial array of city objects and city object to delete
// returns array of city objects without one to be deleted
export const deleteCityFromArray = (array, city) => {
    return array.filter(item => item.lat !== city.lat && item.lon !== city.lon);
}

