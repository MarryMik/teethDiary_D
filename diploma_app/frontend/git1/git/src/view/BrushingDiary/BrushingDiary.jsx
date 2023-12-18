import * as React from 'react';
import { useRef } from 'react';
import BrushingRecord from '../../components/brushingRecord/brushingRecord';
import { makeRequest } from '../../axios';
import "./brushing_diary.scss";
import { useQuery, useMutation, queryClient } from 'react-query';
import axios from 'axios';
const BrushingDiary = () => {
let updateStatus = JSON.parse(localStorage.getItem("update"));
  const {isLoading: brushingLoading, error: brushingError, data: brushingData} =useQuery(['brushing'], ()=>
makeRequest.get("/brushing?userId="+JSON.parse(localStorage.getItem("user")).iduser).then(res=>{
  res.data.forEach((el)=>{
    if(el.brushing_date!==null){
    let stDate = new Date(el.brushing_date);
    el.brushing_date = `${stDate.getFullYear()}-${stDate.getMonth()+1}-${stDate.getDate()}`
    }
  })
  return res.data;
}));
const [checkedOne, setCheckedOne] = React.useState(0);
const [checkedTwo, setCheckedTwo] = React.useState(0);
const [checkedThree, setCheckedThree] = React.useState(0);
const [checkedFour, setCheckedFour] = React.useState(0);
const [checkedFive, setCheckedFive] = React.useState(0);
const [checkedOneEd, setCheckedOneEd] = React.useState(0);
const [checkedTwoEd, setCheckedTwoEd] = React.useState(0);
const [checkedThreeEd, setCheckedThreeEd] = React.useState(0);
const [checkedFourEd, setCheckedFourEd] = React.useState(0);
const [checkedFiveEd, setCheckedFiveEd] = React.useState(0);
const updateBoxRef = useRef(null);
  const handleChangeOne = () => {
    if(checkedOne==1){
      setCheckedOne(0);
    }else{
      setCheckedOne(1);
    }
  };
  const handleChangeTwo = () => {
    if(checkedTwo==1){
      setCheckedTwo(0);
    }else{
      setCheckedTwo(1);
    }
  };
  const handleChangeThree = () => {
    if(checkedThree==1){
      setCheckedThree(0);
    }else{
      setCheckedThree(1);
    }
  };
  const handleChangeFour = () => {
    if(checkedFour==1){
      setCheckedFour(0);
    }else{
      setCheckedFour(1);
    }
  };
  const handleChangeFive = () => {
    if(checkedFive==1){
      setCheckedFive(0);
    }else{
      setCheckedFive(1);
    }
  };
  const handleChangeOneEd = () => {
    if(checkedOneEd==1){
      setCheckedOneEd(0);
    }else{
      setCheckedOneEd(1);
    }
  };
  const handleChangeTwoEd = () => {
    if(checkedTwoEd==1){
      setCheckedTwoEd(0);
    }else{
      setCheckedTwoEd(1);
    }
  };
  const handleChangeThreeEd = () => {
    if(checkedThreeEd==1){
      setCheckedThreeEd(0);
    }else{
      setCheckedThreeEd(1);
    }
  };
  const handleChangeFourEd = () => {
    if(checkedFourEd==1){
      setCheckedFourEd(0);
    }else{
      setCheckedFourEd(1);
    }
  };
  const handleChangeFiveEd = () => {
    if(checkedFiveEd==1){
      setCheckedFiveEd(0);
    }else{
      setCheckedFiveEd(1);
    }
  };
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  const arrCreate =[]
  const createBrushing =async(e)=>{
    e.preventDefault();
    const number = checkedOne+ checkedTwo+ checkedThree+ checkedFour+ checkedFive;
    let mealsCheck=0;
    if(checkedTwo==1 || checkedThree==1 || checkedFour==1 ){
      mealsCheck=1;
    }
    arrCreate.push({
      brushing_date: currentDate,
      number_of_times: number,
      morning_check: checkedOne,
      after_meals: mealsCheck,
      before_sleep: checkedFive,
      iduser: JSON.parse(localStorage.getItem('user')).iduser
    })
    try{
      const res = await axios.post("http://localhost:8800/brushing",arrCreate[0] );
       localStorage.setItem("brushing", JSON.stringify(res.data[0]));
    }catch (err){
      console.log(err)
    }
  }
  const updateMutation = useMutation(
    (upd) => {
      return makeRequest.put("/brushing/api/upd/"+updateStatus.id_brushing, upd);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["brushings"]);
      },
    }
    );
    const updateArr=[];
  const closeEdit =()=>{
    if(updateStatus!==null && updateStatus!==undefined){
      const numberUpd = checkedOneEd+ checkedTwoEd+ checkedThreeEd+ checkedFourEd+ checkedFiveEd;
      let mealsCheckUpd=0;
      if(checkedTwoEd==1 || checkedThreeEd==1 || checkedFourEd==1 ){
        mealsCheckUpd=1;
      }
      updateArr.push({
        number_of_times: numberUpd,
        morning_check: checkedOneEd ,
        after_meals: mealsCheckUpd,
        before_sleep: checkedFiveEd,
      })
      if(updateStatus.status=="on"){
        updateMutation.mutate(updateArr[0]);
      }
    }
    localStorage.removeItem("update");
  }
  if(updateStatus!==null && updateStatus!==undefined){
    if(updateStatus.status="on"){
      if(updateBoxRef.current!==null){
        updateBoxRef.current.style.display="flex";
      }
    }else{
      if(updateBoxRef.current!==null){
        updateBoxRef.current.style.display="none";
      }
    }
  }
  return (
    <>
    <div className='brushing-board'>
      <div className='brushing-board__wrap'>
        <div className='brushing-board__header-wrap'>
          <p className='brushing-board__text_header'>Чистка зубів</p>
          <p className='brushing-board__text_date' >{currentDate}</p> 
        </div>
        <div className='brushing-board__tracker-wrap'>
          <div className='brushing-board__check-wrap'>
              <p className='brushing-board__text_title'>З ранку:</p>
              <Checkbox
                value={checkedOne}
                onChange={handleChangeOne}
              />
          </div>
          <div className='brushing-board__check-wrap'>
              <p className='brushing-board__text_title'>Після сніданку:</p>
              <Checkbox
                value={checkedTwo}
                onChange={handleChangeTwo}
              />
          </div>
          <div className='brushing-board__check-wrap'>
              <p className='brushing-board__text_title'>Після обіду:</p>
              <Checkbox
                value={checkedThree}
                onChange={handleChangeThree}
              />
          </div>
          <div className='brushing-board__check-wrap'>
              <p className='brushing-board__text_title'>Після вечері:</p>
              <Checkbox
                value={checkedFour}
                onChange={handleChangeFour}
              />
          </div>
          <div className='brushing-board__check-wrap'>
              <p className='brushing-board__text_title'>Перед сном:</p>
              <Checkbox
                value={checkedFive}
                onChange={handleChangeFive}
              />
          </div>
        </div>
        <div className='brushing-board__buttn-wrap'>
          <button className='brushing-board__buttn' onClick={createBrushing}>Застосувати</button>
        </div>
      </div>
    </div>
    <div className='api-section'></div>
    <div className='brushing-history'>
      <div className='brushin-history__wrap'>
        <div className='brushing-history__head'>
          <div className='brushing-history__text-wrap_primary'>
            <p className='brushing-history__text_head'>Дата:</p>
          </div>
          <div className='brushing-history__text-wrap_secondary'>
            <p className='brushing-history__text_head'>З ранку:</p>
          </div>
          <div className='brushing-history__text-wrap_tertiary'>
            <p className='brushing-history__text_head'>Після їжі:</p>
          </div>
          <div className='brushing-history__text-wrap_quanternary'>
            <p className='brushing-history__text_head'>Перед сном:</p>
          </div>
          <div className='brushing-history__text-wrap_fifth'>
            <p className='brushing-history__text_head'>Загальна кіл-сть:</p>
          </div>
          <div className='brushing-history__text-wrap_sixth'></div>
        </div>
        <div className='brushing-records'>
          {brushingError
          ? "Щось пішло не так"
          : brushingLoading
          ? "завантаження..."
          : brushingData.map((res)=><BrushingRecord brushing={res} key={res.id_brushing}/>)
          }
       </div>
        <div className='brushing__buttons-wrap'>
        </div>
      </div>
    </div>
    <div className="brushing-edit" ref={updateBoxRef} style={{display: updateStatus!==null ? 'flex' : 'none'}}>
    <div className='brushing-board__header-wrap brushing-edit__header-wrap'>
        <p className='brushing-board__text_header brushing-edit_text_header'>Чистка зубів</p>
        <p className='brushing-board__text_date'>{
        updateStatus!==null
        ?updateStatus.brushing_date
        :""
        }</p> 
      </div>
      <div className='brushing-board__tracker-wrap brushing-edit__tracker-wrap'>
        <div className='brushing-board__check-wrap brushing-edit__check-wrap'>
            <p className='brushing-board__text_title brushing-edit__text_title'>З ранку:</p>
            <Checkbox
              value={checkedOneEd}
              onChange={handleChangeOneEd}
            />
        </div>
        <div className='brushing-board__check-wrap brushing-edit__check-wrap'>
            <p className='brushing-board__text_title brushing-edit__text_title'>Після сніданку:</p>
            <Checkbox
              value={checkedTwoEd}
              onChange={handleChangeTwoEd}
            />
        </div>
        <div className='brushing-board__check-wrap brushing-edit__check-wrap'>
            <p className='brushing-board__text_title brushing-edit__text_title'>Після обіду:</p>
            <Checkbox
              value={checkedThreeEd}
              onChange={handleChangeThreeEd}
            />
        </div>
        <div className='brushing-board__check-wrap brushing-edit__check-wrap'>
            <p className='brushing-board__text_title brushing-edit__text_title'>Після вечері:</p>
            <Checkbox
              value={checkedFourEd}
              onChange={handleChangeFourEd}
            />
        </div>
        <div className='brushing-board__check-wrap brushing-edit__check-wrap'>
            <p className='brushing-board__text_title brushing-edit__text_title'>Перед сном:</p>
            <Checkbox
              value={checkedFiveEd}
              onChange={handleChangeFiveEd}
            />
        </div>
      </div>
      <div className='brushing-board__buttn-wrap brushing-edit__buttn-wrap'>
        <button className='brushing-board__buttn brushing-edit__buttn ' onClick={closeEdit}>Застосувати зміни</button>
      </div>
    </div>
    </>
  )
}
const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
export default BrushingDiary