projects.controller('projectDetailsController', function($scope, $timeout, projectFactory, $routeParams){
    $scope.scopeName = 'Project Details Controller';
    
    projectFactory.project.get({_id: $routeParams.id}, function(returnData){
        $scope.project = returnData;
    });
    
    $scope.stageIndex = 0;
    $scope.taskIndex = 0;
    
    // Triggered by click on D3 pipeline
    $scope.setActiveTasks = function(stageIndex){
        $scope.stageIndex = stageIndex;
        $scope.$apply(function(){
            $scope.activeTasks = $scope.project.stages[stageIndex].tasks;
            $scope.activeNotes = undefined; // This resets the notes when switching tasks
            //$scope.activeNotes = $scope.activeTasks[0].notes;
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
    $scope.addStageBlur = function() {
        $scope.stageInput = false;
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
            // newTask object is the ng-model in the view
            var newTask = new projectFactory.task(this.newTask);
            var stageID = $scope.project.stages[$scope.stageIndex]._id;
            
            newTask.$save({ id: $routeParams.id, stageid: stageID }, function(returnData){
                console.log('Task save return data', returnData)
                $scope.activeTasks.push(returnData);
            });
            
            $timeout(function(){
                $('#add-task').val('');
                $scope.taskInput = false;
            }, 100)
        }
    }
    $scope.addTaskBlur = function() {
        $scope.taskInput = false;
    }
    
    $scope.addDuration = function() {
        console.log('Triggered add duration')
        // We are grabbing the value with jQuery, but the select still requires a model in HTML
        this.newTask.duration = $('#task-duration').val();
        // newTask object is the ng-model in the view
        var newTask = new projectFactory.task(this.newTask);
        var stageID = $scope.project.stages[$scope.stageIndex]._id;

        newTask.$save({ id: $routeParams.id, stageid: stageID }, function(returnData){
            $scope.activeTasks.push(returnData);
        });
        
        $timeout(function(){
            $('#add-task').val('');
            $scope.taskInput = false;
        }, 100);
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
            var newNote = new projectFactory.note(this.newNote);
            var stageId = $scope.project.stages[$scope.stageIndex]._id;
            var taskId = $scope.project.stages[$scope.stageIndex].tasks[$scope.taskIndex]._id;
            
            newNote.$save({ id: $routeParams.id, stageid: stageId, taskid: taskId }, function(returnData){
                // Temporary timestamp value
                returnData.timestamp = 'Just Now';
                $scope.activeNotes.push(returnData);
            }); 
            
            $timeout(function(){
                $('#add-note').val('');
                $scope.noteInput = false;
            }, 100)
        }
    }
    
    $scope.checkTask = function(index){
        var stageId = $scope.project.stages[$scope.stageIndex]._id;
        var taskId = $scope.project.stages[$scope.stageIndex].tasks[index]._id;
        var isCompleted = $scope.project.stages[$scope.stageIndex].tasks[index].isCompleted;
        
        var setCheckbox = function(){
            var checkbox = new projectFactory.checkbox({checked: isCompleted});
            checkbox.$save({ id: $routeParams.id, stageid: stageId, taskid: taskId }, function(returnData){
                $scope.project.stages[$scope.stageIndex].tasks[index].isCompleted = returnData.isCompleted;
            });
        }
        
        // Save the opposite of the current checkbox state in DB
        if(isCompleted === true) {
            isCompleted = false;
            setCheckbox();
        } else if (isCompleted === false) {
            isCompleted = true;
            setCheckbox();
        } else {
            console.log('Error saving checkbox, boolean is invalid.')
        }
    }
    
    $scope.addNoteBlur = function() {
        $scope.noteInput = false;
    }
    
}); // End Project Details Controller