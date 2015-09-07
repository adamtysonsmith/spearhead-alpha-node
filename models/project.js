var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    user_id: mongoose.Schema.ObjectId,
    name: String,
    startDate: String,
    dueDate: String,
    actualEndDate: String,
    timestamp: {type: Date, default: Date.now},
    //isStarted: {type: Boolean, default: false}, remove?
    //isActive: {type: Boolean, default: false}, remove?
    isAbandoned: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    isDeferred: {type: Boolean, default: false},
    
    // Stages
    stages: [{
        name: String,
        timestamp: {type: Date, default: Date.now},
        dueDate: {type: String, default: undefined}, // May use in future
        startDate: {type: String, default: undefined}, // May use in future
        isStarted: {type: Boolean, default: false},
        isActive: {type: Boolean, default: false},
        isCompleted: {type: Boolean, default: false},
        isDeferred: {type: Boolean, default: false},
        
        // Tasks
        tasks: [{
            content: String,
            timestamp: {type: Date, default: Date.now},
            duration: {type: Number, default: 0.5}, // Hours
            priority: {type: Number, default: 1, min: 1, max: 5},
            isCompleted: {type: Boolean, default: false},
            isDeferred: {type: Boolean, default: false},
            // Calendar Schedule
            schedule: [{
                timestamp: {type: Date, default: Date.now},
                startTime: String,
                endTime: String
            }],
            // Notes
            notes: [{
                content: String,
                timestamp: {type: Date, default: Date.now}
            }]
        }]
    }]
});


// Virtual Getter Attributes
// projectActualEndDate - Actual end date, if scheduled
// stageActualEndDate - Actual end date, if scheduled
// projectEstimatedEndDate - Theoretical end date, if unscheduled
// stageEstimatedEndDate - Theoretical end date, if unscheduled
// taskScheduledDuration
// taskNotScheduledDuration

projectSchema.virtual('projectEndDate').get(function() {
    var actual;
    var estimated;
    var actualDates = [];
    
    // Get project actual end date
    for(var i = 0; i < this.stages.length; i++) {
        for(var j = 0; j < this.stages[i].tasks.length; j++) {
            for(var k = 0; k < this.stages[i].tasks[j].schedule.length; k++) {
                actualDates.push(this.stages[i].tasks[j].schedule[k].timestamp);
                actualDates.sort();
                actual = actualDates.slice(-1)[0];
            }
        }
    }
    
    // Get project estimated end date
    var projectDuration = 0;
    var days;
    
    for(var i = 0; i < this.stages.length; i++) {
        for(var j = 0; j < this.stages[i].tasks.length; j++) {
            projectDuration += this.stages[i].tasks[j].duration;
        }
    }
    
    days = projectDuration/8;
    // estimated = this.startDate + days; We need to figure out how to add days to the date
    
    // Control flow logic comparison
    // See written notes
    // Walk away.. too tired.
});

//    projectSchema.virtual('projectActualEndDate').get(function() {
//        // return something
//    });
//    projectSchema.virtual('projectEstimatedEndDate').get(function() {
//        // return something
//    });

projectSchema.virtual('stageEndDate').get(function() {
    // return something
});

//    projectSchema.virtual('stageActualEndDate').get(function() {
//        // return something
//    });
//    projectSchema.virtual('stageEstimatedEndDate').get(function() {
//        // return something
//    });

projectSchema.virtual('taskScheduledDuration').get(function() {
    // return something
});
projectSchema.virtual('taskNotScheduledDuration').get(function() {
    // return something
});


// Instance Methods
// getProjectHourlyDuration
// getStageHourlyDuration
projectSchema.methods.getProjectHourlyDuration = function() {
    var projectDuration = 0;
    for(var i = 0; i < this.stages.length; i++) {
        for(var j = 0; j < this.stages[i].tasks.length; j++) {
            projectDuration += this.stages[i].tasks[j].duration;
        }
    }
    return projectDuration;  
}
projectSchema.methods.getStageHourlyDuration = function(stageIndex) {
    var stageDuration = 0;
    for(var i = 0; i < this.stages[stageIndex].tasks.length; i++) {
        stageDuration += this.stages[stageIndex].tasks[i].duration;
    }
    return stageDuration;
}


// Compile and export
var Project = mongoose.model('Project', projectSchema);

module.exports = Project;