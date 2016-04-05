var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var vinylPaths = require('vinyl-paths');
plugins.source = require('vinyl-source-stream');
plugins.browserify = require('browserify');

// Clean the dist folder.
gulp.task('clean', function() {
  return gulp.src('dist').pipe(vinylPaths(del));
});

var bundle = plugins.browserify({
  entries: './src/formio-translate.js',
  debug: true
});

// Wire the dependencies into index.html
gulp.task('scripts', function() {
  return bundle
    .bundle()
    .pipe(plugins.source('formio-translate.js'))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.rename('formio-translate.min.js'))
    .pipe(plugins.streamify(plugins.uglify()))
    .pipe(gulp.dest('dist'));
});

// Define the build task.
gulp.task('build', ['clean', 'scripts']);