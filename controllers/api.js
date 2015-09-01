var Project = require('../models/project.js');
var Stage = require('../models/stage.js').stage;
var Task = require('../models/task.js').task;
var Note = require('../models/task.js').note;

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
        var projectID = req.params.id;
        var stageID = req.params.stageid;
        var task = new Task(req.body);

        Project.findOne({'stages._id': stageID}, function(err, project){
            if(err){
                console.log('Error querying project to update stage', err)
            } else {
                task.save(function(err, task){
                    Stage.findOne({_id: stageID}, function(err, stage){
                        stage.tasks.push(task);
                        stage.save(function(err, stage){
                            project.stages.forEach(function(thisStage, index){
                                if(thisStage._id.toString() === stageID){
                                    // Overwrite the stage
                                    project.stages[index] = stage;
                                }
                            });
                            project.markModified('stages');

                            project.save(function(err, project){
                                res.send(task); // Send back task as returnData to angular
                            });
                        });
                    });
                });
            }
        });  
    },
    createNote: function(req, res) {
        // create a note, and push it into the TASK id param
        var reqID = req.params.id;
        var stageID = req.params.stageid;
        var taskID = req.params.taskid;
        var note = new Note(req.body);
        console.log('The stage id', stageID)
        console.log('The task id', taskID)
        console.log('The request body', req.body)
        
        Project.findOne({_id: reqID}, function(err, project){
            note.save(function(err, note){
                Task.findOne({_id: taskID}, function(err, task){
                    console.log('The task you are attempting to create a note', task)
                    if(err){
                        console.log('Error finding task', err)
                    }
                    task.notes.push(note);
                    task.save(function(err, savedTask){
                        console.log('Create Note: The saved task', savedTask);
                        Stage.findOne({_id: stageID}, function(err, stage){
                            stage.tasks.forEach(function(thisTask, index){
                                if(thisTask._id.toString() === taskID) {
                                    stage.tasks[index] = savedTask;
                                }
                            });
                            stage.markModified('tasks');
                            stage.save(function(err, savedStage){
                                console.log('You saved the stage! it should have tasks with notes', savedStage.tasks)
                                project.stages.forEach(function(thisStage, index){
                                    if(thisStage._id.toString() === stageID){
                                        // Overwrite the stage
                                        project.stages[index] = savedStage;
                                    }
                                });
                                project.markModified('stages');

                                project.save(function(err, project){
                                    res.send(note); // Send back note as returnData to angular
                                });
                            });
                        });
                    });
                });
            });
        });
    },
    readProject: function(req, res){
        var reqID = req.query._id;
        console.log('The query..', reqID);
        
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
                            console.log('The checked/unchecked task', thisTask)
                        }
                    });
                }
            });
        });
    }
}

module.exports = apiController;