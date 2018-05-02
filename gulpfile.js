const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify =require('gulp-uglify');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const debug = require('gulp-debug');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });
});

gulp.task('js', () => {
  gulp.src('./src/js/main.js')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(debug({title: 'JavaScript:'}))
    .pipe(browserSync.stream());
});

gulp.task('css', () => {
  gulp.src('./src/stylus/**/!(_)*.styl')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(stylus({'include css': true}))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build/css'))
    .pipe(debug({title: 'Stylus:'}))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  gulp.src('./src/pug/**/!(_)*.pug')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(debug({title: 'Pug:'}))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
  gulp.src('./src/images/**/*.*')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(imagemin({
      optimizationLevel: 5,
    }))
    .pipe(gulp.dest('./build/images'))
    .pipe(debug({title: 'images:'}))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  watch('./src/js/**/*.*', () => {gulp.start('js'); browserSync.reload()});
  watch('./src/stylus/**/*.*', () => {gulp.start('css'); browserSync.reload()});
  watch('./src/pug/**/*.*', () => {gulp.start('html'); browserSync.reload()});
  watch('./src/fonts/**/*.*', () => {gulp.start('fonts'); browserSync.reload()});
  watch('./src/images/**/*.*', () => {gulp.start('imges'); browserSync.reload()});
  watch('./src/vendor/**/*.*', () => {gulp.start('vendor'); browserSync.reload()});
})

gulp.task('fonts', () => gulp.src('./src/fonts/**/*.*').pipe(gulp.dest('./build/fonts')));
gulp.task('vendor', () => gulp.src('./src/vendor/**/*.*').pipe(gulp.dest('./build/vendor')));

gulp.task('default', ['js', 'css', 'html', 'fonts', 'vendor', 'images', 'browser-sync', 'watch']);
gulp.task('build', ['js', 'css', 'html', 'fonts', 'vendor', 'images']);
