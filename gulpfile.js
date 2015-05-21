var gulp = require("gulp");
var ngAnnotate = require('gulp-ng-annotate');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var plumber = require('gulp-plumber');

var path = {
  js: ['./app/assets/**/*.js'],
  template: ['./app/assets/**/*.tpl.html'],
  watch: ['app/assets/**/*.*']
};

gulp.task('js:compile', function () {
  gulp.src(path.js)
      .pipe(plumber())
      .pipe(ngAnnotate())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('js:minifyCompile', function () {
  gulp.src(path.js)
      .pipe(plumber())
      .pipe(ngAnnotate())
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('template:compile', function () {
  gulp.src(path.template)
      .pipe(plumber())
      .pipe(ngHtml2Js({
        moduleName: 'app.tpl',
        prefix: '/'
      }))
      .pipe(concat('app.tpl.js'))
      .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('template:minifyCompile', function () {
  gulp.src(path.template)
      .pipe(plumber())
      .pipe(minifyHtml({
        empty: true,
        space: true,
        quotes: true
      }))
      .pipe(ngHtml2Js({
        moduleName: 'app.tpl',
        prefix: '/'
      }))
      .pipe(concat('app.tpl.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('default', function () {
  gulp.run(['js:compile', 'js:minifyCompile', 'template:compile', 'template:minifyCompile']);
  gulp.watch(path.watch, ['js:compile', 'js:minifyCompile', 'template:compile', 'template:minifyCompile']);
});
