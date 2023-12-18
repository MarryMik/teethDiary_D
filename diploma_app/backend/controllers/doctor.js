import Model from "../dbconnect/model.js";
let doctorM = new Model("doctor_info");
const fieldId = "id_doctor";
export const createDoctor = async (req,res,next)=>{
 console.log("iduser "+(req.body.user_id))
 let idUser;
 if(req.body.user_id!==undefined){
    idUser=req.body.user_id;
 }else{
    idUser=6;
 }
    const params="`doctor_name`,`doctor_adress`, `doctor_speciality`, `doctor_phone`, `user_id`";
        const values = [
            req.body.username,
            req.body.workadress,
            req.body.specialization,
            req.body.phone,
            idUser
        ]
        let result = doctorM.create(params, values, fieldId);
        result.then( function(value){
            console.log( "Лікаря було створено" ); 
            res.json( value);})
        .catch( function(error){
            console.log( error )
            next(error);
        });
}