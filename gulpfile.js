var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    rootJsPath = './src/',
    rootCssPath = './css/';

gulp.task('stylesheets', function () {
    gulp.src([
            rootCssPath + 'bootstrap.css',
            rootCssPath + 'font-awesome.css',
            rootCssPath + 'project.css'])
        .pipe(concat("all.css"))
        .pipe(minifyCSS({removeEmpty: true}))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('scripts', function () {
    gulp.src([
            rootJsPath + 'vendor/jquery/dist/jquery.js',
            rootJsPath + 'vendor/bootstrap/dist/js/bootstrap.js',
            rootJsPath + 'vendor/gauge.js/dist/gauge.min.js',
            rootJsPath + 'vendor/underscore/underscore.js',
            rootJsPath + 'vendor/backbone/backbone.js',
            rootJsPath + 'vendor/backbone/backbone.js',
            rootJsPath + 'lib/*.js',
            rootJsPath + 'app/**/*.js',
            rootJsPath + 'app/**/**/*.js',
            rootJsPath + 'application.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['stylesheets', 'scripts']);