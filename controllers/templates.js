var templateController = {
    index: function(req, res){
        // Dynamic jade templates for Angular routes
		res.render('templates/' + req.params.templateName);
	}
}

module.exports = templateController;