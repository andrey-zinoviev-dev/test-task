import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";
function NavBar(props) {

    return (
        <>
        <div className="header__navigation">
            <Link to="/" className={props.isUrlMainPage ? "header__navigation-link header__navigation-link_status_active" : "header__navigation-link"} onClick={props.onMainLickClick}>Главная</Link>
            <Link to="/rates" className={props.isUrlMainPage ? "header__navigation-link" : "header__navigation-link header__navigation-link_status_active"} onClick={props.onNotMainLinkClick}>Котировки</Link>
        </div>
        
        </>
    )
}

export default NavBar;