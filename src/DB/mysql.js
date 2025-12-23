const mysql = require('mysql2');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err)=>{
        if(err){
            console.log('db err', err);
            //setTimeout(conMysql, 2000);
        }else{
            console.log('Conexión con la BD establecida exitosamente')
        }
    });

    conexion.on('error',(err)=>{
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();

function todos(tabla){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
            
        })
    });
}

function uno(tabla, id){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
            
        })
    });
}

function agregar (){

}

function eliminar(tabla, id){
    return new Promise((resolve, reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE id=${id}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
            
        })
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
}