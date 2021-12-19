import PropTypes from 'prop-types';
import classes from './Tabs.module.scss';
import classNames from "classnames/bind";
import {useRef} from "react";

const Tabs = ({ options, keysToDisplay, variant, value, setValue }) => {
    const cx = useRef(classNames.bind(classes));
    const tabsClasses = cx.current({
        'tabs': true,
        'tabs-vertical': variant === 'vertical'
    });
    const tabButtonClasses = (tabItem) => cx.current({
        'tab-button': true,
        'tab-button-selected': getTabSelected(tabItem)
    });
    const getTabSelected = (tabItem) => {
        if (!value) return;
        return typeof tabItem === 'object'
            ? keysToDisplay.every(key => tabItem[key] === value[key])
            : tabItem === value;
    };

    const renderOptions = () => {
        if (!options || !options.length) return null;
        const getOptionText = option => typeof option === 'object'
            ? keysToDisplay.map(cur => option[cur]).join(', ')
            : option;

        return options.map(option => (
            <li key={getOptionText(option)} className={classes['tab-item']}>
                <button className={tabButtonClasses(option)} onClick={() => setValue(option)}>
                    {getOptionText(option)}
                </button>
            </li>
        ));
    }

    return (
        <ul className={tabsClasses}>
            {renderOptions()}
        </ul>
    );
};

export default Tabs;

Tabs.propTypes = {
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
    keysToDisplay: PropTypes.arrayOf(PropTypes.string), //needed if options are objects, selects which key info will be displayed
    variant: PropTypes.oneOf(['horizontal', 'vertical']),
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    setValue: PropTypes.func
}

Tabs.defaultProps = {
    options: [],
    keysToDisplay: [],
    variant: 'vertical',
    value: '',
    setValue: null
}