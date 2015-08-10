var express             = require('express');
var bodyParser          = require('body-parser');
var indexController     = require('./controllers/index.js');
var templateController  = require('./controllers/templates.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', indexController.index);
app.get('/dashboard', indexController.app);
app.get('/projects', indexController.app);
app.get('/templates/:templateName', templateController.index);


var port = 2800;

var server = app.listen(port, function() {
    console.log('Express server listening on port:', port);
});