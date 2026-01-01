const auth = require('../../auth');

module.exports = function checkAuth(){

    function middleware(req, res, next){
        
        const id = req.params.id;

        auth.checkToken.confirmarToken(req, id);

        next();
    }

    return middleware;
}