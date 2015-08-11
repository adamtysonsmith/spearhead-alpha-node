var express          = require('express');
var bodyParser       = require('body-parser');
var cookieParser     = require('cookie-parser');
var session          = require('express-session');
var mongoose         = require('mongoose');
var passport         = require('passport');
var passportConfig   = require('./config/passport');
var indexController  = require('./controllers/index.js');
var authController   = require('./controllers/auth.js');
var ngviewController = require('./controllers/ngviews.js');


// Connect to spearhead database
mongoose.connect('mongodb://localhost/spearhead');

// Express Config
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Express Session
app.use(session({
	secret: 'super secret app secret dont tell',
	resave: false,
	saveUninitialized: false
}));

// Passport Middleware
// Initialize passport & passport session management
app.use(passport.initialize());
app.use(passport.session());


// Publicly accessible routes
app.get('/', indexController.index);

// Login and Logout
app.get('/auth/login', authController.login);
app.get('/auth/logout', authController.logout);

// Submitting & creating logins
app.post('/auth/login', authController.processLogin);
app.post('/auth/signup', authController.processSignup);


// Middleware for authenication check
// Any routes below this middleware will be redirected if not authenticated
app.use(passportConfig.ensureAuthenticated);

// Authenticated routes
app.get('/dashboard', indexController.app);
app.get('/projects', indexController.app);
app.get('/ng-views/:templateName', ngviewController.index);


// Server
var port = 2800;

var server = app.listen(port, function() {
    console.log('Express server listening on port:', port);
});