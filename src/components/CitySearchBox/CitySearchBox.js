import {useState} from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import classes from "./CitySearchBox.module.scss";

const CitySearchBox = ({ search }) => {
    const [searchReq, setSearchReq] = useState('');
    const currentCity = useSelector(store => store.locationReducer.location);

    return (
        <form onSubmit={(e) => search(e, searchReq)} className={classes['input-row']}>
            <div className={classes['search-icon-container']}>
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" width="32px" viewBox="0 0 32 32">
                    <path d="M19.4271164,20.4271164 C18.0372495,21.4174803 16.3366522,22 14.5,22 C9.80557939,22 6,18.1944206 6,13.5 C6,8.80557939 9.80557939,5 14.5,5 C19.1944206,5 23,8.80557939 23,13.5 C23,15.8472103 22.0486052,17.9722103 20.5104077,19.5104077 L26.5077736,25.5077736 C26.782828,25.782828 26.7761424,26.2238576 26.5,26.5 C26.2219324,26.7780676 25.7796227,26.7796227 25.5077736,26.5077736 L19.4271164,20.4271164 L19.4271164,20.4271164 Z M14.5,21 C18.6421358,21 22,17.6421358 22,13.5 C22,9.35786417 18.6421358,6 14.5,6 C10.3578642,6 7,9.35786417 7,13.5 C7,17.6421358 10.3578642,21 14.5,21 L14.5,21 Z" fill="currentColor"/>
                </svg>
            </div>
            <input
                placeholder={currentCity?.name}
                onChange={(e) => setSearchReq(e.target.value)}
                className={classes['search-input']}
                value={searchReq}
            />
        </form>
    );
};

export default CitySearchBox;

CitySearchBox.propTypes = {
    search: PropTypes.func
}

CitySearchBox.defaultProps = {
    search: null
}