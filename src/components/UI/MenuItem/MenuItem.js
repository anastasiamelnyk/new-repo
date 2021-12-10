import {NavLink} from "react-router-dom";
import classes from "./MenuItem.module.scss";

const MenuItem = ({ path, children }) => {
    return (
        <NavLink to={path} exact className={classes['menu-item']} activeClassName={classes['selected']}>
            {children}
        </NavLink>
    );
};

export default MenuItem;