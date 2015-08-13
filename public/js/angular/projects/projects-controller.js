projects.controller('projectsController', function($scope){
    console.log('I am the projects controller!!!');
    $scope.scopeName = 'Projects Controller';
    
    // Mock data
    $scope.projects = [
        {
            dueDate: "2015-05-01",
            duration: "The duration is XXX",
            isAbandoned: false,
            isActive: false,
            isCompleted: false,
            isDeferred: false,
            isStarted: false,
            name: "Move to Colorado",
            stages: [],
            startDate: "2015-04-20"
        },
        {
            dueDate: "2015-07-16",
            duration: "The duration is XXX",
            isAbandoned: false,
            isActive: false,
            isCompleted: false,
            isDeferred: false,
            isStarted: false,
            name: "Midterm Project",
            stages: [],
            startDate: "2015-07-01"
        },
        {
            dueDate: "2015-08-30",
            duration: "The duration is XXX",
            isAbandoned: false,
            isActive: false,
            isCompleted: false,
            isDeferred: false,
            isStarted: false,
            name: "Website Design for Pup n' Suds",
            stages: [],
            startDate: "2015-08-01"
        },
        {
            dueDate: "2015-08-15",
            duration: "The duration is XXX",
            isAbandoned: false,
            isActive: false,
            isCompleted: false,
            isDeferred: false,
            isStarted: false,
            name: "Final Project!",
            stages: [],
            startDate: "2015-07-18"
        }
    ];
    
    // Defaults to show the current month in the projects datepicker range
    $scope.start = new Date();
    $scope.end = new Date();
    
    // Initialize Materialize Datepicker for modal
    // Grab the datepicker object so we can programatically open it
    var $pickadate = $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15,
        container: 'body'
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
    
}); // End Projects Controller