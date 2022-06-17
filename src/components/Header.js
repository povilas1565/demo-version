import React from "react";
import { NavLink, useLocation } from 'react-router-dom';
import headerLogo from "../images/headerlogo.svg";


function Header({isLoggedIn, userEmail, onSignOut, isLoading}) {

    const location = useLocation();
    const isLocationSignIn = location.pathname === '/sign-in';
    const isLocationMain = location.pathname === '/';
    const [isColumnMenu, setColumnMenu] = React.useState(false);

    function handleSignOut() {
        onSignOut();
        setColumnMenu(false);
    }

    function handleSignIn() {
    }

    function handleMenuClick() {
        setColumnMenu(true);
    }

    function handleCloseMenu() {
        setColumnMenu(false);
    }

    return (
        <header className={`header ${!isColumnMenu ? "page_container" : ""} ${isColumnMenu ? "header_columned" : ""}`}>
            <div className={`header_logo-container ${isColumnMenu ? "header_logo-container_type_column" : ""}`}>
                <img
                    className="header_logo appear"
                    src={headerLogo}
                    alt="Логотип сайта с надписью Недвижимость английскими буквами"
                />
                <button onClick={handleCloseMenu} type="button" aria-label="Close menu" className={`btn-close btn-close_place_header ${isColumnMenu ? "btn-close_active" : ""}`}></button>
            </div>
            <div onClick={handleMenuClick} className= {`header_btn-menu ${(!isLoggedIn || isColumnMenu) ? "header_btn-menu_type_inactive" : ""}`}>
                <div className="header_burger-line"></div>
                <div className="header_burger-line"></div>
                <div className="header_burger-line"></div>
            </div>
            { (!isLoading || isLocationMain) &&
                <nav className={`header__nav-container appear ${isLoggedIn && !isColumnMenu ? "header_nav-container_type_inactive" : ""} ${isColumnMenu ? "header_nav-container_type_column" : ""} `}>
                    <p className="header_email">{isLoggedIn ? userEmail : ""}</p>
                    {!isLocationSignIn ?
                        <NavLink onClick={!isLoggedIn ? handleSignIn : handleSignOut} className={`header__nav-item ${isLocationMain ? "header_nav-item_active" : ""}`} to={"/sign-in"}>{isLoggedIn ? "logout" : "login"}</NavLink>
                        :
                        <NavLink className="header_nav-item" activeClassName="header_nav-item_active" to={"/sign-up"}>{!isLoggedIn ? "Register" : ""}</NavLink>
                    }
                </nav>
            }

        </header>
    );
}
export default Header;