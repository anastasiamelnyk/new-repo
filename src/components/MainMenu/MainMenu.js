import MenuItem from "../UI/MenuItem/MenuItem";
import classNames from 'classnames/bind';
import {useRef, useState} from "react";
import classes from './MainMenu.module.scss';
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import AuthTabs from "../AuthTabs/AuthTabs";
import {useDispatch, useSelector} from "react-redux";
import {logOutAction, setIsAuthModalOpenedAction} from "../../store/authReducer";

const MainMenu = () => {
    const cx = useRef(classNames.bind(classes));
    const menuContainerClasses = cx.current('edge-padding', 'container')
    const menuItems = [
        {
            name: 'city',
            displayName: 'Your city',
            link: '/'
        },
        {
            name: 'selected',
            displayName: 'Other cities',
            link: '/other-cities'
        }
    ];
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.authReducer.isAuth);
    const user = useSelector(state => state.authReducer.user);
    const isAuthModalOpened = useSelector(state => state.authReducer.isAuthModalOpened);

    const renderMenuItems = () => (
        menuItems.map(menuItem => (
            <MenuItem key={menuItem.name} path={menuItem.link}>
                {menuItem.displayName}
            </MenuItem>))
    );

    const renderAuthButtons = () => {
        return isAuth
            ? (
                <>
                    <span>{user.email}</span>
                    <Button clicked={() => dispatch(logOutAction)}>
                        Log out
                    </Button>
                </>
            ) : (
                <Button clicked={() => dispatch(setIsAuthModalOpenedAction(true))}>
                    Login
                </Button>
            );
    }

    return (
        <div className={menuContainerClasses}>
            <nav>
                {renderMenuItems()}
            </nav>
            <div className={classes['auth-buttons']}>
                {renderAuthButtons()}
            </div>
            <Modal
                isShown={isAuthModalOpened}
                closeModal={() => dispatch(setIsAuthModalOpenedAction(false))}
            >
                <AuthTabs />
            </Modal>
        </div>
    );
};

export default MainMenu;