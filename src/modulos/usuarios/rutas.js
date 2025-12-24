const express = require('express');

const respuesta = require('../../red/respuestas')

const controlador = require('../usuarios/index');

const router = express.Router()

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.delete('/:id', eliminar);

async function todos (req,res,next) {
    try{
        const items = await controlador.todos()
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    }
};

async function uno (req,res,next) {
    try{
        const items = await controlador.uno(req.params.id)
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    }
};

async function agregar (req,res,next) {
    try{
        const items = await controlador.agregar(req.body)
        if(req.body.id == 0){
            mensaje = 'Item guardado correctamente';
        }else{
            mensaje = 'Item actualizado correctamente';
        }
        respuesta.success(req, res, mensaje, 201);
    }catch(err){
        next(err);
    }
};

async function eliminar (req,res,next) {
    try{
        const items = await controlador.eliminar(req.params.id)
        respuesta.success(req, res, 'El elemento ha sido eliminado', 200);
    }catch(err){
        next(err);
    }
};

module.exports = router;