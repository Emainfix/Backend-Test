const TABLA = 'usuarios';
const TABLA2 = 'auth';
const auth = require('../auth');

module.exports = function(dbInyectada){

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql');
    }

    function todos(){
        return db.todos(TABLA);
    }

    function uno(id){
        return db.uno(TABLA, id);
    }

    async function agregar(body){//Entra el body de la req

        const usuario = { //Acomodamos solo nombre y activo que llega en el body en el obj usuario
            nombre: body.nombre,
            activo: body.activo
        }

        const respuesta = await db.agregar(TABLA, usuario); // Mandamos el objeto usuario a mysql.js para insertar en la DB
        console.log('respuesta', respuesta);

        var numeroId = respuesta.insertId; // Recibimos el id que se creó al insertar en la DB

        var respuesta2 = '';
        if(body.usuario || body.password){
            respuesta2 = await auth.agregar({ // Mandamos a auth usuario y password para guardar en otra tabla
                id: numeroId,
                usuario: body.usuario,
                password: body.password
            })
        }

        return respuesta2;
    }

    async function modificar(id, body){//entra el id de la req y el body

        const usuario = {//Se acomoda nombre y activo de la req dentro del obj usuario
            nombre: body.nombre,
            activo: body.activo
        }

        const respuesta = await db.modificar(TABLA, id, usuario); // Se manda el id de la req junto con el obj usuario a la DB
        console.log('respuesta', respuesta);

        var respuesta2 = '';
        if(body.usuario || body.password){
            respuesta2 = await auth.agregar({ // Se manda el id, usuario y password a la función auth
                id: id,
                usuario: body.usuario,
                password: body.password
            })
        }

        return respuesta2;
    }


    function eliminar(id){
        
        return(
            db.eliminar(TABLA, id),
            db.eliminar(TABLA2, id))

    }

    return{
        todos,
        uno,
        agregar,
        modificar,
        eliminar
    }
}