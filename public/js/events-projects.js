///////////////////////////////////////////////
// Projects Initialization and Event Handlers
// Initial event handlers from spearhead-alpha front end mockup
///////////////////////////////////////////////

$(document).ready(function() {
    //////////////////////////////////////////
    // Initializations
    //////////////////////////////////////////
    location.hash = '#';
//    var hash = location.hash.split('/');
//    var projectIndex = hash[0].slice(9);
//    var stageIndex = hash[1].slice(6);
//    var taskIndex = hash[2].slice(5);
    
    buildWaterfallNav(allProjects);
    initPipeline();
    
    //////////////////////////////////////////
    // Navigation
    //////////////////////////////////////////
    
    // Navigation: Waterfall Bars
    // #project=[index]/stage=0/task=0
    $('body').on('click', '.project-bar', function() {
        var projectIndex = $(this).attr('data-project');
        location.hash = 'project=' + projectIndex + '/stage=0/task=0';
    });
    
    // Navigation: Project Stages
    // #project=1/stage=[index]/task=0
    $('body').on('click', '.stage-item', function() {
        var stageIndex = $(this).attr('data-stage');
        console.log('Stage index is', stageIndex);
        var currentHash = location.hash.split('/');
        currentHash[1] = 'stage=' + stageIndex;
        location.hash = currentHash.join('/');
    });

    // Navigation: Project Tasks
    // #project=1/stage=2/task=[index]
    $('body').on('click', '.task', function() {
        var taskIndex = $(this).attr('data-task');
        console.log('Task index is', taskIndex);
        var currentHash = location.hash.split('/');
        currentHash[2] = 'task=' + taskIndex;
        location.hash = currentHash.join('/');
    });
    

    // Hash Change Logic
    $(window).on('hashchange', function(e) {
        // Create our hash array
        var hash = location.hash.split('/');
        var projectIndex = hash.length > 2 ? hash[0].slice(9) : null;
        var stageIndex = hash.length > 2 ? hash[1].slice(6) : null;
        var taskIndex = hash.length > 2 ? hash[2].slice(5) : null;
        
        console.log('Full hash is', hash);
        console.log('Project Index is', projectIndex);
        console.log('Stage Index is', stageIndex);
        console.log('Task Index is', taskIndex);
        // projectIndex >= 0 && projectIndex !== ''
        
        if (projectIndex >= 0 && projectIndex !== '' && projectIndex !== null) {
            // If hash is #project=[index]/stage=0/task=0 (You are showing the project details)
            // Hide waterfall and render project detail templates
            $('#waterfall-large').hide();
            renderProjectTemplates(
                allProjects[projectIndex], 
                allProjects[projectIndex].stages[stageIndex],
                allProjects[projectIndex].stages[stageIndex].tasks[taskIndex]
            );

            // Update Active task highlighting based on hash
            $('.task').each(function(index, value){
                if(index == taskIndex) {
                    $(this).css('background-color', 'rgb(255, 223, 163)');
                }
            });
            
            // Update Active stage highlighting based on hash
            $('.stage-item').each(function(index, value){
                if(index == stageIndex) {
                    // Works - Need to think about how to add line
                    // $(this).append('fill', 'cadetblue');
                }
            });
            
            
        }  else {
            // If hash is # (You are showing the waterfall nav)
            // Empty our templates
            $('.project-info').html('');
            $('.pipeline-container').html('');
            $('.tasks-container').html('');
            $('.notes-container').html('');
            
            $('#waterfall-large').show();
        }
    });
    
    
    
    //////////////////////////////////////////
    // Project Main View
    //////////////////////////////////////////
    
    // Project Main View:  'Add Project'
    $('#project-start-date').datepicker();
    $('#project-due-date').datepicker();
    
    $('body').on('click', '#save-new-project', function() {
        var name = $('#project-name').val();
        var startDate = $('#project-start-date').val();
        var dueDate = $('#project-due-date').val();
        
        var newProject = new Project(name, startDate, dueDate, [stageOne, stageTwo]);
        allProjects.push(newProject);
        
        // Remove the current waterfall and build a new one
        buildWaterfallNav(allProjects);
        
        // Reset the input fields
        $('#project-name').val('');
        $('#project-start-date').val('');
        $('#project-due-date').val('');
        
        console.log('New Project Saved!', name, startDate, dueDate);
    });
    
    // Project Main View:  'Cancel Project'
    $('body').on('click', '#cancel-new-project', function() {
        console.log('New Project Canceled =(');
    });
    
    
    //////////////////////////////////////////
    // Project Detail View
    //////////////////////////////////////////
    
    // Project Detail View: Add Stage
    $('body').on('click', '.add-stage-button', function() {
        $('.add-stage-input').show().focus();
    });
    
    $('body').on('keypress focusout', '.add-stage-input', function(e) {
        var hash = location.hash.split('/');
        var projectIndex = hash[0].slice(9);
        var stageIndex = hash[1].slice(6);
        var taskIndex = hash[2].slice(5);
        
        var name;
        
        if ((e.which === 13) || (e.type === 'focusout')) {
            name = $(this).val();
            // Reset the input field & Hide textarea
            $(this).val('');
            $(this).hide();
            
            // Then, if there is actually content we save it
            if (name.length > 0) {
                newStage = new Stage(name, [firstTask]);
                allProjects[projectIndex].stages.push(newStage);
                renderProjectTemplates(
                    allProjects[projectIndex], 
                    allProjects[projectIndex].stages[stageIndex],
                    allProjects[projectIndex].stages[stageIndex].tasks[taskIndex]
                );
            }
        }
    });
    
    // Project Detail View: Task Checkbox
    $('body').on('click', '.custom-checkbox', function() {
        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');
            $(this).next().removeClass('strike-through');
        } else {
            $(this).addClass('checked');
            $(this).next().addClass('strike-through');
        }
        // Now perform a sort and move the checked tasks to bottom
    });
    
    // Project Detail View: Active Task Highlight
//    $('body').on('click', '.task', function() {
//        $('.task').removeClass('active-task');
//        $(this).addClass('active-task');
//        // Not working
//    });
    
    // Project Detail View: Add Tasks
    $('body').on('click', '.add-task-button', function() {
        $('.add-task-container').show();
        $('.add-task-input').focus();
    });
    
    $('body').on('keypress focusout', '.add-task-input', function(e) {
        var hash = location.hash.split('/');
        var projectIndex = hash[0].slice(9);
        var stageIndex = hash[1].slice(6);
        var taskIndex = hash[2].slice(5);
        
        var content;
        var newTask;
        
        if ((e.which === 13) || (e.type === 'focusout')) {
            content = $(this).val();
            // Reset the input field & Hide textarea
            $(this).val('');
            $(this).parent().hide();
            
            // Then, if there is actually content we save it
            if (content.length > 0) {
                newTask = new Task(content,[]);
                allProjects[projectIndex].stages[stageIndex].tasks.push(newTask);
                renderProjectTemplates(
                    allProjects[projectIndex], 
                    allProjects[projectIndex].stages[stageIndex],
                    allProjects[projectIndex].stages[stageIndex].tasks[taskIndex]
                );
            }
        }
    });
    
    // Project Detail View: Add Notes
    $('body').on('click', '.add-note-button', function() {
        $('.add-note-container').show();
        $('.add-note-input').focus();
    });
    
    $('body').on('keypress focusout', '.add-note-input', function(e) {
        var hash = location.hash.split('/');
        var projectIndex = hash[0].slice(9);
        var stageIndex = hash[1].slice(6);
        var taskIndex = hash[2].slice(5);
        
        var content;
        var newNote;
        
        if ((e.which === 13) || (e.type === 'focusout')) {
            content = $(this).val();
            // Reset the input field & Hide textarea
            $(this).val('');
            $(this).parent().hide();
            
            // Then, if there is actually content we save it
            if (content.length > 0) {
                newNote = new Note(content);
                allProjects[projectIndex].stages[stageIndex].tasks[taskIndex].notes.push(newNote);
                renderProjectTemplates(
                    allProjects[projectIndex], 
                    allProjects[projectIndex].stages[stageIndex],
                    allProjects[projectIndex].stages[stageIndex].tasks[taskIndex]
                );
            }
        }
    });
    
}); // End Ready