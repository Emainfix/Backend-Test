const express = require('express');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas')

//Importado de la función objeto 
const app = express();

//Puerto configuración en función express()
app.set('port', config.app.port)

//Cliente configuración de la ruta general y middleware
app.use('/api/clientes', clientes)

module.exports = app;