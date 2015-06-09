var gulp = require('gulp'),
    ngHtml2Js = require('gulp-ng-html2js'),
    minifyHtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    concat = require('gulp-concat'),
    elixir = require('laravel-elixir'),
    utilities = require('laravel-elixir/ingredients/commands/Utilities'),
    _  = require('underscore');

elixir.extend('ngHtml2Js', function(src, output, options) {

    var assetsDir = this.assetsDir + 'partials/';

    var defaultOptions = {
        moduleName: 'partialsModule',
        prefix : ''
    };

    options = _.extend(defaultOptions, options);
    src = './' + utilities.buildGulpSrc(src, assetsDir, '**/*.{htm,html}');

    gulp.task('ngHtml2Js', function() {
        return gulp.src(src)
            .pipe(gulpIf(elixir.config.production, minifyHtml({
                empty: true,
                spare: true,
                quotes: true,
            })))
            .pipe(ngHtml2Js(options))
            .pipe(concat('partials.js'))
            .pipe(gulpIf(elixir.config.production, uglify()))
            .pipe(gulp.dest(output || elixir.config.assetsDir + 'js/'));
    });

    this.registerWatcher('ngHtml2Js', assetsDir + '/**/*.{htm,html}');

    return this.queueTask('ngHtml2Js');
});
