var express = require('express');
var routerRiego = express.Router();
var pool = require('../../mysql');

routerRiego.post('/', function(req, res) {
    pool.query('Insert into Log_Riegos (apertura,fecha,electrovalvulaId) values (?,?,?)', [req.body.apertura, req.body.fecha, req.body.electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

routerRiego.get('/:id', function(req, res) {
    pool.query('select * from Log_Riegos inner join Electrovalvulas on Log_Riegos.electrovalvulaId=Electrovalvulas.electrovalvulaId \
     inner join Dispositivos on Electrovalvulas.electrovalvulaId=Dispositivos.electrovalvulaId \
      where Dispositivos.dispositivoId=? order by fecha desc',[req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

routerRiego.get('/:id/todas', function(req, res) {
    pool.query('select * from Log_Riegos inner join Electrovalvulas on Log_Riegos.electrovalvulaId=Electrovalvulas.electrovalvulaId \
     inner join Dispositivos on Electrovalvulas.electrovalvulaId=Dispositivos.electrovalvulaId \
      where Dispositivos.dispositivoId=?',[req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

module.exports = routerRiego;