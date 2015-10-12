require.config({
    baseUrl: 'js/',
    waitSeconds: 10,
    paths: {
        'jquery': '../libs/jquery.min',
        'fullPage': '../libs/jquery.fullPage.min',
        'bootstrap': '../libs/bootstrap.min'
    },
    shim: {
        'fullPage': ['jquery'],
        'bootstrap': ['jquery']
    },
    deps: ['main']
});