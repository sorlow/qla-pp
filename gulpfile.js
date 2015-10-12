/* global require */
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var requirejsOptimize = require('gulp-requirejs-optimize');
var concat = require('gulp-concat');
var del = require('del');
var merge = require('merge-stream');
var browserSync = require('browser-sync').create();

// Clening public folder
gulp.task('cleanLibs', function () {
    return del(['public/libs/**', 'sources/css/bootstrap']);
});
gulp.task('cleanImages', function () {
    return del(['public/images/**']);
});
gulp.task('cleanFonts', function () {
    return del(['public/fonts/**']);
});
gulp.task('cleanCss', function () {
    return del(['public/.tmp/**', 'public/css/**']);
});
gulp.task('cleanJs', function () {
    return del(['public/.tmp/**', 'public/js/**']);
});

// Compiles sass files along with source maps
gulp.task('sass', function () {
    return gulp.src('sources/css/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/.tmp'));
});

// Compiles js files along with source maps
gulp.task('babelJs', function () {
    return gulp.src('sources/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/.tmp'))
        .pipe(browserSync.stream());
});

// Copy libraries
gulp.task('copyLibs', ['cleanLibs'], function () {
    var libs = gulp.src([
            'bower_components/requirejs/require.js',
            'bower_components/jquery/dist/jquery{,*}.{js,map}',
            'bower_components/fullpage.js/jquery.fullPage{,*}.{css,js}',
            'bower_components/bootstrap/dist/css/bootstrap{,*}.{css,map}',
            'bower_components/bootstrap/dist/js/bootstrap{,*}.{js,map}',
            'bower_components/animate.css/animate{,*}.css'
        ])
        .pipe(gulp.dest('public/libs'));

    var bootstrap = gulp.src([
            'bower_components/bootstrap/scss/**'
        ])
        .pipe(gulp.dest('sources/css/bootstrap'));

    return merge(libs, bootstrap)
        .pipe(browserSync.stream());
});

// Coping index
gulp.task('copyIndex', function () {
    return gulp.src('sources/index.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

// Coping images
gulp.task('copyImages', ['cleanImages'], function () {
    return gulp.src(['sources/images/**'])
        .pipe(gulp.dest('public/images'))
        .pipe(browserSync.stream());
});

// Coping fonts
gulp.task('copyFonts', ['cleanFonts'], function () {
    return gulp.src(['sources/fonts/**'])
        .pipe(gulp.dest('public/fonts'))
        .pipe(browserSync.stream());
});

// Concatinating css files
gulp.task('concatCss', ['cleanCss', 'sass'], function () {
    return gulp.src([
        'sources/css/fonts/icomoon.css',
        'public/.tmp/*.css',
        'public/libs/animate.css',
        'public/libs/jquery.fullPage.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

// Concatinating js files
gulp.task('requireJs', ['cleanJs', 'babelJs'], function () {
    return gulp.src('public/.tmp/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(requirejsOptimize({
            baseUrl: "public/.tmp",
            mainConfigFile: "public/.tmp/config.js",
            name: "main",
            out: "main.js",
            optimize: "uglify2",
            generateSourceMaps: true,
            preserveLicenseComments: false,
            useSourceUrl: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream());
});

// Watch
gulp.task('watch', function () {
    // watch html and reload browsers when it changes
    gulp.watch('sources/index.html', ['copyIndex']);
    // do the same with the sass files
    gulp.watch(['sources/css/**/*.sass', 'sources/css/**/*.css'], ['concatCss']);
    // and js files
    gulp.watch('sources/js/**/*.js', ['requireJs']);
});

// Static server with watch task
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });

    gulp.start('watch');
});

gulp.task('build', ['copyLibs'], function () {
    gulp.start('copyIndex', 'copyImages', 'copyFonts', 'concatCss', 'requireJs');
});
gulp.task('default', ['server']);