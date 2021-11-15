import {createPortal} from "react-dom";
import classes from './Modal.module.scss';
import PropTypes from 'prop-types';

const Modal = ({ isShown, closeModal, children }) => {
    const close = e => {
        e.stopPropagation();
        closeModal();
    }

    if (!isShown) return null;

    return (
        createPortal(
            <div className={classes['overlay']} onClick={close}>
                <div className={classes['modal']} onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>, document.getElementById('modal')
        )
    );
};

export default Modal;

Modal.propTypes = {
    isShown: PropTypes.bool,
    closeModal: PropTypes.func,
    children: PropTypes.node,
}