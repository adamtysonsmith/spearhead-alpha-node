///////////////////////////////////////////////
// Project Controllers
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
    
}); // End Projects Controller


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
    
}); // End Project Details Controller
