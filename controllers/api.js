var Project = require('../models/project.js');
var Stage = require('../models/stage.js').stage;
var Task = require('../models/task.js').task;

var apiController = {
    create: function(req, res) {
		var project = new Project(req.body);
         var stage = new Stage({name: 'Initial Stage'});
         var task = new Task({content: 'This is your first task'});
        
		project.save(function(err, project){
            stage.save(function(err, stage){
                project.stages.push(stage);
                task.save(function(err, task){
                    project.stages[0].tasks.push(task);
                    // We must save the project again!!!!!
                    project.save();
                    console.log('The saved project', project)
                    res.send(project);  
                });
            });
		});
    },
    read: function(req, res){
        var reqID = req.query._id;
        console.log('The param..', reqID);
        
        if(reqID) {
//            Project.findOne({_id : reqID}, function(err, project){
//                res.send(project);
//            });
            Project.findOne({_id : reqID}).populate('stages').exec(function(err, doc){
                console.log('The populate error', err)
                console.log('The populated stages', doc)
                res.send(doc);
            });
        } else {
            Project.find({}, function(err, projects){
                res.send(projects);
            });
        }
    }
}

module.exports = apiController;