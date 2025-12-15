const express = require('express');

const respuesta = require('../../red/respuestas')

const router = express.Router()

router.get('/',(req,res) => {
    respuesta.success(req, res, 'Todo OK desde Clientes', 200)
});

module.exports = router;