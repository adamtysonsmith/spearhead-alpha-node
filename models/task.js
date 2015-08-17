var mongoose = require('mongoose');
var helpers = require('./helpers.js')

var noteSchema = mongoose.Schema({
    content: String
    //timestamp: helpers.getTimestamp()
});

var taskSchema = mongoose.Schema({
    content: String,
    
    // Calculated Properties
    //duration: helpers.getDuration(),
    //timestamp: helpers.getTimestamp(),

    // Status Tracking
    isCompleted: {type: Boolean, default: false},
    isDeferred: {type: Boolean, default: false},
    
    // Notes array
    // notes: [{type: Schema.Types.ObjectId, ref: 'Note'}]
    notes: [noteSchema]
});


var Task = mongoose.model('Task', taskSchema);
var Note = mongoose.model('Note', noteSchema);

module.exports = {
    task: Task,
    note: Note,
    taskSchema: taskSchema
}



// Will inherit from task excluding notes array
//var Subtask = function(content) {
//    Task.call(this, content);
//    this.notes = undefined;
//}