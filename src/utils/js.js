import format from 'date-fns/format';

const ICON_PATH = 'http://openweathermap.org/img/wn';

export const capitalizeFirstLetter = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getIconPath = icon => `${ICON_PATH}/${icon}@2x.png`;

export const getFullDate = date => format(new Date(date), 'EEEE, MMMM do');

export const getHourMinuteDate = date => format(new Date(date), 'HH:mm');

