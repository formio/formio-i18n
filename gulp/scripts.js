var path = require('path');
module.exports = function(gulp, plugins) {

  return function() {
    var bundle = plugins.browserify({
      entries: './src/formio-translate.js',
      debug: false
    });

    return bundle
      .bundle()
      .pipe(plugins.source('ng-formio-translate.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('ng-formio-translate.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'))
      .on('error', function(err){
        console.log(err);
        this.emit('end');
      });
  };
};
