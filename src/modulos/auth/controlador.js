const TABLA = 'auth';
const bcrypt = require('bcrypt');
const auth = require('../../auth');


module.exports = function(dbInyectada){

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql');
    }

    async function login(usuario, password){
        const data = await db.query(TABLA, {usuario: usuario});

        return bcrypt.compare(password, data.password)
            .then((resultado)=>{
                if(resultado === true){
                    return auth.asignarToken({...data});
                }else{
                    throw new Error('Datos invalidos');
                }
            })
    }

    async function agregar(data){ //Recibimos id, usuario y password que nos manda la función agregar

        const authData = { //Creamos obj con id y usuario
            id: data.id,
            usuario: data.usuario
        }

        if(data.password){ // Hashamos el password
            authData.password = await bcrypt.hash(data.password.toString(), 5); 
        }

        return db.agregar(TABLA, authData); // Guardamos el obj en la tabla auth de la DB
    }

    return{
        agregar,
        login
    }
}