import React from 'react'
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import "./footer.scss";
const Footer =()=>{
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
                    <div className='footer__links_bottom'>
                        <Link to="/login" className='footer__links'><p className='footer__links-text'>Увійти</p></Link>
                        <Link to="/register" className='footer__links'><p className='footer__links-text'>Реєстрація</p></Link>
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
export default Footer;