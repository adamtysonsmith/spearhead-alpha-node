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