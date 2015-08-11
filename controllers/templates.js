var ngviewController = {
    ngview: function(req, res){
        // Dynamic jade templates for Angular routes
		res.render('ng-views/' + req.params.templateName);
	},
    partial: function(req, res){
        // Dynamic jade partials for Angular directives
		res.render('partials/' + req.params.partialName);
	}
}

module.exports = ngviewController;