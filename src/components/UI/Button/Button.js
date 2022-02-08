import PropTypes from 'prop-types';
import classes from './Button.module.scss';

const Button = ({ children, variant, clicked, fullWidth }) => {
    if (variant === 'add') return <button onClick={clicked} className={classes['button-add']} />
    if (variant === 'linkStyled') return (
        <button onClick={clicked} className={classes['button-linkStyled']}>
            {children}
        </button>
    );

    return (
        <button
            onClick={clicked}
            className={classes['default-button']}
            style={fullWidth ? {width: '100%', minHeight: '38px'} : null}
        >
            {children}
        </button>
    );
};

export default Button;

Button.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf(['default', 'add', 'linkStyled']),
    clicked: PropTypes.func,
    fullWidth: PropTypes.bool
};

Button.defaultProps = {
    children: '',
    variant: 'default',
    clicked: null,
    foolWidth: false
};