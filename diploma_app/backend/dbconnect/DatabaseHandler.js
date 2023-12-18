const getUsers=function(db){
    db.connect(function(err){
        if(err) throw err;
        const q="Select * from user";
        db.query(q, function (err, result, fields){
            if (err) throw err;
            console.log(fields.length);
            for(let i=0; i<fields.length-2; i++){
                for(let j=0; j<result.length-2;j++){
                    console.log(fields[i].name);
                    console.log(result[j][fields[i].name])
                }               
            }
            result.forEach(x=>{
                if(x[fields[0].name]==2){
                    console.log(x)
                }
            })
        })
    })
}
export default getUsers;

