import Model from "../dbconnect/model.js";
import bcrypt from "bcryptjs";
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken";
let userM = new Model("user");
let diaryM = new Model("diary")
const fieldId='iduser';
export const register =async (req,res,next)=>{
    let checkUser = await userM.find('email', req.body.email);
    if(checkUser.length==0){
        var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const params="`username`,`email`,`password`,`usertype`, `sex`, `workadress`, `specialization` , `phone`, `birthday`"
    const values = [
        req.body.username,
        req.body.email,
        hash,
        req.body.usertype,
        req.body.sex,
        req.body.workadress,
        req.body.specialization,
        req.body.phone,
        req.body.birthday
    ]
    let result = userM.create(params, values, 'iduser');
    if(req.body.usertype!=='адмін'){
        let user = await userM.find('email', req.body.email);
        const paramDiary ="`user_id`, `diary_type`"
        if(user[0].usertype=='лікар'){
            let diary0 = diaryM.create(paramDiary, [user[0].iduser, 'Журнал прийомів'], 'iddiary');
        }else if (user[0].usertype=='пацієнт'){
            let diary1 = diaryM.create(paramDiary, [user[0].iduser, 'Щоденник пацієнта'], 'iddiary');
            let diary2 = diaryM.create(paramDiary, [user[0].iduser, 'Щоденник спостерігача'], 'iddiary');
            let diary3 = diaryM.create(paramDiary, [user[0].iduser, 'Журнал заміни зубних щіток'], 'iddiary');
            let diary4 = diaryM.create(paramDiary, [user[0].iduser, 'Трекер чистки зубів'], 'iddiary');
        }
    }
    result.then( function(value){
        console.log( "User has been created" ); 
        res.status(200).json("Користувач був створений.");
        res.json( value);})
    .catch( function(error){
        console.log( error )
        next(error);
    });
    }else{
        console.log("Користувач вже існує з такою електронною поштою!");
        res.status(409).json("Користувач вже існує з такою електронною поштою!")
    }
}
export const login =async (req,res,next)=>{
    try{
    let user = await userM.find("email",req.body.email);
    if(!user) return next(createError(404,"User not found" ));
   if(user[0].email!==req.body.email) return next(createError(400,"Wrong email !" ));
    const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user[0].password)
    if(!isPasswordCorrect) {
        return next(createError(400,"Wrong password !" ));
    }
    const token = jwt.sign({iduser: user[0].iduser, usertype: user[0].usertype}, "Hnvl743Hsfu&49fnHGiagbHFE3Hnvsd7")
    const {password, type, ...otherDetails} =user[0];
    res.cookie("access_token", token,{
        httpOnly: true,
    }).status(200).json({...otherDetails});
    console.log("You log in!")
    }catch(error){
        console.log( error )
        next(error);
    }
}
export const logout = (req,res)=>{
    res.clearCookie("accessToken",{
        secure: true,
        sameSite:"none"
    }).status(200).json("User has been logged out.")
    console.log("You log out!")
}