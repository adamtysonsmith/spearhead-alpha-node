var projects  = angular.module('projects', ['ngResource', 'ngRoute', 'ngMaterial']);
var dashboard = angular.module('dashboard', ['ngResource', 'ngRoute', 'ngMaterial']);
var public    = angular.module('public', ['ngMaterial']);

///////////////////////////////////////////////
// Public Config
///////////////////////////////////////////////
public.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('teal');
});

///////////////////////////////////////////////
// Project Config
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

projects.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('orange');
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

dashboard.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('orange');
});