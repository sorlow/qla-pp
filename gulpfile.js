var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');
var browserSync = require('browser-sync').create();

// Clening public folder
gulp.task('cleanCss', function () {
    return del(['build/css', 'public/css']);
});
gulp.task('cleanJs', function () {
    return del(['public/js']);
});

// Compiles sass files along with source maps
gulp.task('sass', function () {
    return gulp.src('src/css/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'));
});

// Compiles js files along with source maps
gulp.task('babelJs', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream());
});

// Coping index
gulp.task('copyIndex', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

// Concatinating css files
gulp.task('concatCss', ['cleanCss', 'sass'], function () {
    return gulp.src([
        'bower_components/normalize-css/normalize.css',
        'build/css/*.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'public'
        },
    });

    // watch html and reload browsers when it changes
    gulp.watch('src/index.html', ['copyIndex']);
    // do the same with the sass files
    gulp.watch('src/css/**/*.sass', ['concatCss']);
    // and js files
    gulp.watch('src/js/**/*.js', ['babelJs']);
});

gulp.task('default', ['server']);