import {React, useState, useRef} from 'react'
import "./register.scss";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const adressRef = useRef(null);
  const specialityRef = useRef(null);
  const passwordRef = useRef(null);
  const passwCheck = useRef(null);
  const submitRef = useRef(null);
  const errorRef =useRef(null);
  const emailRef = useRef(null);
  const regex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$");
  const regEmail = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,})+$");
  const navigate = useNavigate();
  const [passw, passwCh]=useState({
    passwCheck:"",
  });
  const sex ="жіноча";
  const type ="пацієнт";
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
    usertype:type, 
    sex:sex,
    workadress:"", 
    specialization: "", 
    phone:"",
    birthday:""
  });
  const [err, setErr] = useState(null);
  const handleChange = (e) =>{
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const CheckPassword = (e) =>{
    passwCh({ [e.target.name]: e.target.value });    
  }
  if(specialityRef.current!==null){
  if(passw.passwCheck!==inputs.password){
    passwCheck.current.style.borderColor="red";
    passwCheck.current.style.borderWidth="3px";
    passwCheck.current.style.borderStyle="solid";
    submitRef.current.style.pointerEvents = 'none';
    errorRef.current.innerText="Введіть коректний пароль!";
  }else if (passw.passwCheck===inputs.password && passw.passwCheck!==""){
    passwCheck.current.style.borderWidth="0px";
    submitRef.current.style.pointerEvents = 'auto';
    errorRef.current.innerText="";
  }
  if(inputs.usertype==='пацієнт'){
    specialityRef.current.style.pointerEvents = 'none';
    specialityRef.current.style.backgroundColor='gray';
    adressRef.current.style.pointerEvents = 'none';
    adressRef.current.style.backgroundColor='gray';
  }else if(inputs.usertype==='лікар'){
    specialityRef.current.style.pointerEvents = 'auto';
    specialityRef.current.style.backgroundColor='#D9D9D9';
    adressRef.current.style.pointerEvents = 'auto';
    adressRef.current.style.backgroundColor='#D9D9D9';
  }
  if(inputs.password.match(regex)!==null){
    passwordRef.current.style.borderWidth="0px";
    errorRef.current.innerText="";
  }
  if(inputs.email.match(regEmail)!==null){
    emailRef.current.style.borderWidth="0px";
    errorRef.current.innerText="";
  }
}
  const handleClick = async (e) => {
    e.preventDefault();
    if(inputs.email=="" || inputs.username=="" || inputs.usertype=="" ||inputs.password==""){
      errorRef.current.innerText="Введіть необхідні дані!"
    }else{
      if(!inputs.password.match(regex)){
        errorRef.current.innerText="Пароль не відповідає неохідним вимогам безпеки!";
        passwordRef.current.style.borderColor="red";
        passwordRef.current.style.borderWidth="3px";
        passwordRef.current.style.borderStyle="solid";
      }if(!inputs.email.match(regEmail)){
        errorRef.current.innerText="Введіть коректну адресу!";
        emailRef.current.style.borderColor="red";
        emailRef.current.style.borderWidth="3px";
        emailRef.current.style.borderStyle="solid";
      }else{
        errorRef.current.innerText="";
        try {
          await axios.post("http://localhost:8800/auth/register", inputs).then(res=>{
            if(res.data=="Користувач був створений."){
              navigate("/login");
            }else{
              alert("Щось пішло не так! Ви не зареєстровані. Спробуйте ще раз.")
            }
          });
        } catch (err) {
          setErr(err.response.data);
        }
    }
    }
  };
  return (
    <div className='registration'>
      <form className='registration__form'>
        <div className='form__field form__name'>
          <p className='form__text'>Прізвище Ім'я Побатькові:</p>
          <input type="text" className='form__input' name="username" onChange={handleChange}/>
        </div>
        <div className='form__field form__email'>
          <p className='form__text'>Електронна адреса:</p>
          <input type="text" className='form__input' name="email" ref={emailRef} onChange={handleChange}/>
        </div>
        <div className=' form__field form__phone'>
          <p className='form__text'>Номер телефону:</p>
          <input type="text" className='form__input' name="phone"  onChange={handleChange}/>
        </div>
        <div className='form__field form__birthday'>
          <p className='form__text'>Дата народження:</p>
          <input type="date" className='form__input form__field_date'  name="birthday" onChange={handleChange}/>
        </div>
        <div className='form__field form__sex'>
          <p className='form__text'>Стать:</p>
          <select className='form__input form__input_select' name="sex" onChange={handleChange} >
            <option selected="selected">жіноча</option>
            <option>чоловіча</option>
          </select>
        </div>
        <div className='form__field form__type'>
          <p className='form__text'>Тип користувача</p>
          <select className='form__input form__input_select'  name='usertype' onChange={handleChange}>
            <option selected="selected">пацієнт</option>
            <option>лікар</option>
          </select>
        </div>
        <div className='form__field form__adress'>
          <p className='form__text'>Робоча адреса:</p>
          <input type="text" className='form__input' name='workadress' ref={adressRef} onChange={handleChange}/>
        </div>
        <div className='form__field form__speciality'>
          <p className='form__text'>Спеціалізація:</p>
          <input type="text" className='form__input' name='specialization' ref={specialityRef} onChange={handleChange}/>
        </div>
        <div className='form__field form__passw'>
          <p className='form__text'>Пароль:</p>
          <input type="password" className='form__input' name='password'  placeholder='Введіть пароль' ref={passwordRef} onChange={handleChange}/>
        </div>
        <div className='form__field form__passw-check'>
          <p className='form__text'>Перевірка паролю:</p>
          <input type="password" className='form__input' name='passwCheck'   onChange={CheckPassword} ref={passwCheck} placeholder='Введіть пароль ще раз'/>
        </div>
        <div className='form__bottom'>
          <p className='form__text_error' ref={errorRef}>{err}</p>
          <button className='form__button' ref={submitRef}  onClick={handleClick}>Реєстрація</button>
        </div>
      </form>

    </div>
  )
}
export default Register