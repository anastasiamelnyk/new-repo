import MenuItem from "../UI/MenuItem/MenuItem";

const MainMenu = () => {
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

    const renderMenuItems = () => (
        menuItems.map(menuItem => (
            <MenuItem key={menuItem.name} path={menuItem.link}>
                {menuItem.displayName}
            </MenuItem>))
    );

    return (
        <div className="edge-padding">
            <nav>
                {renderMenuItems()}
            </nav>
        </div>
    );
};

export default MainMenu;