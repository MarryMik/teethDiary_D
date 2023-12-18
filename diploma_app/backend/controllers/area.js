import Model from "../dbconnect/model.js";
let areaV = new Model("procedure_area");
let fieldId="id_area";
export const createArea = (req,res,next)=>{
    const params ="`procedure_id`, `or_cav_part_id`";
    const values = [
        req.body.procedure_id,
        req.body.or_cav_part_id
    ];
    console.log(values); 
    let result = areaV.create(params, values, fieldId);
    result.then( function(value){
        console.log( "Область застосування було створено" ); 
        res.json( value);})
    .catch( function(error){
        console.log( error )
        next(error);
    });
}
export const deleteAreaByProcedure = async (req,res,next)=>{
     let areas = await areaV.find("procedure_id", req.query.procedure_id);
     console.log(areas);
     let areaDel;
     if(areas.length>1){
        areas.forEach((element) => {
            areaDel =  areaV.delete(element.id_area, "id_area");
            console.log( "Область застосування була видалена" )
        });
    }else{
        console.log( "Область застосування не було знайдено" )
    }
}