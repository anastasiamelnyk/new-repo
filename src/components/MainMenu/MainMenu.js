import MenuItem from "../UI/MenuItem/MenuItem";
import classNames from 'classnames/bind';
import {useRef, useState} from "react";
import classes from './MainMenu.module.scss';
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import AuthTabs from "../AuthTabs/AuthTabs";

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
    const [isLoginModalShown, setLoginModalShown] = useState(false);

    const renderMenuItems = () => (
        menuItems.map(menuItem => (
            <MenuItem key={menuItem.name} path={menuItem.link}>
                {menuItem.displayName}
            </MenuItem>))
    );

    return (
        <div className={menuContainerClasses}>
            <nav>
                {renderMenuItems()}
            </nav>
            <div>
                <Button clicked={() => setLoginModalShown(true)}>
                    Login
                </Button>
            </div>
            <Modal isShown={isLoginModalShown} closeModal={() => setLoginModalShown(false)}>
                <AuthTabs />
            </Modal>
        </div>
    );
};

export default MainMenu;