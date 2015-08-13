// Stage Pipeline Navigation
projects.directive('stagePipeline', function(){
    // Create a controller for this directive
    // that exposes methods to be used by child directives
//    var controller = function($scope) {
//        $scope.scopeName = 'Stage Pipleline Controller';
//        console.log('The pipeline controller scope', $scope);
//        
//        $scope.activeTasks = 0;
//        
//        $scope.setActiveTasks = function(stageIndex){
//            var stages = JSON.parse($scope.stages);
//            $scope.activeTasks = stages[stageIndex].tasks;
//            
//            console.log('Active tasks are', $scope.activeTasks)
//        }
//        
//        this.activeTasks = $scope.activeTasks;
        
        // Expose these vars and methods to task component directive
//        this.getActiveStage = function() {
//            console.log('The active stage is', $scope.activeStageIndex);
//            return $scope.activeStageIndex;
//        }
//        
//        // this.activeTasks = $scope.activeTasks;
//        this.stages = $scope.stages;
//        this.activeStageIndex = $scope.activeStageIndex;
//        this.scope = $scope;
//    }
    
    // Can we move this to a controller?
    var link = function(scope, element){
        console.log('Scope from the pipeline directive', scope);
        // Parse the project data from the projectDetailsController
        // We pass the data.stages into the pipeline chart
        var stages = scope.project.stages;
        console.log('The stages from pipeline directive..', stages);
        
        // Create a selection for the svgContainer
        var svgPipelineContainer = d3.select(element[0]).insert('svg', ':first-child')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 ' + 1000 + ' ' + 100)
            .attr('preserveAspectRatio','xMidYMid')
            .attr("class", "project-pipeline");
        
        initPipeline(svgPipelineContainer, scope); // Defined in d3-pipeline.js
        drawPipeline(stages); // Defined in d3-pipeline.js
    }
    
    
    return {
        restrict: 'E',
        link: link,
        scope: false
        //controller: 
        //scope: $scope
        //controller: controller,
//        scope: {
//            stages: '@'
//        }
    }
}); // End Pipeline Directive