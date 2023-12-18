import Model from "../dbconnect/model.js";
let userM = new Model("user");
const fieldId='iduser';
export const updateUser = async (req, res,next)=>{
    const params= {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        usertype:req.body.usertype,
        sex:req.body.sex,
        workadress:req.body.workadress,
        specialization:req.body.specialization,
        phone: req.body.phone
    };
    let result =userM.update(req.params.iduser, params, fieldId);
    result.then( function(value){
        console.log("User has been updated"); 
        res.json( value);
    })
    .catch( function(error){
        console.log( error );
        next(error);});
}
export const  deleteUser = async (req, res,next)=>{
    let result = userM.delete(req.params.iduser, fieldId);
    result.then( function(value){
        console.log( "User has been deleted" ); 
        res.json( value);})
    .catch( function(error){
        console.log( error );
        next(error);
    });
}
export const getUser = async(req,res,next)=>{
    let result = userM.find("iduser",req.params.iduser);
    result.then(function(value){
        console.log("User "+req.params.iduser);
        res.json(value);
    }).catch(function(error){
        console.log(error);
        next(error);
    });
}



export const getUsers = async(req,res,next)=>{
    let result = userM.get_all();
    result.then(function(value){
        console.log("All users");
        res.json(value)})
        .catch(function(error){
            console.log( error );
            next(error);
        })
}
export const getDoctors =async(req,res,next)=>{
    const name = req.query.username;
    const phone =req.query.phone;
    const speciality = req.query.specialization;
    const workadress = req.query.workadress;
    console.log("1 "+name+ " 2 "+ phone+ " 3 "+ speciality+ " 4 "+ workadress)
    let result;
    if(speciality!==undefined && workadress!==undefined && name!==undefined && phone!==undefined){
        if(workadress=="" && speciality==""){
            result =  userM.findPlus("phone",phone, ` and username="${name}" and usertype="лікар"`)         
        }
        else if(workadress==""){
            result=  userM.findPlus("phone",phone, ` and username="${name}" and specialization="${speciality}" and usertype="лікар"`)
        }
        else if(speciality==""){
            result=  userM.findPlus("phone",phone, ` and username="${name}"  and workadress="${workadress}" and usertype="лікар"`)
        }
        else{
            result=  userM.findPlus("phone",phone, ` and username="${name}" and specialization="${speciality}" and workadress="${workadress}" and usertype="лікар"`)
        }
    }else{
        console.log(6)

        if(name!==undefined && phone!==undefined){
            result =  userM.findPlus("phone",phone, ` and username="${name}" and usertype="лікар"`)
        }else if(name!==undefined){
            result =  userM.findPlus("username", name, ` and usertype="лікар"`);
        }else if(phone!==undefined){
            result =  userM.findPlus("phone",phone, ` and usertype="лікар"`);
        }
}
    result.then(function(value){
        res.json(value)})
        .catch(function(error){
            console.log( error );
            next(error);
        })

}