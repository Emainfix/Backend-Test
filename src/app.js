const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas')

//Importado de la función objeto 
const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Puerto configuración en función express()
app.set('port', config.app.port)

//Cliente configuración de la ruta general y middleware
app.use('/api/clientes', clientes)

module.exports = app;