require([ 'fullPage', 'jquery', 'bootstrap'], function(fullpage, $) {
    $(function() {
        $('#fullpage').fullpage({
            menu: '#menu',
            resize: true,
            verticalCentered: false
        });
    });
});
