import React from 'react'
import "./home.scss";
import photo from "../../images/main_picture.svg"
const Home = () => {
  return (
    <div className='main'>
      <div className='presentation'>
        <div className='presentation__left'>
          <div className='presentation__headline-wrap'>
            <p className='presentation__headline_first'>TEETHDIARY-</p>
            <p className='presentation__headline_second'>подбай про своє здоров'є!</p>
          </div>
          <div className='presentation__list-items_wrap'>
            <div className='presentation__list-wrap'>
              <ul className='presentation__list'>
                <li className='presentation__list-item'>
                  <p className='presentation__list-item_text'>Щоденник пацієнта</p>
                </li>
                <li className='presentation__list-item'>
                  <p className='presentation__list-item_text'>Журнал пацієнтів</p>
                </li>
                <li className='presentation__list-item'>
                  <p className='presentation__list-item_text'>Трекер чистки зубів</p>
                </li>
                <li className='presentation__list-item'>
                  <p className='presentation__list-item_text'>Щоденник замін зубних щіток</p>
                </li>
                <li className='presentation__list-item'>
                  <p className='presentation__list-item_text'>Щоденник спостерігача</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='presentation__right'>
          <img className='presentation__photo' src={photo} alt="MultiTooth"/>
          <div className='presentation__photo-back'> 
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home