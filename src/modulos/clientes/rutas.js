const express = require('express');

const respuesta = require('../../red/respuestas')

const controlador = require('./controlador');

const router = express.Router()

//Esta es la respuesta final de nuestro servidor a la solicitud que se nos hizo
router.get('/', async (req,res) => {
    try{
        const items = await controlador.todos()
        respuesta.success(res, items, 200);
    }catch(err){
        respuesta.error(res, err, 500);
    }
});

router.get('/:id', async (req,res) => {
    try{
        const items = await controlador.uno(req.params.id)
        respuesta.success(res, items, 200);
    }catch(err){
        respuesta.error(res, err, 500);
    }
});

module.exports = router;