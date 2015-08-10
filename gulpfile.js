var gulp = require('gulp');
var concat = require('gulp-concat');

var paths = {
    headScripts: [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular/angular.min.js'
    ],
    bodyScripts: [
        './bower_components/angular-resource/angular-resource.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './bower_components/materialize/dist/js/materialize.min.js',
        './public/js/init/materialize-nav.js',
        './bower_components/d3/d3.js',
        './public/js/d3/*.js',
        './public/js/angular/dashboard.js',
        './public/js/angular/projects.js'
    ],
    stylesheets: ['./bower_components/materialize/dist/css/materialize.min.css', './public/css/partials/*.css']
}


gulp.task('styles', function(){
    gulp.src(paths.stylesheets)
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('head-scripts', function(){
    gulp.src(paths.headScripts)
    .pipe(concat('head-scripts.js'))
    .pipe(gulp.dest('./public/js/build'));
});

gulp.task('body-scripts', function(){
    gulp.src(paths.bodyScripts)
    .pipe(concat('body-scripts.js'))
    .pipe(gulp.dest('./public/js/build'));
});

gulp.task('watch', function() {
  gulp.watch('./public/css/partials/*.css', ['styles']);
  gulp.watch('./public/js/body/*.js', ['body-scripts']);
});

gulp.task('default', ['styles', 'head-scripts', 'body-scripts']);