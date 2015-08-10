$(document).ready(function(){
    // Initialize Materialize Mobile side nav and modals
    $(".button-collapse").sideNav();
    
    /////////////////////////////////////////
    // Materialize Color change selection
    /////////////////////////////////////////
    var currentColor = $('#change-color').val();
    $('#change-color').on('change', function(){
        // Give me the new color
        var newColor = $(this).val();
        
        // Select the class of currentColor, replace with newColor
        $('.' + currentColor + '').addClass(newColor)
            .removeClass(currentColor);
        
        // Reset current color
        currentColor = newColor;
    });
    
});