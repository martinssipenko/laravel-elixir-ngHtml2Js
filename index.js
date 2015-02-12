var gulp = require('gulp'),
    ngHtml2Js = require('gulp-ng-html2js'),
    concat = require('gulp-concat'),
    elixir = require('laravel-elixir'),
    utilities = require('laravel-elixir/ingredients/commands/Utilities'),
    _  = require('underscore');

elixir.extend('ngHtml2Js', function(src, output, options) {

    var assetsDir = this.assetsDir + 'partials/';

    var defaultOptions = {
        moduleName: 'partialsModule',
        prefix : '/partials'
    };

    options = _.extend(defaultOptions, options);
    src = './' + utilities.buildGulpSrc(src, assetsDir, '**/.html');

    gulp.task('ngHtml2Js', function() {
        return gulp.src(src)
            .pipe(ngHtml2Js(options))
            .pipe(concat('partials.js'))
            .pipe(gulp.dest(output || elixir.config.assetsDir + 'js/'));
    });

    this.registerWatcher('ngHtml2Js', assetsDir + '/**/*.html');

    return this.queueTask('ngHtml2Js');
});
