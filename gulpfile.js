//http://getinstance.info/articles/tools/9-gulp-plugins/
//http://pugofka.com/blog/technology/the-prepared-starting-package-front-end-development-on-gulp/

// Load plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),// встроенные утилиты gulp
    filesize = require('gulp-filesize'),
    sass = require('gulp-sass'),// компиляция файла sass в css
    autoprefixer = require('gulp-autoprefixer'),//делает css кросбраузерным
    cleanCSS = require('gulp-clean-css'),//чистит css
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),//Сжимает фото
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),//Удаляет файлы и папки.
    concat = require('gulp-concat'),//Объединяет js файлы в один
    notify = require('gulp-notify'),
    cache = require('gulp-cache'), // Кеш на сервере
    livereload = require('gulp-livereload');// живая перезагрузка

var rootDir = '.';
var sourceDir = rootDir + '/assets'; // здесь хранятся все исходники
var destDir = rootDir + '/web/assets'; // здесь хранится все на выходе

// Styles
gulp.task('styles', function() { // создаем новую таску для gulp
    return gulp.src(sourceDir+'/media/css/*.sass')//указываем путь к файлам
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(sourceDir+'/media/css/'))//куда пишем результат обработк
        .pipe(filesize())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(livereload())
        .pipe(gulp.dest(sourceDir+'/media/css/'))
        .pipe(filesize())
        //.pipe(notify({ message: 'Styles task complete' }))
        .on('error', gutil.log);
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(sourceDir+'/media/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        //.pipe(concat('main.js'))
        //.pipe(gulp.dest(sourceDir+'/media/js/'))
        //.pipe(filesize())
        //.pipe(rename({ suffix: '.min' }))
        //.pipe(uglify())
        .pipe(livereload())
        //.pipe(gulp.dest(sourceDir+'/media/js/'))
        //.pipe(filesize())
        //.pipe(notify({ message: 'Scripts task complete' }))
        .on('error', gutil.log);
});

// Images
gulp.task('images', function() {
    return gulp.src(sourceDir+'/media/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(livereload())
        .pipe(gulp.dest(sourceDir+'/media/images/'))
        .pipe(filesize())
        //.pipe(notify({ message: 'Images task complete' }))
        .on('error', gutil.log);
});

gulp.task('index:reload', function () {
   return gulp.src('')
       .pipe(livereload())
       .on('error', gutil.log);
});

// Clean distribution folder
gulp.task('clean', function() {
    return gulp.src([destDir+'/media/css', destDir+'/media/js', destDir+'/media/images'], {read: false})
        .pipe(clean())
        .on('error', gutil.log);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.run('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

    // Listen on port 35729
    livereload.listen(35729, function (err) {
        if (err) {
            return console.log(err)
        }

        // Watch .scss files
        gulp.watch(sourceDir+'/media/css/**/*.sass', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('styles');
        });

        // Watch .js files
        gulp.watch(sourceDir+'/media/js/**/*.js', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('scripts');
        });

        // Watch image files
        gulp.watch(sourceDir+'/media/images/**/*', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('images');
        });

        gulp.watch(sourceDir+'/index.html', function () {
           gulp.run('index:reload');
        });

    });
});