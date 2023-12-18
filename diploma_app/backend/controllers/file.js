import Model from "../dbconnect/model.js";
let fileM = new Model("file_ph");
let fieldId="idfile"; 
export const createFile = (req, res, next)=>{
    const params="`file_name`, `file_date`, `file_adress`, `procedure_id`";
    const values =[
        req.body.file_name,
        req.body.file_date,
        req.body.file_adress,
        req.body.procedure_id
    ]
    let result = fileM.create(params, values, fieldId);
    result.then( function(value){
        console.log( "Файл було створено" ); 
        res.json( value);})
    .catch( function(error){
        console.log( error )
        next(error);
    });
}
export const getFile = (req, res,next)=>{
    const procedure_id = req.query.procedure_id;
    if(procedure_id>=0){
    let result = fileM.find("procedure_id", procedure_id);
    result.then(function(value){
        console.log(value);
        value.length>0?console.log("Отримано файл"):console.log("Такого файлу не існує");
        res.json(value)})
        .catch(function(error){
            console.log( error );
            next(error);
        })
    }
}
export const deleteFile = (req,res, next)=>{
    const result = fileM.delete(req.params.idfile, fieldId);
    result.then(
        function(value){
            console.log( "Запис був видалений" ); 
            res.json( value);}
    )
    .catch( function(error){
        console.log( error );
        next(error);
    }); 
}