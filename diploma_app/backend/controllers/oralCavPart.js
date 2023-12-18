import Model from "../dbconnect/model.js";
let ocpM = new Model("oral_cavity_parts");
export const getAll_OCP = async(req,res,next)=>{
    let result = ocpM.get_all()
    result.then(function(value){
        res.json(value)})
        .catch(function(error){
            console.log( error );
            next(error);
        })   
}