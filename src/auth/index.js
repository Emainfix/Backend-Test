const jwt = require('jsonwebtoken');
const config = require('../config');
const errores = require('../middleware/errors');

const secret = config.jwt.secret;

function asignarToken (data){
    return jwt.sign(data, secret);
}

function verificarToken(token){
    return jwt.verify(token, secret);
}

function obtenerToken(autorizacion){
    if (!autorizacion){
        throw errores('No viene el token', 401);
    }
    
    if(autorizacion.indexOf('Bearer') === -1){
        throw errores('Formato invalido', 401);
    }

    let token = autorizacion.replace('Bearer ', '');
    return token;
}

function decodificarCabecera(req){
    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    const decodificado = verificarToken(token);

    req.user = decodificado;

    return decodificado;
}

const checkToken = {
    confirmarToken: function (req, id){
        const decodificado = decodificarCabecera(req);

        if(decodificado.id != id){
            throw errores('No tienes permisos para realizar esta acción', 401);
        }
    }
}

module.exports = {
    asignarToken,
    checkToken
}