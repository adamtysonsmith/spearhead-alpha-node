projects.controller('projectsController', function($scope, $filter, projectFactory, $mdDialog){
    $scope.scopeName = 'Projects Controller';
    
    // Get all projects from the api route
    $scope.projects = projectFactory.queryProjects;
    
    // Defaults to show the current month in the projects datepicker range
    $scope.start = new Date();
    $scope.end = new Date();
    
    
    // Add Project Dialog
    function DialogController($scope, $mdDialog){
        $scope.close = function(){
            $mdDialog.cancel();
        }
        $scope.save = function(){
            var convertDate = function(date){
                // Convert Date object to string: 2015-08-01
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                
                function formatTwoDigits(n) {
                    return n < 10 ? '0' + n : ''  + n;
                }
                
                return year + '-' + formatTwoDigits(month) + '-' + formatTwoDigits(day);
            }
            
            $scope.newProject.startDate = convertDate($scope.newProject.startDate);
            $scope.newProject.dueDate = convertDate($scope.newProject.dueDate);
            
            var newProject = new projectFactory.project(this.newProject);
            newProject.$save(function(returnData){
                // This keeps the scope updated
                projectFactory.queryProjects.push(returnData);
            });
            
            $mdDialog.hide();
        }
    }
    
    $scope.addProjectDialog = function(ev){
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/ng-views/add-project',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    }
    
}); // End Projects Controller