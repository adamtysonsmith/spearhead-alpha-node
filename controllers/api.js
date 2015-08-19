var Project = require('../models/project.js');
var Stage = require('../models/stage.js').stage;
var Task = require('../models/task.js').task;

var apiController = {
    createProject: function(req, res) {
		var project = new Project(req.body);
        var stage = new Stage({name: 'Initial Stage'});
        var task = new Task({content: 'This is your first task'});
        
		project.save(function(err, project){
            stage.save(function(err, stage){
                project.stages.push(stage);
                task.save(function(err, task){
                    project.stages[0].tasks.push(task);
                    // We must save the project again after adding stages and tasks!!!
                    project.save();
                    console.log('The saved project', project)
                    res.send(project);  
                });
            });
		});
    },
    createStage: function(req, res) {
        // create a stage, and push it into the PROJECT id param
        // POST to /api/projects/:id
        // Need to make sure you do two things:
        // 1. Pass the _id of the project as a param
        // 2. Pass the name of the stage in the req body
        var reqID = req.params.id;
        var stage = new Stage(req.body);
        
        Project.findOne({_id: reqID}, function(err, project){
            if(!err) {
                console.log('Found project to create stage', project);
                stage.save(function(err, stage){
                    project.stages.push(stage);
                    project.save(function(err, project){
                        if(err){
                            console.log('Error saving stage to project:', err)
                        } else {
                            res.send(stage);
                        }
                        
                    });
                });
            } else {
                console.log('Error creating stage', err);
            }
        });
    },
    createTask: function(req, res) {
        // create a task, and push it into the STAGE id param
        var reqID = req.params.id;
        var task = new Task();
    },
    createNote: function(req, res) {
        // create a note, and push it into the TASK id param
        var reqID = req.params.id;
        var note = new Note();
    },
    readProject: function(req, res){
        var reqID = req.query._id;
        console.log('The query..', reqID);
        
        if(reqID) {
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