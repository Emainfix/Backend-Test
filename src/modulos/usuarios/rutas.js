const express = require('express');

const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas')

const controlador = require('../usuarios/index');

const router = express.Router()

router.get('/', todos);
router.get('/:id', seguridad(), uno);
router.post('/', agregar);
router.patch('/:id', seguridad(), modificar);
router.delete('/:id', seguridad(), eliminar);

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

        respuesta.success(req, res, 'Item guardado correctamente', 201);
    }catch(err){
        next(err);
    }
};

async function modificar (req,res,next) {
    try{
        const items = await controlador.modificar(req.params.id, req.body)
        respuesta.success(req, res, 'El elemento ha sido modificado', 201);
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