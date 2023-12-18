import {React} from 'react'
import logo from "../../images/logo.svg";
import "./header.scss";
import "../../style/style.scss";
import { Link } from "react-router-dom";
import axios from "axios";
const Header3 = () => {
    const logOut =  () => {
        localStorage.removeItem("user");
        window.location.reload(false);
      };
  return (
    <div className="nav-bar__wrap section" id="nav">
        <nav className="nav-bar">
            <img className="nav-bar__logo" src={logo} alt="Logo"/>
            <div className="nav-bar__links-wrap">
                <div className="nav-bar__links_third-type">
                    <Link to="/accesses" className="nav-bar__link" ><p className="nav-bar__link-text">Журнал пацієнтів</p></Link>
                </div>
                <div className='nav-bar__button-wrap'>
                    <Link to="/account"><button className="nav-bar__button_account" ></button></Link>
                    <button className="nav-bar__button_exit" onClick={logOut}></button>
                </div>
                
                <div className="burger-menu">
                    <a href="" className="burger-menu__button">
                        <span className="burger-menu__line"></span>
                    </a>
                    <nav className="burger-menu__nav">
                        <Link to="/diary" className="menu__item" ><p className="nav-bar__link-text">TeethDiary</p></Link>
                        <Link to="/brushing" className="menu__item" ><p className="nav-bar__link-text">Brushing</p></Link>
                        <Link to="/brushes" className="menu__item" ><p className="nav-bar__link-text">Toothbrushes</p></Link>
                        <Link to="/symptoms" className="menu__item" ><p className="nav-bar__link-text">Symptoms</p></Link>
                    </nav>
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
export default Header3