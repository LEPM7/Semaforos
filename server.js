var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

mongoose.connect("mongodb://localhost/sem1");
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

var Calle = app.calle = restful.model('calle', mongoose.Schema({
    nombre: String,
    ponderacion: Number,
    ubicacion: String
}))
    .methods(['get', 'post', 'put', 'delete']);

Calle.route('ponderacion', {
    detail: true,
    handler: function (req, res, next) {
        // req.params.id holds the resource's id
        Calle.findById(req.params.id.toString(), function (err, calles) {
            res.send("" +calles.ponderacion);
        });
    }
});

Calle.route('templates',  {



});

Calle.register(app, '/calles');

var Semaforo = app.semaforo = restful.model('semaforo', mongoose.Schema(
    {
        tiempo: Number,
    }
))
    .methods(['get', 'post', 'put', 'delete']);

Semaforo.register(app, '/semaforos');

var Usuario = app.usuario = restful.model('usuario', mongoose.Schema({
        usuario: String,
        password: String
    }
))
    .methods(['get', 'post', 'put', 'delete']);

Usuario.register(app, '/usuarios');


app.listen(3001);