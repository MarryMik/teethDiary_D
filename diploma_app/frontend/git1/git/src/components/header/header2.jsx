import {React} from 'react'
import logo from "../../images/logo.svg";
import "./header.scss";
import "../../style/style.scss";
import { Link } from "react-router-dom";
const Header2 = () => {
    const logOut =  () => {
        localStorage.removeItem("user");
        localStorage.removeItem("treatment");
        localStorage.removeItem("doctor");
        localStorage.removeItem("procedure");
        localStorage.removeItem("patient");
        localStorage.removeItem("record");
        window.location.reload(false);
      };
  return (
    <div className="nav-bar__wrap section" id="nav">
        <nav className="nav-bar">
            <img className="nav-bar__logo" src={logo} alt="Logo"/>
            <div className="nav-bar__links-wrap">
                <div className="nav-bar__links">
                    <Link to="/diary" className="nav-bar__link" ><p className="nav-bar__link-text">TeethDiary</p></Link>
                    <Link to="/brushing" className="nav-bar__link" ><p className="nav-bar__link-text">Brushing</p></Link>
                    <Link to="/brushes" className="nav-bar__link" ><p className="nav-bar__link-text">Toothbrushes</p></Link>
                    <Link to="/symptoms" className="nav-bar__link" ><p className="nav-bar__link-text">Symptoms</p></Link>
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
export default Header2