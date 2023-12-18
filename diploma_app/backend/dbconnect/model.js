//підключення модуля бази даних
import db from "./Config.js";
//сласс Моделі 
class Model{
    constructor(table){
        this.table=table;
    }
//CRUD операції
// пошук всіх даних за вказаною таблицею
    get_all(){
        let field=this.table;
        return new Promise(function(myResolve, myReject){
            db.query('SELECT * FROM ' +field, function (error,result){
                if(error) throw error;
                myResolve(result);
            });
        });
    }
    //пошук за вказаним параметром
    find(fieldId,id){
        let cThis = this;
        return new Promise(function(myResolve, myReject){
            db.query(`SELECT * FROM ?? WHERE ${fieldId} = ?`, [cThis.table,id], function (error,result){
                if(error) throw error;
                myResolve(result);
            });
        });
    }
    //пошук за декількома параметрами
    findPlus(fieldId,id, plus){
        let cThis = this;
        return new Promise(function(myResolve, myReject){
            db.query(`SELECT * FROM ?? WHERE ${fieldId} = ? `+plus, [cThis.table,id], function (error,result){
                if(error) throw error;
                myResolve(result);
            });
        });
    }
    //створення даних
    create(params, data, fieldId){
        let cThis = this;
        return new Promise(function(myResolve, myReject){
            db.query(`INSERT INTO ${cThis.table} (${params}) VALUES (?)`, [ data], function(error, result,fields){
                if(error) throw error;
                let data1 = cThis.find(fieldId,result.insertId);
                data1.then(function(value){myResolve(value)})
                .catch(function(error){myReject(error)})
            });
        });
    }
    //оновлення даних
    update(id,data,fieldId){
        let cThis=this;
        return new Promise(function(myResolve, myReject){
            db.query(`UPDATE ${cThis.table} SET ? WHERE ${fieldId}=?`,[ data,id], function(error, result,fields){
                if(error) throw error;
                let data1 = cThis.find(fieldId,result.insertId);
                data1.then(function(value){myResolve(value)})
                .catch(function(error){myReject(error)})
            });
        })
    }
    //видалення даних
    delete(id, fieldId){
        let cThis=this;
        return new Promise(function(myResolve, myReject){
            db.query(`DELETE FROM ${cThis.table} WHERE ${fieldId}=${id}`, function(error, result,fields){
                if(error) throw error;
                let data1 = cThis.find(fieldId,result.insertId);
                data1.then(function(value){myResolve(value)})
                .catch(function(error){myReject(error)})
            });
        })
    }
}
export default Model;

