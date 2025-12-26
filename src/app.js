const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas')
const usuarios = require('./modulos/usuarios/rutas')
const auth = require('./modulos/auth/rutas')
const error = require('../src/red/errors')

//Importado de la función objeto 
const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Puerto configuración en función express()
app.set('port', config.app.port)

//Rutas
app.use('/api/clientes', clientes);
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);
app.use(error);

module.exports = app;