const app = require('./app');

//Inicio del puerto / servidor
app.listen(app.get('port'), () => {
    console.log("El puerto se abrió correctamente", app.get('port'));
});
