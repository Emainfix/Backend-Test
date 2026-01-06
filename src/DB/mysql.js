const mysql = require('mysql2');
const config = require('../config');

const pool = mysql.createPool({
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

function todos(tabla){
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM ??`, [tabla], (error,result)=>{
            return error ? reject(error) : resolve(result);
            
        })
    });
}

function uno(tabla, id){
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM ?? WHERE id=?`, [tabla, id], (error,result)=>{
            return error ? reject(error) : resolve(result);
            
        })
    });
}

function agregar(tabla, data){
    return new Promise((resolve, reject)=>{
        pool.query(`INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ?`, [tabla, data, data], (error,result)=>{
            return error ? reject(error) : resolve(result);
            
        })
    });
}

function modificar(tabla, id, data){
    return new Promise((resolve, reject)=>{
        pool.query(`UPDATE ?? SET ? WHERE ID = ?`, [tabla, data, id], (error,result)=>{
            return error ? reject(error) : resolve(result);
            
        })
    });
}

function eliminar(tabla, id){
    return new Promise((resolve, reject)=>{
        pool.query(`DELETE FROM ?? WHERE id=?`, [tabla, id], (error,result)=>{
            return error ? reject(error) : resolve(result);
            
        })
    });
}

function query(tabla, consulta){
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM ?? WHERE ?`,[tabla, consulta], (error,result)=>{
            return error ? reject(error) : resolve(result[0]);
            
        })
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    modificar,
    eliminar,
    query,
    pool
}