var ngviewController = {
    index: function(req, res){
        // Dynamic jade templates for Angular routes
		res.render('ng-views/' + req.params.templateName);
	}
}

module.exports = ngviewController;