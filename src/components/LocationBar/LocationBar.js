import classNames from 'classnames/bind';
import classes from "./locationBar.module.scss";
import {useSelector} from "react-redux";

const cx = classNames.bind(classes);

const LocationBar = () => {
    const location = useSelector(store => store.locationReducer.location);

    return (
        <div className={cx('edge-padding', 'location-bar')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={classes['pin']}>
                <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
            </svg>
            <span className={classes['city-name']}>{location?.name}</span>
        </div>
    );
};

export default LocationBar;