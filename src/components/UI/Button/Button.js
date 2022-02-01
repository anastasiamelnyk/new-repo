import PropTypes from 'prop-types';
import classes from './Button.module.scss';

const Button = ({ children, variant, clicked }) => {
    if (variant === 'add') return <button onClick={clicked} className={classes['button-add']} />

    return (
        <button className={classes['default-button']} onClick={clicked}>
            {children}
        </button>
    );
};

export default Button;

Button.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf(['add']),
    clicked: PropTypes.func
};

Button.defaultProps = {
    children: '',
    variant: '',
    clicked: null
};