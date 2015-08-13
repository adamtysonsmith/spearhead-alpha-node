projects.controller('projectDetailsController', function($scope, $timeout){
    $scope.scopeName = 'Project Details Controller';
    
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
                    name: "Finish Project Details UI",
                    startDate: undefined,
                    tasks: [
                        {
                            content: "Ability to add stages, tasks, notes",
                            duration: "The duration is XXX",
                            isCompleted: false,
                            isDeferred: false,
                            notes: [
                                {
                                    content: "They need to update the angular vars and also update the database",
                                    timestamp: "2015-08-09_16:10:17"
                                },
                                {
                                    content: "Checkboxes need to save state, and we need styles to represent active tasks",
                                    timestamp: "2015-08-09_16:10:17"
                                },
                                {
                                    content: "When switching to new stage, needs to be set to the first task in that stage",
                                    timestamp: "2015-08-09_16:10:17"
                                }
                            ],
                            timestamp: "2015-08-09_16:10:17"
                        },
                        {
                            content: "This is your second task",
                            duration: "The duration is XXX",
                            isCompleted: false,
                            isDeferred: false,
                            notes: [{
                                content: "This is your second note! Its a part of the second task",
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
                                content: "This is your third note!",
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
                    name: "Dashboard Angular UI",
                    startDate: undefined,
                    tasks: [{
                        content: "Make sure you get paid son",
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
                    name: "Backend Code",
                    startDate: undefined,
                    tasks: [{
                        content: "Design that shit!",
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
    
    
    //////////////////////////////////////////////////
    // Input Handlers
    //////////////////////////////////////////////////
    
    // Stage Input handlers
    $scope.showStageInput = function(){
        $scope.stageInput = true;
        $timeout(function(){
            $('#add-stage').focus();
        }, 100);
    }
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
    $scope.showTaskInput = function(){
        $scope.taskInput = true;
        $timeout(function(){
            $('#add-task').focus();
        }, 100);
    }
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
    $scope.showNoteInput = function(){
        $scope.noteInput = true;
        $timeout(function(){
            $('#add-note').focus();
        }, 100);
    }
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
    
    
    //////////////////////////////////////////////////
    // Set the Active Tasks & Notes
    //////////////////////////////////////////////////
    
    // Default to the first stage
    $scope.activeTasks = $scope.project.stages[0].tasks;
    $scope.activeNotes = $scope.activeTasks[0].notes;
    
    // Triggered by click on D3 pipeline
    $scope.setActiveTasks = function(stageIndex){
        $scope.$apply(function(){
            $scope.activeTasks = $scope.project.stages[stageIndex].tasks;
        });
    }
    
    $scope.setActiveNotes = function(taskIndex){
        $scope.activeNotes = $scope.activeTasks[taskIndex].notes;
    }
    
}); // End Project Details Controller
