var projects  = angular.module('projects', ['ngResource', 'ngRoute', 'ngMaterial']);
var dashboard = angular.module('dashboard', ['ngResource', 'ngRoute']);
var public    = angular.module('public', ['ngMaterial']);

///////////////////////////////////////////////
// Project Routes
///////////////////////////////////////////////

projects.config(function($routeProvider){
	$routeProvider
        // Referring to /projects#/
		.when('/', {
			templateUrl : '/ng-views/projects',
			controller  : 'projectsController'
		})
         // Referring to /projects#/:id
		.when('/:id', {
			templateUrl : '/ng-views/project-details',
			controller  : 'projectDetailsController'
		});
});

///////////////////////////////////////////////
// Dashboard Routes
///////////////////////////////////////////////

dashboard.config(function($routeProvider){
	$routeProvider
        // Referring to /dashboard#/
        .when('/', {
			templateUrl : '/ng-views/dashboard',
			controller  : 'dashboardController'
		});
});