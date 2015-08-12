// Tasks Directive
projects.directive('task', function(){
    
    var controller = function($scope) {
        console.log('Task directive data:', $scope.task);
    }
    
    var link = function(scope, element, attr, pipelineController){
        // Pass in a message to our test method
        pipelineController.test('It works!');
    }
    
    return {
        restrict: 'E',
        controller: controller,
        link: link,
        // Require the parent directive, which gives us access
        // to the parent controller in our linking function
        require: '^stagePipeline',
        templateUrl: '/partials/task',
        scope: {
            task: '=', // Specifies 2 way binding
            index: '@' // Outside In
        }
    }
}); // End Task Directive