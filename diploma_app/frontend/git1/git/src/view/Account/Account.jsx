import {React,useContext} from 'react'
 import  account_img from "../../images/icons/svges/account_circle_icon (1).svg"
 import "./account.scss"
 import { AuthContext } from "../../context/authContext"; 
const Account = () => {
  const { currentUser } = useContext(AuthContext);
  const dateBirth="";
  if (currentUser.birthday!==null){
    dateBirth=(currentUser.birthday).slice(0,10);
  }
  const accont_data =[  
    {username: currentUser.username},
    {email:currentUser.email},
    {password:currentUser.password},
    {usertype:currentUser.usertype}, 
    {sex:currentUser.sex},
    {workadress: currentUser.workadress}, 
    {specialization: currentUser.specialization}, 
    {phone:currentUser.phone},
    {birthday: dateBirth}
]
localStorage.removeItem("update")
  return (
    <>
    <div className='account'>
      <div className='account__wrap'>
        <div className='account__left'>
          <img className='account__img' src={account_img}/>
          <div className='account__buttns-wrap'>
          </div>
        </div>
        <div className='account__right'>
          <div className="account__input-wrap">
            <p className='account__text_tittle'>ПІБ:</p>
            <input 
              type="text" 
              className='account__input account__input_name'
              defaultValue={accont_data[0].username}
              />
          </div>
          <div className="account__input-wrap">
            <p className='account__text_tittle'>Дата народження:</p>
            <input 
              type="text" 
              className='account__input account__input_birthday'
              defaultValue={accont_data[8].birthday}
              />
          </div>
          <div className="account__input-wrap">
            <p className='account__text_tittle'>Стать:</p>
            <input 
              type="text" 
              className='account__input account__input_sex'
              defaultValue={accont_data[4].sex}
              />
          </div>
          <div className="account__input-wrap">
            <p className='account__text_tittle'>Номер телефону:</p>
            <input 
              type="phone" 
              className='account__input account__input_phone'
              defaultValue={accont_data[7].phone}
              />
          </div>
          <div className="account__input-wrap">
            <p className='account__text_tittle'>Пошта:</p>
            <input 
              type="email" 
              className='account__input account__input_email'
              value={accont_data[1].email}
              />
          </div>
          <div className="account__input-wrap">
            <p className='account__text_tittle'>Спеціалізація:</p>
            <input 
              type="text" 
              className='account__input account__input_speciality'
              defaultValue={accont_data[6].specialization}
            />
          </div>
          <div className="account__input-wrap">
            <p className='account__text_tittle'>Робоча адреса:</p>
            <input 
              type="text" 
              className='account__input account__input_adress'
              defaultValue={accont_data[5].workadress}
              />
          </div>
        </div>
       </div> 
    </div>
    </>
  )
}
export default Account