var mongoose = require('mongoose');
var helpers = require('./helpers.js')

var projectSchema = mongoose.Schema({
    name: String,
    startDate: String,
    dueDate: String,
    
    // Calculated Properties
    //duration: helpers.getDuration(),
    //timestamp: helpers.getTimestamp(),
    
    // Status tracking
    isStarted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    isAbandoned: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    isDeferred: {type: Boolean, default: false},
    
    // Stages
    stages: [{
        name: String,

        // Calculated Properties
        //dueDate: helpers.getDueDate(),
        //duration: helpers.getDuration(),
        //timestamp: helpers.getTimestamp(),

        // Status tracking
        startDate: {type: String, default: undefined},
        isStarted: {type: Boolean, default: false},
        isActive: {type: Boolean, default: false},
        isCompleted: {type: Boolean, default: false},
        isDeferred: {type: Boolean, default: false},

        // Tasks
        tasks: [{
            content: String,

            // Calculated Properties
            //duration: helpers.getDuration(),
            //timestamp: helpers.getTimestamp(),

            // Status Tracking
            isCompleted: {type: Boolean, default: false},
            isDeferred: {type: Boolean, default: false},

            // Notes
            notes: [{content: String}]
        }]
    }]
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;