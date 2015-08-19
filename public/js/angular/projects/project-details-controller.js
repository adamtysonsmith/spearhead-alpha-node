projects.controller('projectDetailsController', function($scope, $timeout, projectFactory, $routeParams){
    $scope.scopeName = 'Project Details Controller';
    
    console.log('The $routeParams are', $routeParams)

    projectFactory.project.get({_id: $routeParams.id}, function(successObject){
        $scope.project = successObject;
        console.log('The project is..', $scope.project)
    });
    
    
    // Cannot push into a resource object!
    //$scope.project.stages.$save({name: 'Initial Stage'}); ???
    
    // Mock data
//    $scope.project = {
//            dueDate: "2015-08-15",
//            duration: "The duration is XXX",
//            isAbandoned: false,
//            isActive: false,
//            isCompleted: false,
//            isDeferred: false,
//            isStarted: false,
//            name: "Final Project!",
//            stages: [
//                {
//                    dueDate: "The due date is XXX",
//                    duration: "The duration is XXX",
//                    isActive: false,
//                    isCompleted: false,
//                    isDeferred: false,
//                    isStarted: false,
//                    name: "Finish Project Details UI",
//                    startDate: undefined,
//                    tasks: [
//                        {
//                            content: "Ability to add stages, tasks, notes",
//                            duration: "The duration is XXX",
//                            isCompleted: false,
//                            isDeferred: false,
//                            notes: [
//                                {
//                                    content: "They need to update the angular vars and also update the database",
//                                    timestamp: "2015-08-09_16:10:17"
//                                },
//                                {
//                                    content: "Checkboxes need to save state, and we need styles to represent active tasks",
//                                    timestamp: "2015-08-09_16:10:17"
//                                },
//                                {
//                                    content: "When switching to new stage, needs to be set to the first task in that stage",
//                                    timestamp: "2015-08-09_16:10:17"
//                                }
//                            ],
//                            timestamp: "2015-08-09_16:10:17"
//                        },
//                        {
//                            content: "Edit in Place",
//                            duration: "The duration is XXX",
//                            isCompleted: false,
//                            isDeferred: false,
//                            notes: [{
//                                content: "We want to be able to edit in place for the stages.  We can append the form elements in d3 and handle the events outside of angular. We also need the tasks and notes to be edited in place via Angular",
//                                timestamp: "2015-08-09_16:10:17"
//                            }],
//                            timestamp: "2015-08-09_16:10:17"
//                        },
//                        {
//                            content: "This is your third task",
//                            duration: "The duration is XXX",
//                            isCompleted: false,
//                            isDeferred: false,
//                            notes: [{
//                                content: "This is your third note!",
//                                timestamp: "2015-08-09_16:10:17"
//                            }],
//                            timestamp: "2015-08-09_16:10:17"
//                        }
//                    ],
//                    timestamp: "2015-08-09_16:10:17"
//                },
//                {
//                    dueDate: "The due date is XXX",
//                    duration: "The duration is XXX",
//                    isActive: false,
//                    isCompleted: false,
//                    isDeferred: false,
//                    isStarted: false,
//                    name: "Dashboard Angular UI",
//                    startDate: undefined,
//                    tasks: [{
//                        content: "Make sure you get paid son",
//                        duration: "The duration is XXX",
//                        isCompleted: false,
//                        isDeferred: false,
//                        notes: [{
//                            content: "This is your first note!",
//                            timestamp: "2015-08-09_16:10:17"
//                        }],
//                        timestamp: "2015-08-09_16:10:17"
//                    }],
//                    timestamp: "2015-08-09_16:10:17"
//                },
//                {
//                    dueDate: "The due date is XXX",
//                    duration: "The duration is XXX",
//                    isActive: false,
//                    isCompleted: false,
//                    isDeferred: false,
//                    isStarted: false,
//                    name: "Backend Code",
//                    startDate: undefined,
//                    tasks: [{
//                        content: "Design that shit!",
//                        duration: "The duration is XXX",
//                        isCompleted: false,
//                        isDeferred: false,
//                        notes: [{
//                            content: "This is your first note!",
//                            timestamp: "2015-08-09_16:10:17"
//                        }],
//                        timestamp: "2015-08-09_16:10:17"
//                    }],
//                    timestamp: "2015-08-09_16:10:17"
//                }
//            ],
//            startDate: "2015-07-18"
//    }
    
    //////////////////////////////////////////////////
    // Set the Active Tasks & Notes
    //////////////////////////////////////////////////
    
    // Default to the first stage
    //$scope.activeTasks = $scope.project.stages[0].tasks;
    //$scope.activeNotes = $scope.activeTasks[0].notes;
//    console.log('$scope.project =', $scope.project)
//    console.log('$scope.project.stages =', $scope.project.stages)
//    console.log('$scope.project.stages[0] =', $scope.project.stages[0])
//    console.log('$scope.project.stages[0].tasks =', $scope.project.stages[0].tasks)
//    console.log('$scope.project.stages[0].tasks[0] =', $scope.project.stages[0].tasks[0])
    
    $scope.stageIndex = 0;
    $scope.taskIndex = 0;
    
    // Triggered by click on D3 pipeline
    $scope.setActiveTasks = function(stageIndex){
        $scope.stageIndex = stageIndex;
        $scope.$apply(function(){
            $scope.activeTasks = $scope.project.stages[stageIndex].tasks;
            $scope.activeNotes = $scope.activeTasks[0].notes;
        });
    }
    
    $scope.setActiveNotes = function(taskIndex){
        $scope.taskIndex = taskIndex;
        $scope.activeNotes = $scope.activeTasks[taskIndex].notes;
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
        // 1. Push data to angular scope
        // 2. Hide the stageInput
        // 3. Clear the input
        // 4. TODO: Save the stage to DB and update UI
        if(keycode === 13) {
            // newStage ng-model in the view
            var newStage = new projectFactory.stage(this.newStage);
            
            newStage.$save({id: $routeParams.id}, function(returnData){
                console.log('The stage save data', returnData)
                $scope.project.stages.push(returnData);
                
                // Nuke and repave the pipeline
                $('stage-pipeline > svg').html('');
                drawPipeline($scope.project.stages);
                
                // Clear the stage input & hide
                $scope.newStage = null;
                $scope.stageInput = false;
            });
        }
    }
        // Deal with blur later
//    $scope.addStageBlur = function() {
//        $scope.stageInput = false;
//        $scope.project.stages.push({ name: $scope.newStage});
//        drawPipeline($scope.project.stages);
//        $scope.newStage = null;
//    }
    

    
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
            // newTask object is the ng-model in the view
            var newTask = new projectFactory.task(this.newTask);
            var stageID = $scope.project.stages[$scope.stageIndex]._id;
            
            newTask.$save({ id: $routeParams.id, stageid: stageID }, function(returnData){
                console.log('Task save returnData', returnData)
                $scope.activeTasks.push(returnData);
                console.log('The project after save', $scope.project)
                
            });
            
            $timeout(function(){
                $('#add-task').val('');
                $scope.taskInput = false;
            }, 100)
        }
    }
        // Deal with blur later
//    $scope.addTaskBlur = function() {
//        $scope.taskInput = false;
//        var copy = angular.copy($scope.newTask);
//        $scope.activeTasks.push({ content: copy});
//        
//        $timeout(function(){
//            //$scope.newTask = null;
//        }, 100);
//    }

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
            var newNote = new projectFactory.note(this.newNote);
            var stageId = $scope.project.stages[$scope.stageIndex]._id;
            var taskId = $scope.project.stages[$scope.stageIndex].tasks[$scope.taskIndex]._id;
            
            newNote.$save({ id: $routeParams.id, stageid: stageId, taskid: taskId }, function(returnData){
                console.log('Note save returnData', returnData)
                $scope.activeNotes.push(returnData);
                console.log('The project after save', $scope.project)
            }); 
            
            $timeout(function(){
                $('#add-note').val('');
                $scope.noteInput = false;
            }, 100)
        }
    }
    
    $scope.checkTask = function(index){
        // ng-model isChecked is true or false
        var checkTask = new projectFactory.checkTask({checked: isChecked});
        var stageId = $scope.project.stages[$scope.stageIndex]._id;
        var taskId = $scope.project.stages[$scope.stageIndex].tasks[$scope.taskIndex]._id;
        
        $http.post('/api/projects/:id/stages/:stageid/tasks/:taskid', {checked: isChecked})
            .success(console.log('Succesfully checked off the task'));
    }
    // Deal with blur later
//    $scope.addNoteBlur = function() {
//        $scope.noteInput = false;
//        $scope.activeNotes.push({ content: $scope.newNote});
//        //$scope.newNote = "test";
//    }
    
    
    
}); // End Project Details Controller
