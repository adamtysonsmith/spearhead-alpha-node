var projects = angular.module('projects', ['ngResource', 'ngRoute']);

///////////////////////////////////////////////
// Routes
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
// Controllers
///////////////////////////////////////////////

// Projects Controller
projects.controller('projectsController', function($scope){
    console.log('I am the projects controller!!!');
    
    // Mock data
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
    
    // Defaults to show the current month in the projects datepicker range
    $scope.start = new Date();
    $scope.end = new Date();
    
    // Initialize Materialize Datepicker for modal
    // Grab the datepicker object so we can programatically open it
    var $pickadate = $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15,
        container: 'body'
    });
    
    var datepick = $pickadate.pickadate('datepick');
    
    // Click handlers for modal and datepickers
    $scope.addProject = function() {
        $('#addProjectModal').openModal();
    }
    $scope.closeModal = function() {
        $('#addProjectModal').closeModal();
    }
    $scope.addStartDate = function() {
        datepick.open();
    }
    $scope.addDueDate = function() {
        datepick.open();
    }
    
});


// Project Details Controller
projects.controller('projectDetailsController', function($scope, $timeout){
    // Mock data
    $scope.project = {
            dueDate: "2015-08-15",
            duration: "The duration is XXX",
            isAbandoned: false,
            isActive: false,
            isCompleted: false,
            isDeferred: false,
            isStarted: false,
            name: "Final Project!",
            stages: [
                {
                    dueDate: "The due date is XXX",
                    duration: "The duration is XXX",
                    isActive: false,
                    isCompleted: false,
                    isDeferred: false,
                    isStarted: false,
                    name: "Meet Client",
                    startDate: undefined,
                    tasks: [
                        {
                            content: "This is your first task",
                            duration: "The duration is XXX",
                            isCompleted: false,
                            isDeferred: false,
                            notes: [{
                                content: "This is your first note!",
                                timestamp: "2015-08-09_16:10:17"
                            }],
                            timestamp: "2015-08-09_16:10:17"
                        },
                        {
                            content: "This is your second task",
                            duration: "The duration is XXX",
                            isCompleted: false,
                            isDeferred: false,
                            notes: [{
                                content: "This is your first note!",
                                timestamp: "2015-08-09_16:10:17"
                            }],
                            timestamp: "2015-08-09_16:10:17"
                        },
                        {
                            content: "This is your third task",
                            duration: "The duration is XXX",
                            isCompleted: false,
                            isDeferred: false,
                            notes: [{
                                content: "This is your first note!",
                                timestamp: "2015-08-09_16:10:17"
                            }],
                            timestamp: "2015-08-09_16:10:17"
                        }
                    ],
                    timestamp: "2015-08-09_16:10:17"
                },
                {
                    dueDate: "The due date is XXX",
                    duration: "The duration is XXX",
                    isActive: false,
                    isCompleted: false,
                    isDeferred: false,
                    isStarted: false,
                    name: "Get PAID!",
                    startDate: undefined,
                    tasks: [{
                        content: "This is your first task",
                        duration: "The duration is XXX",
                        isCompleted: false,
                        isDeferred: false,
                        notes: [{
                            content: "This is your first note!",
                            timestamp: "2015-08-09_16:10:17"
                        }],
                        timestamp: "2015-08-09_16:10:17"
                    }],
                    timestamp: "2015-08-09_16:10:17"
                },
                {
                    dueDate: "The due date is XXX",
                    duration: "The duration is XXX",
                    isActive: false,
                    isCompleted: false,
                    isDeferred: false,
                    isStarted: false,
                    name: "Design Website",
                    startDate: undefined,
                    tasks: [{
                        content: "This is your first task",
                        duration: "The duration is XXX",
                        isCompleted: false,
                        isDeferred: false,
                        notes: [{
                            content: "This is your first note!",
                            timestamp: "2015-08-09_16:10:17"
                        }],
                        timestamp: "2015-08-09_16:10:17"
                    }],
                    timestamp: "2015-08-09_16:10:17"
                }
            ],
            startDate: "2015-07-18"
    }
    
    console.log('I am the project details controller!!! These are the stages...', $scope.project.stages);
    
    $scope.showStageInput = function(){
        $scope.stageInput = true;
        $timeout(function(){
            $('#add-stage').focus();
        }, 100);
    }
    $scope.showTaskInput = function(){
        $scope.taskInput = true;
        $timeout(function(){
            $('#add-task').focus();
        }, 100);
    }
    $scope.showNoteInput = function(){
        $scope.noteInput = true;
        $timeout(function(){
            $('#add-note').focus();
        }, 100);
    }
    
    // Stage Input handlers
    $scope.addStageKeyup = function(keycode) {
        // If user presses enter:
        // 1. Hide the stageInput
        // 2. Clear the input
        // 3. TODO: Save the stage to DB and update UI
        if(keycode === 13) {
            $scope.stageInput = false;
            $scope.newStage = null;
        }
    }
    $scope.addStageBlur = function() {
        $scope.stageInput = false;
        $scope.newStage = null;
    }
    
    // Task Input handlers
    $scope.addTaskKeyup = function(keycode) {
        // If user presses enter:
        // 1. Hide the stageInput
        // 2. Clear the input
        // 3. TODO: Save the stage to DB and update UI
        if(keycode === 13) {
            $scope.taskInput = false;
            $scope.newTask = null;
        }
    }
    $scope.addTaskBlur = function() {
        $scope.taskInput = false;
        $scope.newTask = null;
    }
    
    // Note Input handlers
    $scope.addNoteKeyup = function(keycode) {
        // If user presses enter:
        // 1. Hide the stageInput
        // 2. Clear the input
        // 3. TODO: Save the stage to DB and update UI
        if(keycode === 13) {
            $scope.noteInput = false;
            $scope.newNote = null;
        }
    }
    $scope.addNoteBlur = function() {
        $scope.noteInput = false;
        $scope.newNote = null;
    }

    
});



///////////////////////////////////////////////
// Directives
///////////////////////////////////////////////

// Project Waterfall Navigation
projects.directive('projectTimeline', function(){
    
    var link = function(scope, element) {
        // selection is an array of the new values
        scope.$watchGroup(['start','end'], function(selection){
            console.log('Something changed!', selection)
            
            // Nuke the current charts
            $('project-timeline').html('');
            
            // Parse the data from Angular
            var parsedData = JSON.parse(scope.data);

            // D3 Layout variables
            var width = 1200;
            var height = 400;
            var sidePadding = 0;
            var topPadding = 0;

            // Create a selection for the svgContainer
            var svgContainer = d3.select(element[0]).append('svg')
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
            
            // Check to make sure selected start date precedes end date
            if(min < max) {
                // Now rebuild the charts
                drawAxis(svgContainer, 0, 0, width, height, min, max, timeScale, timeFormat); // Defined in d3-waterfall.js
                drawBars(parsedData, svgContainer, 50, 0, 0, 40, colorScale, timeScale, dateFormat, width, height); // Defined in d3-waterfall.js
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
    
}); // End Waterfall Nav Directive


// Stage Pipeline Navigation
projects.directive('stagePipeline', function(){
    var link = function(scope, element){
        // Parse the data from Angular
        var parsedData = JSON.parse(scope.data);
        console.log('The data..', parsedData);
        
        // Create a selection for the svgContainer
        var svgPipelineContainer = d3.select(element[0]).append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 ' + 1000 + ' ' + 100)
            .attr('preserveAspectRatio','xMidYMid')
            .attr("class", "project-pipeline");
        
        initPipeline(svgPipelineContainer); // Defined in d3-pipeline.js
        drawPipeline(parsedData.stages); // Defined in d3-pipeline.js
        
        console.log('Should have drew pipeline')
    }
    
    return {
        link: link,
        restrict: 'E',
        scope: {
            data: '@'
        }
    }
}); // End Pipeline Directive


// Tasks Directive
projects.directive('task', function(){
    var controller = function($scope) {
        console.log('Task directive data:', $scope.task);
    }
    
    return {
        restrict: 'E',
        controller: controller,
        templateUrl: '/partials/task',
        scope: {
            task: '=' // Specifies 2 way binding
        }
    }
}); // End Task Directive