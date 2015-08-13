//// Task Component Directive
//// The TC directive will contain the template to display all the tasks and notes
//// for a selected stage in the pipeline
//
//// ProjectDetails controller has the whole project in scope, passes stages to pipeline directive [DONE]
//// Pipeline controller has the stages and active stage in scope, passes tasks to TC
//// TC should have its own scope that has the tasks/notes, active task which shows notes
//projects.directive('tasksComponent', function(){
//    
////    var controller = function($scope, $timeout) {
////        $scope.scopeName = 'TC Controller';
////        
////        $scope.activeTasks = $scope.$parent.activeTasks;
//        
////        // Task Input handlers
////        $scope.showTaskInput = function(){
////            $scope.taskInput = true;
////            $timeout(function(){
////                $('#add-task').focus();
////            }, 100);
////        }
////        $scope.addTaskKeyup = function(keycode) {
////            // If user presses enter:
////            // 1. Hide the stageInput
////            // 2. Clear the input
////            // 3. TODO: Save the stage to DB and update UI
////            if(keycode === 13) {
////                $scope.taskInput = false;
////                $scope.newTask = null;
////            }
////        }
////        $scope.addTaskBlur = function() {
////            $scope.taskInput = false;
////            $scope.newTask = null;
////        }
////        
////        // Note Input handlers
////        $scope.showNoteInput = function(){
////            $scope.noteInput = true;
////            $timeout(function(){
////                $('#add-note').focus();
////            }, 100);
////        }
////        $scope.addNoteKeyup = function(keycode) {
////            // If user presses enter:
////            // 1. Hide the stageInput
////            // 2. Clear the input
////            // 3. TODO: Save the stage to DB and update UI
////            if(keycode === 13) {
////                $scope.noteInput = false;
////                $scope.newNote = null;
////            }
////        }
////        $scope.addNoteBlur = function() {
////            $scope.noteInput = false;
////            $scope.newNote = null;
////        }
//        
////    } // End Controller
//    
//    var link = function(scope, element, attr, pipelineController){
//        
////        console.log('The scope in TC link', scope)
////        console.log('The active tasks in pipeline controller..', pipelineController.activeTasks)
////        
////        scope.activeTasks = pipelineController.activeTasks;
////        console.log('The TC active tasks are', scope.activeTasks);
////        var activeStageIndex = pipelineController.getActiveStage();
////        
////        var stages = JSON.parse(pipelineController.stages);
////        
////        console.log('The stages are:', stages)
////        
////        scope.activeTasks = stages[activeStageIndex].tasks;
////        
////        console.log('the active tasks are', scope.activeTasks);
////        
////        pipelineController.scope.$watch(pipelineController.activeStageIndex, function(newStageIndex, oldStageIndex){
////            console.log('triggered a watch', newStageIndex, oldStageIndex)
////            if(newStageIndex) {
////                scope.activeTasks = stages[newStageIndex].tasks;
////            }
////        });
//    }
//    
//    return {
//        restrict: 'E',
//        link: link,
//        templateUrl: '/partials/task-component',
//        scope: false
//        //controller: controller,
//        // Require the parent directive, which gives us access
//        // to the parent controller(Pipeline Directive Controller) in our linking function
//        //require: '^stagePipeline',
//        //scope: { tasks: '=' } 
//    }
//});