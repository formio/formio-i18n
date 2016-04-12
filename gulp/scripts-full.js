module.exports = function(gulp, plugins) {
    return function() {
        return plugins.browserify({
                entries: './src/formio-translate-full.js'
            })
            .bundle()
            .pipe(plugins.source('ng-formio-translate-full.js'))
            .pipe(gulp.dest('dist/'))
            //.pipe(plugins.rename('ng-formio-translate-full.min.js'))
            .pipe(plugins.streamify(plugins.uglify()));
            //.pipe(gulp.dest('dist/'));
    };
};