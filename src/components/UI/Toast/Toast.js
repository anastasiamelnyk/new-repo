import {createPortal} from "react-dom";
import classes from "./Toast.module.scss";
import classNames from "classnames/bind";
import {useEffect, useRef} from "react";

const Toast = ({ isShown, isError, closeToast, text }) => {
    const disappearTimer = useRef(null);
    const cx = useRef(classNames.bind(classes));
    const toastClasses = cx.current('toast', {'error': isError});
    const renderCloseButton = () => isError
        ? (<button className={classes['close-btn']} onClick={closeToast} />)
        : null;

    useEffect(() => {
        if (isShown && !isError) disappearTimer.current = setTimeout(closeToast, 3000);

        return () => {
            if (disappearTimer.current) clearTimeout(disappearTimer.current);
        }
    }, [isShown, isError]);

    if (!isShown) return null;

    return (
        createPortal(
            <div className={toastClasses}>
                {renderCloseButton()}
                {text}
            </div>, document.getElementById('toast')
        )
    );
};

export default Toast;