require(['./modules/Fullpage', './modules/Sidebar', 'jquery'], function(Fullpage, Sidebar, $) {
    $(function () {
        Fullpage.init();
        Sidebar.init();
    });
});