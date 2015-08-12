// Stage Pipeline Navigation
projects.directive('stagePipeline', function(){
    // Create a controller for this directive
    // that exposes methods to be used by child directives
    var controller = function($scope) {
        // Expose a test method
        this.test = function(message){
            console.log('Parent says..', message);
        }
    }
    
    // Can we move this to a controller?
    var link = function(scope, element){
        // Parse the data from Angular
        var parsedData = JSON.parse(scope.data);
        console.log('The data..', parsedData);
        
        // Create a selection for the svgContainer
        var svgPipelineContainer = d3.select(element[0]).insert('svg', ':first-child')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 ' + 1000 + ' ' + 100)
            .attr('preserveAspectRatio','xMidYMid')
            .attr("class", "project-pipeline");
        
        initPipeline(svgPipelineContainer); // Defined in d3-pipeline.js
        drawPipeline(parsedData.stages); // Defined in d3-pipeline.js
    }
    
    
    return {
        restrict: 'E',
        controller: controller,
        link: link,
        scope: {
            data: '@'
        }
    }
}); // End Pipeline Directive