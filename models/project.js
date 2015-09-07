var mongoose = require('mongoose');
var helpers = require('./helpers.js')

var projectSchema = mongoose.Schema({
    user_id: mongoose.Schema.ObjectId,
    name: String,
    startDate: String,
    dueDate: String,
    timestamp: { type: Date, default: Date.now },
    //duration: helpers.getDuration(),
    
    // Status tracking
    isStarted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    isAbandoned: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    isDeferred: {type: Boolean, default: false},
    
    // Stages
    stages: [{
        name: String,
        timestamp: { type: Date, default: Date.now },

        // Calculated Properties
        //dueDate: helpers.getDueDate(),
        //duration: helpers.getDuration(),

        // Status tracking
        startDate: {type: String, default: undefined},
        isStarted: {type: Boolean, default: false},
        isActive: {type: Boolean, default: false},
        isCompleted: {type: Boolean, default: false},
        isDeferred: {type: Boolean, default: false},

        // Tasks
        tasks: [{
            content: String,
            timestamp: { type: Date, default: Date.now },

            // Calculated Properties
            //duration: helpers.getDuration(),

            // Status Tracking
            isCompleted: {type: Boolean, default: false},
            isDeferred: {type: Boolean, default: false},

            // Notes
            notes: [{
                content: String,
                timestamp: { type: Date, default: Date.now }
            }]
        }]
    }]
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;