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

// Instance Methods
// getProjectHourlyDuration
// getStageHourlyDuration
// getProjectEndDate

// Not done:
// stageActualEndDate - Actual end date, if scheduled
// stageEstimatedEndDate - Theoretical end date, if unscheduled
// taskScheduledDuration
// taskNotScheduledDuration

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
projectSchema.methods.getProjectEndDate = function() {
    var self = this;
    // This function does not even care about the due date the user entered.
    // It actually calculates an esitmated end date based on task duration,
    // or it returns the end date based on the last scheduled task.
    var actual;
    var estimated;
    var actualDates = [];
    
    // Date format helper
    // 9 to 09 or 10 to 10
    function format(n) {
        return n < 10 ? '0' + n : ''  + n;
    }
    
    // Get project actual end date
    for(var i = 0; i < this.stages.length; i++) {
        for(var j = 0; j < this.stages[i].tasks.length; j++) {
            for(var k = 0; k < this.stages[i].tasks[j].schedule.length; k++) {
                actualDates.push(this.stages[i].tasks[j].schedule[k].timestamp);
                actualDates.sort();
                actual = actualDates.slice(-1)[0]; // We assume actual is a date object
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
    
    function addDays() {
        // '2015-09-03' + days
        var split = self.startDate.split('-');
        split[2] = format(Math.round(parseInt(split[2], 10) + days));
        return new Date(split[0], split[1]-1, split[2]);
    }
    
    estimated = addDays();
    
    // Compare and return date object from this function
    if(typeof actual === 'undefined'){
        return estimated;
    } else if(estimated > actual) {
        return estimated;
    } else {
        return actual;
    }
}

// Compile and export
var Project = mongoose.model('Project', projectSchema);

module.exports = Project;