var gulp = require('gulp');
var concat = require('gulp-concat');

var paths = {
    headScripts: [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-resource/angular-resource.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './public/js/app.js'
    ],
    bodyScripts: [
        './bower_components/materialize/dist/js/materialize.min.js',
        './bower_components/angular-materialize/src/angular-materialize.js',
        './public/js/materialize-nav.js'
    ],
    stylesheets: ['./bower_components/materialize/dist/css/materialize.min.css', './public/css/partials/*.css']
}


gulp.task('styles', function(){
    gulp.src(paths.stylesheets)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('head-scripts', function(){
    gulp.src(paths.headScripts)
    .pipe(concat('head-scripts.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('body-scripts', function(){
    gulp.src(paths.bodyScripts)
    .pipe(concat('body-scripts.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['styles', 'head-scripts', 'body-scripts']);