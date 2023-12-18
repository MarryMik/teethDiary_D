import Model from "../dbconnect/model.js";
let dirProcM = new Model("procedures");
export const getDirectoryProcedures = async(req,res,next)=>{
    let result = dirProcM.get_all()
    result.then(function(value){
        res.json(value)})
        .catch(function(error){
            console.log( error );
            next(error);
        })   
}