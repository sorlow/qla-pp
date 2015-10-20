require.config({
    baseUrl: '/js/',
    waitSeconds: 10,
    paths: {
        'jquery': '../libs/jquery.min',
        'fullPage': '../libs/jquery.fullPage.min',
        'bootstrap': '../libs/bootstrap.min',
        'fitVids': '../libs/jquery.fitvids'
    },
    shim: {
        'fullPage': ['jquery'],
        'slimscroll': ['jquery'],
        'bootstrap': ['jquery'],
        'fitVids': ['jquery']
    },
    deps: ['main']
});
