import React from 'react'
import logo from "../../images/logo.svg";
import "./header.scss";
import "../../style/style.scss";
import { Link } from "react-router-dom";
const Header =()=>{
    return (
        <div className="nav-bar__wrap section" id="nav">
        <nav className="nav-bar">
            <img className="nav-bar__logo" src={logo} alt="Logo"/>
            <div className="nav-bar__links-wrap">
                <div className='nav-bar__button-wrap'>
                    <Link to="/login"> <button className="nav-bar__button_login" ><p className="nav-bar__button-text">Увійти</p></button></Link>
                    <Link to="/register"><button className="nav-bar__button_sign-up" ><p className="nav-bar__button-text">Реєстрація</p></button></Link>
                </div>
                <div className="burger-menu">
                    <a href="" className="burger-menu__button">
                        <span className="burger-menu__line"></span>
                    </a>
                    <div className="burger-menu__overlay"></div>
                </div>
            </div>
        </nav>
        <div className="progress-bar__wrap">
            <div className="progress-bar" id="scroll-progress"></div>
        </div>
    </div>
    )
}
export default Header;
