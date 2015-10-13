define(['jquery'], function($) {
    return {
        show: function ($target) {
            if (!$('.modal-backdrop').length) {
                $target.before('<div class="modal-backdrop fade in" />');
            }
        },
        hide: function () {
            $('.modal-backdrop').remove();
        }
    };
});
