require(['./modules/Fullpage', './modules/Sidebar', './modules/FitVids', 'jquery'], function(Fullpage, Sidebar, FitVids, $) {
    $(function () {
        Fullpage.init();
        FitVids.init();
        Sidebar.init();
    });
});