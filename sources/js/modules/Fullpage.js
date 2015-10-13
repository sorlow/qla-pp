define(['fullPage', 'jquery'], function(fullpage, $) {
    return {
        init: function () {
            $('#fullpage').fullpage({
                menu: '#menu',
                resize: true,
                verticalCentered: false,
                responsiveHeight: 830,
                responsiveWidth: 990,
                onLeave: function(index, nextIndex, direction) {
                    if (nextIndex === 3 || nextIndex === 4) {
                        $('[data-menuanchor="benefits"]').addClass('preactive');
                    } else {
                        $('[data-menuanchor="benefits"]').removeClass('preactive');
                    }
                }
            });
        }
    };
});
