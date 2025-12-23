const db = require('../../DB/mysql');

const TABLA = 'clientes';

function todos(){
    return db.todos(TABLA);
}

function uno(id){
    return db.uno(TABLA, id);
}

function agregar(body){
    return db.agregar(TABLA, body);
}

function eliminar(id){
    return db.eliminar(TABLA, id);
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}