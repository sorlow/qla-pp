require.config({
    baseUrl: '/js/',
    waitSeconds: 10,
    paths: {
        'jquery': '../libs/jquery.min',
        'fullPage': '../libs/jquery.fullPage.min',
        'slimscroll': '../libs/jquery.slimscroll.min',
        'bootstrap': '../libs/bootstrap.min'
    },
    shim: {
        'fullPage': ['jquery', 'slimscroll'],
        'slimscroll': ['jquery'],
        'bootstrap': ['jquery']
    },
    deps: ['main']
});
