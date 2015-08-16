// Stage Pipeline Navigation
projects.directive('stagePipeline', function(){
    // Can we move this to a controller?
    var link = function(scope, element){
        // We pass the stages into the pipeline chart
        var stages = scope.project.stages;
        
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
        scope: true
    }
}); // End Pipeline Directive