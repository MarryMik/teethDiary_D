import React from 'react'
import "./footer.scss";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
const Footer3 = () => {
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
    <div className='footer'>
      <div className="footer__upper-part">
                <div className='footer__left'>
                    <img className='footer__logo' src={logo}></img>
                </div>
                <div className='footer__right'>
                    <div className='footer__slogan'>
                        <p className='slogan__text'>
                            Зубний щоденник - створений задля вашого здоров'я.
                        </p>
                    </div>
                    <div className='footer__links'>
                        <Link to="/accesses" className='footer__links_up'><p className='footer__links-text'>Журнал пацієнтів</p></Link>
                        <Link to="/account" className='footer__links_up'><p className='footer__links-text'>Акаунт</p></Link>
                        <Link className='footer__links_up'><p className='footer__links-text' onClick={logOut}>Вийти</p></Link>
                    </div>
                </div>
            </div>
            <hr className="footer__line"/>
            <div className='footer__bottom'>
                
                <p className='footer__bottom-text'>Coryright @ 2023 TeethDiary all right reserved.</p>
            </div>
    </div>
  )
}
export default Footer3