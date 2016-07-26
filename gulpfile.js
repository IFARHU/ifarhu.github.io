var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    minify = require('gulp-minify-css');
    uglify  = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    convert = require('gulp-sass'),
    bower = require('gulp-bower');
    
var config = {
     sassPath: './assets/css/',
    siteCSS: '._site/assets/css/'
};

gulp.task('bower', function () { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + 'main.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 config.sassPath
             ]
         }) 
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }))) 
         .pipe(gulp.dest('.')); 
});

// Rerun the task when a file changes
 gulp.task('watch', function () {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['css']);