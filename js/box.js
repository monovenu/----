$(function() {
    var checked = false;
    $('#myRadio').click(function() {
        var label = $(this).prev();
        if(!checked) {
            label.addClass('active');
            checked = true;
        } else {
            $(this).attr('checked', false);
            label.removeClass('active');
            checked = false;
        }      
    });


});