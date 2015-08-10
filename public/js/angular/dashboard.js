var dashboard = angular.module('dashboard', ['ngResource', 'ngRoute']);

///////////////////////////////////////////////
// Routes
///////////////////////////////////////////////

dashboard.config(function($routeProvider){
	$routeProvider
        // Referring to /dashboard#/
        .when('/', {
			templateUrl : '/ng-views/dashboard',
			controller  : 'dashboardController'
		});
});


///////////////////////////////////////////////
// Controllers
///////////////////////////////////////////////

// Dashboard Controller
dashboard.controller('dashboardController', function($scope){
    console.log('I am the dashboard controller!!!');
});