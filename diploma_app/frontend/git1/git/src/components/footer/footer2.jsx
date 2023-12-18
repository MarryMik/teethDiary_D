import React from 'react'
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import "./footer.scss";
const Footer2 = () => {
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
                        <Link to="/diary" className='footer__links_up'><p className='footer__links-text'>TeethDiary</p></Link>
                        <Link to="/brushing" className='footer__links_up'><p className='footer__links-text'>Brushing</p></Link>
                        <Link to="/brushes" className='footer__links_up'><p className='footer__links-text'>Toothbrushes</p></Link>
                        <Link to="/symptoms" className='footer__links_up'><p className='footer__links-text'>Symptoms</p></Link>
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
export default Footer2