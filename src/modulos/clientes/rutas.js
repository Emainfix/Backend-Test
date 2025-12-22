const express = require('express');

const respuesta = require('../../red/respuestas')

const controlador = require('./controlador');

const router = express.Router()

router.get('/', todos);
router.get('/:id', uno);

router.put('/', eliminar);

async function todos (req,res) {
    try{
        const items = await controlador.todos()
        respuesta.success(res, items, 200);
    }catch(err){
        respuesta.error(res, err, 500);
    }
};

async function uno (req,res) {
    try{
        const items = await controlador.uno(req.params.id)
        respuesta.success(res, items, 200);
    }catch(err){
        respuesta.error(res, err, 500);
    }
};

async function eliminar (req,res) {
    try{
        const items = await controlador.eliminar(req.body)
        respuesta.success(res, 'El elemento ha sido eliminado', 200);
    }catch(err){
        respuesta.error(res, err, 500);
    }
};

module.exports = router;