// Tasks Directive
projects.directive('task', function(){
    var controller = function($scope) {
        console.log('Task directive data:', $scope.task);
    }
    
    return {
        restrict: 'E',
        controller: controller,
        templateUrl: '/partials/task',
        scope: {
            task: '=' // Specifies 2 way binding
        }
    }
}); // End Task Directive