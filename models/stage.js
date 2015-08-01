var mongoose = require('mongoose');
var helpers = require('./helpers.js')

var stageSchema = mongoose.Schema({
    name: String,
    
    // Calculated Properties
    dueDate: helpers.getDueDate(),
    duration: helpers.getDuration(),
    timestamp: helpers.getTimestamp(),
    
    // Status tracking
    startDate: {type: String, default: undefined},
    isStarted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    isDeferred: {type: Boolean, default: false},

    // Tasks array
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

var Stage = mongoose.model('Stage', stageSchema);

module.exports = Stage;