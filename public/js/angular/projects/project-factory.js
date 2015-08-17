projects.factory('projectFactory', function($resource){

	// This creates a $resource model
	// Our base URL is /api/projects with the option of additionally passing the /:id component
	// All the methods this $resource model uses will be in reference to those URLs
	var model = $resource('/api/projects/:id', {id : '@_id'})
	// this._id
	// @_id

	// model.query() // GET - /api/projects
	// model.get()
	// model.$save() // POST - /api/projects
	// model.$delete()
	// model.get({id : ObjectId('5483292394823')}) // GET - /api/projects/5483292394823

	// Factories use the revealing module pattern, so we must return the relevant pieces of information
	return {
		model   : model,
		projects : model.query()
	}

});