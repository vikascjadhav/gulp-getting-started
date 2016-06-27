// Include gulp
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var notify = require('gulp-notify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var size     = require('gulp-size');
// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});



// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./src/css/*.css'])
    .pipe(rename({suffix: '-all-min'}))	
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('minifyimages', function() {
  return gulp.src(['src/css/img/*.jpg'])
    .pipe(imagemin({ optimizationLevel: 3, progessive: true, interlaced: true}))
    .pipe(gulp.dest('./dist/css/img'))
    .pipe(size());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename({suffix:'-all-min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});



// minify new or changed HTML pages
gulp.task('htmlminify', function() {
  var htmlSrc = './src/*.html',
      htmlDst = './dist';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});
// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/css/*.css',['styles']);
    gulp.watch('src/*.html',['htmlminify']);
});

// Default Task
//gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);

gulp.task('default', ['styles','lint', 'scripts','htmlminify','watch','minifyimages']);

