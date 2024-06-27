import { Logout, Menu, Add } from "@mui/icons-material";
import "./ManuBar.css";
import { User } from "../../hooks/useUser";

interface MenuButtonsProps {
    logoutHandler?: () => void;
    menuHandler?: () => void;
    adminButton?: () => void;
    user: User
}


const MenuButtons: React.FC<MenuButtonsProps> = ({logoutHandler, menuHandler, adminButton, user}) => {
    const isAdmin: boolean = user.role == "ADMIN";
    return (
        <div id="menu-bar">
            {isAdmin && <div className="icon-wrapper"
                    onClick={adminButton}>
                <Add/>
            </div>}
            {/* <div className="icon-wrapper"
                onClick={menuHandler}>
                <Menu/>
            </div> */}
            <div className="icon-wrapper"
                onClick={logoutHandler}>
                <Logout/>
            </div>
        </div>
    );
};

export default MenuButtons;
