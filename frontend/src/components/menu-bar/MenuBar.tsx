import { Logout, Menu } from "@mui/icons-material";
import "./ManuBar.css";

interface MenuButtonsProps {
    logoutHandler?: () => void
    menuHandler?: () => void
}


const MenuButtons: React.FC<MenuButtonsProps> = ({logoutHandler, menuHandler}) => {
    return (
        <div id="menu-bar">
            <div className="icon-wrapper"
                onClick={menuHandler}>
                <Menu/>
            </div>
            <div className="icon-wrapper"
                onClick={logoutHandler}>
                <Logout/>
            </div>
        </div>
    );
};

export default MenuButtons;
