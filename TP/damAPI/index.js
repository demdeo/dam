var cors = require('cors');
var express =require('express');
var app = express();
var PORT = 3000;
var routerDispositivo = require('./routes/dispositivo');
var routerMedicion = require('./routes/medicion');
var routerRiego = require('./routes/riego')

app.use(express.json());
app.use(cors());
app.use('/api/dispositivo',routerDispositivo);
app.use('/api/medicion', routerMedicion);
app.use('/api/logriego', routerRiego)


app.listen(PORT, function(req,res){
    console.log("API funcionando");
})