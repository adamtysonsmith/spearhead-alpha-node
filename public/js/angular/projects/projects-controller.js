projects.controller('projectsController', function($scope, projectFactory){
    $scope.scopeName = 'Projects Controller';
    
    // Get all projects from the api route
    $scope.projects = projectFactory.queryProjects;
    console.log('All projects scope..', $scope.projects)
    
    // Defaults to show the current month in the projects datepicker range
    $scope.start = new Date();
    $scope.end = new Date();
    
    // Initialize Materialize Datepicker for modal
    // Grab the datepicker object so we can programatically open it
    var $pickadate = $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15,
        container: 'body',
        formatSubmit: 'yyyy-mm-dd'
    });
    
    var datepick = $pickadate.pickadate('datepick');
    
    // Click handlers for modal and datepickers
    $scope.addProject = function() {
        $('#addProjectModal').openModal();
    }
    $scope.closeModal = function() {
        $('#addProjectModal').closeModal();
    }
    $scope.addStartDate = function() {
        datepick.open(); 
    }
    $scope.addDueDate = function() {
        datepick.open(); 
    }
    
    // Save the new project to the DB
    $scope.saveProject = function() {
        var start = $('#start-date').val();
        var end = $('#end-date').val();
        
        var convertDate = function(date){
            // Convert date from 1 August, 2015 to 2015-08-01
            var split = date.split(' ');
            split[1] = split[1].replace(/,/, ''); // remove trailing comma

            switch(split[1]) {
                case 'January':
                    split[1] = '01';
                    break;
                case 'February':
                    split[1] = '02';
                    break;
                case 'March':
                    split[1] = '03';
                    break;
                case 'April':
                    split[1] = '04';
                    break;
                case 'May':
                    split[1] = '05';
                    break;
                case 'June':
                    split[1] = '06';
                    break;
                case 'July':
                    split[1] = '07';
                    break;
                case 'August':
                    split[1] = '08';
                    break;
                case 'September':
                    split[1] = '09';
                    break;
                case 'October':
                    split[1] = '10';
                    break;
                case 'November':
                    split[1] = '11';
                    break;
                case 'December':
                    split[1] = '12';
                    break;
            }
            
            // Add zero to date if necessary
            if(split[0].length === 1){
                split[0] = '0' + split[0];
            }
                
            return split.reverse().join('-');
        }
        
        // newProject is the ng-model in our html
        $scope.newProject.startDate = convertDate(start);
        $scope.newProject.dueDate = convertDate(end);
        
        var newProject = new projectFactory.project(this.newProject);
        newProject.$save(function(returnData){
            // This keeps the scope updated
            projectFactory.queryProjects.push(returnData);
        });
    }
    
}); // End Projects Controller