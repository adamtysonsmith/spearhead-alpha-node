var mongoose = require('mongoose');
var Project = require('../models/project.js');
//var Stage = require('../models/stage.js').stage;
//var Task = require('../models/task.js').task;
//var Note = require('../models/task.js').note;

var apiController = {
    createProject: function(req, res) {
		var project = new Project(req.body);
        var stage = {name: 'Initial Stage'};
        var task = {content: 'This is your first task'};
        
		project.save(function(err, project){
            project.stages.push(stage);
            project.stages[0].tasks.push(task);
            // We must save the project again after adding stages and tasks!!!
            project.save();
            console.log('The saved project', project)
            res.send(project);
		});
    },
    createStage: function(req, res) {
        // create a stage, and push it into the PROJECT id param
        // POST to /api/projects/:id
        // Need to make sure you do two things:
        // 1. Pass the _id of the project as a param
        // 2. Pass the name of the stage in the req body
        var reqID = req.params.id;
        
        // Create a stage property according to the schema
        var stage = req.body;
        stage.tasks = [];
        stage._id = mongoose.Types.ObjectId(); // Generates a new ObjectId
        
        Project.findOne({_id: reqID}, function(err, project){
            if(!err) {
                // console.log('Found project to create stage', project);
                project.stages.push(stage);
                project.save(function(err, project){
                    if(err){
                        console.log('Error saving stage to project:', err)
                    } else {
                        res.send(stage);
                    }
                });
            } else {
                console.log('Error creating stage', err);
            }
        });
    },
    createTask: function(req, res) {
        // create a task, and push it into the STAGE id param
        var projectID = req.params.id;
        var stageID = req.params.stageid;
        
        // Create a stage property according to the schema
        var task = req.body;
        task.notes = [];
        task._id = mongoose.Types.ObjectId(); // Generates a new ObjectId
        
        Project.findOne({'stages._id': stageID}, function(err, project){
            if(err){
                console.log('Error querying project to update stage', err)
            } else {
                // Find the correct stage
                // Push the task
                // Save the project
                project.stages.forEach(function(thisStage, index){
                    if(thisStage._id.toString() === stageID){
                        // Push the task
                        project.stages[index].tasks.push(task);
                    }
                });
                
                project.save(function(err, project){
                    res.send(task); // Send back task as returnData to angular
                });
            }
        });  
    },
    createNote: function(req, res) {
        // create a note, and push it into the TASK id param
        var reqID = req.params.id;
        var stageID = req.params.stageid;
        var taskID = req.params.taskid;
        var note = req.body;
        
        Project.findOne({_id: reqID}, function(err, project){
            if(err){
                console.log('Error finding task', err)
            }
            
            // Get the stage index by finding _id
            project.stages.forEach(function(thisStage, stageIndex){
                if(thisStage._id.toString() === stageID){
                    // Get the task index by finding _id
                    project.stages[stageIndex].tasks.forEach(function(thisTask, taskIndex){
                        if(thisTask._id.toString() === taskID) {
                            thisTask.notes.push(note);
                        }
                    });
                }
            });
            
            project.save(function(err, project){
                res.send(note); // Send back note as returnData to angular
            });      
        });
    },
    readProject: function(req, res){
        var reqID = req.query._id;
        
        if(reqID) {
            Project.findOne({_id : reqID}, function(err, project){
                res.send(project);   
            });
        } else {
            Project.find({}, function(err, projects){
                res.send(projects);
            });
        }
    },
    checkTask: function(req, res){
        var reqID = req.params.id;
        var stageID = req.params.stageid;
        var taskID = req.params.taskid;
        
        // This is not currently being triggered in a click event, waiting to revise the schema
        Project.findOne({_id: reqID}, function(err, project){
            project.stages.forEach(function(thisStage, index){
                if(thisStage._id.toString() === stageID) {
                    project.stages[index].tasks.forEach(function(thisTask, index){
                        if(thisTask._id.toString() === taskID) {
                            thisTask.isCompleted = req.body.checked;
                            // console.log('The checked/unchecked task', thisTask)
                        }
                    });
                }
            });
        });
    }
}

module.exports = apiController;