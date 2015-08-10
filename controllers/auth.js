var authController = {
    login: function(req, res){
		res.render('login');
	},
    logout: function(req, res){
		res.send('logout!');
	},
    processLogin: function(req, res){
		res.send('process login');
	},
    processSignup: function(req, res){
		res.send('process signup');
	}
}

module.exports = authController;