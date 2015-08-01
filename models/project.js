var mongoose = require('mongoose');
var helpers = require('./helpers.js')

var projectSchema = mongoose.Schema({
    name: String,
    startDate: String,
    dueDate: String,
    
    // Calculated Properties
    duration: helpers.getDuration(),
    timestamp: helpers.getTimestamp(),
    
    // Status tracking
    isStarted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    isAbandoned: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    isDeferred: {type: Boolean, default: false},
    
    // Stages array
    stages: [{type: Schema.Types.ObjectId, ref: 'Stage'}]
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;