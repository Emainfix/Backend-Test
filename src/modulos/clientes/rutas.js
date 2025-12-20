const express = require('express');

const respuesta = require('../../red/respuestas')

const controlador = require('./controlador');

const router = express.Router()

//Esta es la respuesta final de nuestro servidor a la solicitud que se nos hizo
router.get('/', async (req,res) => {
    const items = await controlador.todos()
    
    respuesta.success(req, res, items, 200);
});

module.exports = router;