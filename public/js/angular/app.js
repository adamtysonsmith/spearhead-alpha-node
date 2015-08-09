var spearhead = angular.module('spearhead', ['ngResource', 'ngRoute']);


///////////////////////////////////////////////
// Routes
///////////////////////////////////////////////

spearhead.config(function($routeProvider){
	$routeProvider.when('/dashboard', {
			templateUrl : '/templates/dashboard',
			controller  : 'dashboardController'
		})
		.when('/projects', {
			templateUrl : '/templates/projects',
			controller  : 'projectsController'
		})
		.when('/projects/:id', {
			templateUrl : '/templates/project-details',
			controller  : 'projectDetailsController'
		});
});



///////////////////////////////////////////////
// Directives
///////////////////////////////////////////////

// Project Waterfall Navigation
spearhead.directive('projectTimeline', function(){
    
    var link = function(scope, el) {
        // selection is an array of the new values
        scope.$watchGroup(['start','end'], function(selection){
            console.log('Something changed!', selection)
            
            // Nuke the current charts
            $('project-timeline').html('');
            
            var parsedData = JSON.parse(scope.data);

            // D3 Layout variables
            var width = 1200;
            var height = 400;
            var sidePadding = 0;
            var topPadding = 0;

            // Create a selection for the svgContainer
            var svgContainer = d3.select(el[0]).append('svg')
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('viewBox', '0 0 ' + width + ' ' + height)
                .attr('preserveAspectRatio','xMidYMid')
                .attr("class", "svg-container");

            // Format the dates and times
            var dateFormat = d3.time.format('%Y-%m-%d');
            var timeFormat = d3.time.format('%b %e, %Y');

            // We trim off the current day and append the first or last day of the month roughly
            var startMonth = selection[0].slice(1, 9) + '01';
            var endMonth = selection[1].slice(1, 9) + '31';
            
            // min is the start selection, max is the end selection
            var min = dateFormat.parse(startMonth);
            var max = dateFormat.parse(endMonth);
            
            // Pass the min and max dates, create our time scale
            var timeScale = d3.time.scale().domain([min, max]).range([40, width - 40]);

            // Create a color scale for our bars
            var colorScale = d3.scale.linear()
                .domain([0, parsedData.length])
                .range(['#1199BF', '#12BF25'])
                .interpolate(d3.interpolateHcl);
            
            // Check to make sure start date is before end date
            if(min < max) {
                // Now rebuild the charts
                drawAxis(svgContainer, 0, 0, width, height, min, max, timeScale, timeFormat);
                drawBars(parsedData, svgContainer, 50, 0, 0, 40, colorScale, timeScale, dateFormat, width, height);
            } else {
                // The last argument is the css class
                Materialize.toast('Whoops, you have to choose a start date that comes before the end date!', 4000, 'date-toast')
                console.log('Start date is greater than the end date');
            }
        });
    }
    
    return {
        link: link,
        restrict: 'E',
        scope: { 
            data: '@',
            start: '@',
            end: '@'
        }
    }
    
});

// Projects Controller
spearhead.controller('projectsController', function($scope){
    $scope.projects = [
        {
            dueDate: "2015-05-01",
            duration: "The duration is XXX",
            isAbandoned: false,
            isActive: false,
            isCompleted: false,
            isDeferred: false,
            isStarted: false,
            name: "Move to Colorado",
            stages: [],
            startDate: "2015-04-20"
        },
        {
            dueDate: "2015-07-16",
            duration: "The duration is XXX",
            isAbandoned: false,
            isActive: false,
            isCompleted: false,
            isDeferred: false,
            isStarted: false,
            name: "Midterm Project",
            stages: [],
            startDate: "2015-07-01"
        },
        {
            dueDate: "2015-08-30",
            duration: "The duration is XXX",
            isAbandoned: false,
            isActive: false,
            isCompleted: false,
            isDeferred: false,
            isStarted: false,
            name: "Website Design for Pup n' Suds",
            stages: [],
            startDate: "2015-08-01"
        },
        {
            dueDate: "2015-08-15",
            duration: "The duration is XXX",
            isAbandoned: false,
            isActive: false,
            isCompleted: false,
            isDeferred: false,
            isStarted: false,
            name: "Final Project!",
            stages: [],
            startDate: "2015-07-18"
        }
    ];
    
    // Defaults to show the current month in datepicker
    $scope.start = new Date();
    $scope.end = new Date();
    
});