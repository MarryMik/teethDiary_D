import React from 'react'
import date_img from "../../images/icons/svges/calendar_icon.svg"
const AppointmentDiary = () => {
  return (
    <>
    <div className='shedule-board'>
      <div className='shedule__head_first'>
        <button className='shedule__butn_add'></button>
      </div>
      <div className='shedule__head_monday'>
        <p className='shedule__text_weekday'>Понеділок</p>
        <p className='shedule__text_date'></p>
      </div>
      <div className='shedule__head_tuesday'>
        <p className='shedule__text_weekday'>Вівторок</p>
        <p className='shedule__text_date'></p>
      </div>
      <div className='shedule__head_wednesday'>
        <p className='shedule__text_weekday'>Середа</p>
        <p className='shedule__text_date'></p>
      </div>
      <div className='shedule__head_thusday'>
        <p className='shedule__text_weekday'>Четверг</p>
        <p className='shedule__text_date'></p>
      </div>
      <div className='shedule__head_friday'>
        <p className='shedule__text_weekday'>П'ятниця</p>
        <p className='shedule__text_date'></p>
      </div>
      <div className='shedule__head_saturday'>
        <p className='shedule__text_weekday'>Субота</p>
        <p className='shedule__text_date'></p>
      </div>
      <div className='shedule__head_sunday'>
        <p className='shedule__text_weekday'>Неділя</p>
        <p className='shedule__text_date'></p>
      </div>
      <div className='schedule__time'><p className='schedule__text'>08:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>09:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>10:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>11:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>12:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>13:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>14:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>15:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>16:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>17:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>18:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>19:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>20:00</p></div>
      <div className='schedule__time'><p className='schedule__text'>21:00</p></div>    
    </div>
    <div className='buttons'>
      <button className='buttons__left'></button>
      <button className='buttons__right'></button>
    </div>
    <div className='appointment__form'>
        <p className='appointment__header'>Прийом</p>
        <form className='appointment__form'>
          <div className='appointment__input_wrap'>
            <p className='appointment__text_input'>Оберіть дату і час:</p>
            <input type="text" className='appointment__input' name="date"/>
            <img className='input-img__date' src={date_img}/>
          </div>
          <div className='appointment__input_wrap'>
            <p className='appointment__text_input'>Прізвище Ім'я Побатькові:</p>
            <input type="text" className='appointment__input' name="name"/>
          </div>
          <div className='appointment__input_wrap'>
            <p className='appointment__text_input'>Номер телефону:</p>
            <input type="text" className='appointment__input' name="phone"/>
          </div>
          <div className='appointment__buttn-wrap'>
            <button className='form__buttn patient-butn__add'><p className='buttn__text'>Додати</p></button>
            <button className=' form__buttn patient-butn__add'><p className='buttn__text'>Пошук</p></button>
          </div>
          <div className='appointment__search-result_wrap'>
            <p className='result__text_header'>Результат пошуку</p>
            <div className='search__results-wrap'>
              <div className='search__text_result'>
                <p className='result__text_name'>Кіріченко Василь Григорович</p>
                <p className='result__text_phone'>+380966666666</p>
                <button className=' form__buttn result__butn_choose'><p className='buttn__text'>Обрати</p></button>
              </div>
            </div>
          </div>
          <div className='form__wrap-buttn_last'>
            <butn className='form__buttn_accept'><p className='buttn__text'>Пібтвердити</p></butn>
          </div>         

        </form>
    </div>
    </>
  )
}
export default AppointmentDiary