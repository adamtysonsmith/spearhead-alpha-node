var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('styles', function(){
    gulp.src(['./bower_components/materialize/dist/css/materialize.min.css', './public/css/global.css'])
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['styles']);