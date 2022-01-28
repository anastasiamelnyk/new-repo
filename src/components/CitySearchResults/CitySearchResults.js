import Button from "../UI/Button/Button";
import PropTypes from "prop-types";
import classes from "./CitySearchResults.module.scss";


const CitySearchResults = ({ searchResults, addToList }) => {
    if (!searchResults) return null;

    if (searchResults.length === 0) return (
        <div className={classes['search-not-found']}>
            Nothing found, please try again
        </div>
    );

    return (
        <ul className={classes['search-list']}>
            {searchResults.map(result => (
                <li className={classes['search-item']} key={result.lat}>
                    <Button variant='add' clicked={() => addToList(result)}/>
                    <div className={classes['search-city']}>
                        {result.name}, {result.country}, {result.state}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CitySearchResults;

CitySearchResults.propTypes = {
    searchResults: PropTypes.arrayOf(PropTypes.object)
}

CitySearchResults.defaultProps = {
    searchResults: null
}