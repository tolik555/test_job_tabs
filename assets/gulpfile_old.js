/**
 * Created by ktolik on 07.04.2017.
 */
'use strict';

var gulp = require('gulp'),
    //watch = require('gulp-watch'),
    sass  = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename');

//     +--------------+
//     | Action task. |
//     +--------------+

gulp.task('action', function () {

    gulp.src('./media/css/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            //Autoprefixer options
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./media/css/'))
        .pipe(cleanCSS({
            //Clean CSS options
            compatibility: 'ie8'
        }))
        .pipe(rename({
            //Minimized version reaming options
            suffix: '.min'
        }))
        .pipe(gulp.dest('./media/css/'))
        .pipe(livereload());

});

// +--------------+
// | Default task |
// +--------------+

gulp.task('default', function () {
    livereload();
    gulp.watch('./media/css/*.sass', ['action']);
});