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
        './bower_components/angular-animate/angular-animate.min.js',
        './bower_components/angular-aria/angular-aria.min.js',
        './bower_components/angular-material/angular-material.min.js',
        './bower_components/angular-xeditable/dist/js/xeditable.min.js',
        './bower_components/d3/d3.js',
        './public/js/d3/*.js',
        './public/js/angular/app.js',
        './public/js/angular/**/*.js'
    ],
    stylesheets: [
        './bower_components/angular-material/angular-material.min.css',
        './bower_components/angular-xeditable/dist/css/xeditable.css',
        './public/css/partials/*.css'     
    ]
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
  gulp.watch('./public/js/angular/**/*.js', ['body-scripts']);
});

gulp.task('default', ['styles', 'head-scripts', 'body-scripts']);