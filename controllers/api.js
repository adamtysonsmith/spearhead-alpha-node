var Project = require('../models/project.js');

var apiController = {
    create: function(req, res) {
		console.log('!!!!!', req.body);
		var project = new Project(req.body);
		project.save(function(err, project){
			res.send(project);
		});
    },
    read: function(req, res) {
		var requestID = req.query._id;
        console.log('The query..', requestID)
		if (requestID) {
			// One Project
			Project.findOne({_id : requestID}, function(err, project){
				res.send(project);
			});

		}
		else {
			// All Projects
			Project.find({}, function(err, projects){
                if(err){
                    console.log('error reading all projects', err)
                }
				res.send(projects);
			});
		}
    }
}

module.exports = apiController;