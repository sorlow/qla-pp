define(['jquery', 'fitVids'], function($) {
    return {
        init: function () {
            $('[data-fitvids]').fitVids();
        }
    };
});
