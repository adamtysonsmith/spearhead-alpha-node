var projects  = angular.module('projects', ['ngResource', 'ngRoute', 'ngMaterial']);
var dashboard = angular.module('dashboard', ['ngResource', 'ngRoute', 'ngMaterial']);
var public    = angular.module('public', ['ngMaterial']);

///////////////////////////////////////////////
// Custom Color Theme
///////////////////////////////////////////////
var theme = function($mdThemingProvider) {
    var customPrimary = {
        '50': '#6a7ca7',
        '100': '#5c6f9b',
        '200': '#52638b',
        '300': '#49587b',
        '400': '#404c6b',
        '500': '#36415b',
        '600': '#2d364b',
        '700': '#232a3b',
        '800': '#1a1f2b',
        '900': '#10131b',
        'A100': '#7a8ab0',
        'A200': '#8a98ba',
        'A400': '#9aa6c3',
        'A700': '#07080b'
    };
    $mdThemingProvider.definePalette('customPrimary', customPrimary);

    var customAccent = {
        '50': '#10ba9d',
        '100': '#0ea389',
        '200': '#0c8b75',
        '300': '#0a7461',
        '400': '#085c4e',
        '500': '06453a',
        '600': '#042e26',
        '700': '#021613',
        '800': '#000000',
        '900': '#000000',
        'A100': '#12d2b0',
        'A200': '#2bbbad',
        'A400': '#2aedcb',
        'A700': '#000000'
    };
    $mdThemingProvider.definePalette('customAccent', customAccent);

    var customWarn = {
        '50': '#ffb280',
        '100': '#ffa266',
        '200': '#ff934d',
        '300': '#ff8333',
        '400': '#ff741a',
        '500': '#ff6400',
        '600': '#e65a00',
        '700': '#cc5000',
        '800': '#b34600',
        '900': '#993c00',
        'A100': '#ffc199',
        'A200': '#ffd1b3',
        'A400': '#ffe0cc',
        'A700': '#803200'
    };
    $mdThemingProvider.definePalette('customWarn', customWarn);

    var customBackground = {
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#ffffff',
        '400': '#fefefe',
        '500': 'f1f1f1',
        '600': '#e4e4e4',
        '700': '#d7d7d7',
        '800': '#cbcbcb',
        '900': '#bebebe',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#b1b1b1'
    };
    $mdThemingProvider.definePalette('customBackground', customBackground);

   $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent')
       .warnPalette('customWarn')
       .backgroundPalette('customBackground')
}

public.config(theme);
projects.config(theme);
dashboard.config(theme);

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