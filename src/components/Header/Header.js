import React from 'react';
import NavBar from '../NavBar/NavBar';
import logoImage from '../../images/Logo.png';
import "./Header.css";

function Header(props) {
    
    
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <NavBar onMainLickClick={props.onMainLickClick} onNotMainLinkClick={props.onNotMainLinkClick} isUrlMainPage={props.isUrlMainPage}></NavBar>
                    <img className="header__navigation-logo" alt="Логотип" src={logoImage}></img>
                    <button className="header__navigation-popup-button" onClick={props.openPopupWindow}>Модальное окно</button>
                </div>
            </div>
        </header>
    )
}

export default Header;