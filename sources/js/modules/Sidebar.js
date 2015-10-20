define(['./Overlay', 'jquery'], function(Overlay, $) {
    return {
        init: function () {
            var that = this;

            $('[data-hook="collapse"]').click(function () {
                var target = $(this).data('target');
                var $target = $(target);

                $('.collapse:not(' + target + ')').removeClass('in');

                if ($target.hasClass('in')) {
                    that.hide($target);
                } else {
                    that.show($target);
                }

                $('.modal-backdrop, .collapse.modal').click(function() {
                    that.hide($target);
                });
            });

            $(window).resize(function () {
                $('.collapse').removeClass('in');
                Overlay.hide();
            });
        },
        show: function ($target) {
            $target.addClass('in');
            Overlay.show($target);
        },
        hide: function ($target) {
            $target.removeClass('in');
            Overlay.hide();
        }
    };
});