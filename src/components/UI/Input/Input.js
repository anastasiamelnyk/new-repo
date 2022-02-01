import classes from "./Input.module.scss";
import PropTypes from 'prop-types';

const Input = ({labelText, register, inputId, errorText}) => {
    return (
        <label className={classes['container']}>
            <span className={classes['label']}>{labelText}</span>
            <div>
                <input className={classes['input']} {...register(inputId)} />
                {errorText &&
                <div className={classes['error']}>
                    {errorText}
                </div>
                }
            </div>
        </label>
    );
};

export default Input;

Input.propTypes = {
    labelText: PropTypes.string,
    register: PropTypes.func,
    inputId: PropTypes.string,
    errorText: PropTypes.string
}

Input.defaultProps = {
    labelText: '',
    register: null,
    inputId: '',
    error: ''
}