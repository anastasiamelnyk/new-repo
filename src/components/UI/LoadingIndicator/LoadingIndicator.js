import classes from './loadingIndicator.module.scss';

const LoadingIndicator = () => {
    return (
        <div className={classes['loading-container']}>
            <div className={classes['loading-indicator']} />
        </div>
    );
};

export default LoadingIndicator;