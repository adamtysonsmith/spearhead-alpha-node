var templateController = {
    index: function(req, res){
        // Dynamic jade templates for Angular routes
        console.log(req.params.templateName)
		res.render('templates/' + req.params.templateName);
	}
}

module.exports = templateController;