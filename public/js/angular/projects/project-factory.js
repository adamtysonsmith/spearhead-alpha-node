projects.factory('projectFactory', function($resource){
	// This creates a $resource model
	// Our base URL is /api/projects with the option of additionally passing the /:id component
	// All the methods this $resource model uses will be in reference to those URLs
	var project = $resource('/api/projects/:id', {id: '@_id'});
	var stage   = $resource('/api/projects/:id/stages/:stageid', {id: '@_id', stageid: '@_id'});
	var task    = $resource('/api/projects/:id/stages/:stageid/tasks/:taskid', {id: '@_id', stageid: '@_id', taskid: '@_id'});
    var note    = $resource('/api/projects/:id/stages/:stageid/tasks/:taskid/notes', {id: '@_id', stageid: '@_id', taskid: '@_id'});
    
	// this._id
	// @_id

	// model.query() // GET - /api/projects
	// model.get()
	// model.$save() // POST - /api/projects
	// model.$delete()
	// model.get({id : ObjectId('5483292394823')}) // GET - /api/projects/5483292394823

	// Factories use the revealing module pattern, so we must return the relevant pieces of information
	return {
		project: project,
        queryProjects: project.query(),
        stage: stage,
        task: task,
        note: note
	}
});