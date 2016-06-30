var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    newVer;

/**
 * Use gulp's rjs to minfiy / combine the require config file
 */


gulp.task('clean', function() {
    var clean = require('gulp-clean');

    return gulp.src('app/dist')
        .pipe(clean());
});

gulp.task('build-minify', ['build-files-require'], function(){
     var rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        header = require('gulp-header'),
        pkg = require('./package.json'),
        banner = ['/**',
            ' * <%= pkg.name %> - <%= pkg.description %>',
            ' * @version v' + (newVer ? newVer : '<%= pkg.version %>'),
            ' * @link <%= pkg.homepage %>',
            ' * @license <%= pkg.license %>',
            ' * @author <%= pkg.author %>',
            ' */',
            ''].join('\n');
             return gulp.src([
            'dist/ocLazyLoad.js',
            'dist/ocLazyLoad.require.js'
        ])
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-files-require', ['build-files'], function() {
    var rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        header = require('gulp-header'),
        babel = require('gulp-babel'),
        ngAnnotate = require('gulp-ng-annotate'),
        pkg = require('./package.json'),
        concat = require('gulp-concat'),
        banner = ['/**',
            ' * <%= pkg.name %> - <%= pkg.description %>',
            ' * @version v' + (newVer ? newVer : '<%= pkg.version %>'),
            ' * @link <%= pkg.homepage %>',
            ' * @license <%= pkg.license %>',
            ' * @author <%= pkg.author %>',
            ' */',
            ''].join('\n');

    return gulp.src([
            'app/components/oclazyload/dist/ocLazyLoad.js',
            'resources/core/ocLazyLoad.js'
        ])
        .pipe(babel({ blacklist: ["strict"] }))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/modules'))
        .pipe(concat('ocLazyLoad.require.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('dist'));
});
gulp.task('build-files', ['clean'], function() {
    var rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        header = require('gulp-header'),
        babel = require('gulp-babel'),
        ngAnnotate = require('gulp-ng-annotate'),
        pkg = require('./package.json'),
        concat = require('gulp-concat'),
        banner = ['/**',
            ' * <%= pkg.name %> - <%= pkg.description %>',
            ' * @version v' + (newVer ? newVer : '<%= pkg.version %>'),
            ' * @link <%= pkg.homepage %>',
            ' * @license <%= pkg.license %>',
            ' * @author <%= pkg.author %>',
            ' */',
            ''].join('\n');

    return gulp.src([
            'app/components/angular/angular.js',
            'app/components/angular-ui-router/release/angular-ui-router.js',
            'app/components/boostrap/dist/js/bootstrap.js',
            'app/components/domReady/domReady.js',
            'app/components/lodash/lodash.core.js',
            'app/components/lodash/lodash.js',
            //'app/components/oclazyload/dist/ocLazyLoad.js',
            'resources/core/ocLazyLoad.js',
            'app/app.js',
            'bootstrap.js',
            'config.js',
            'main.js'
        ])
        .pipe(babel({ blacklist: ["strict"] }))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/modules'))
        .pipe(concat('ocLazyLoad.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('dist'));
});

gulp.task('combine', ['clean'], function(){
    var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    banner = ['/**',
            ' * <%= pkg.name %> - <%= pkg.description %>',
            ' * @version v' + (newVer ? newVer : '<%= pkg.version %>'),
            ' * @link <%= pkg.homepage %>',
            ' * @license <%= pkg.license %>',
            ' * @author <%= pkg.author %>',
            ' */',
            ''].join('\n');
    return gulp.src([
            //'app/components/angular/angular.js',
           // 'app/components/requirejs/require.js',
           // 'app/components/angular-ui-router/release/angular-ui-router.js',
            'app/components/domReady/domReady.js',
            //'app/components/oclazyload/dist/ocLazyLoad.js',
            //'app/resources/core/ocLazyLoad.js'
        ])
        .pipe(concat('combined_js.js'))
        .pipe(gulp.dest('./app/dist/'))
    });
gulp.task('minify', ['clean', 'combine'], function(){
    var minify = require('gulp-minify');
    return gulp.src('app/dist/combined_js.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: 'min.js'
            }
        }))
        .pipe(gulp.dest('./app/dist/minified/'))
});

gulp.task('minify-required-files', function(){
    var amdOptimize = require('amd-optimize');
    var concat = require('gulp-concat');
 return gulp.src('./app/views/requireMinifiedLazy/main.js')
        .pipe(amdOptimize('main'))
        .pipe(concat('main-bundle.js'))
	    .pipe(gulp.dest('./dist2'));
});

gulp.task('bundle', [], function(){
    var minify = require('gulp-minify');
    var concat = require('gulp-concat');
    var flatmap = require('gulp-flatmap');
     var destination = "";
    gulp.src('app/views/**/bundle/*.js', {base: 'app/views/'})
                                .pipe(
                                    flatmap(function(stream, file){
                                       
                                        var bundleCharLength = "bundle".length;
                                        destination = file.path.slice(0, file.path.lastIndexOf('/'));
                                        destination = destination.slice(0, destination.lastIndexOf('/'));
                                        destination = destination.slice(destination.lastIndexOf('/') + 1, destination.length);
                                        return stream
                                            .pipe(concat('concat.js'))
                                            .pipe(minify({
                                                        ext: {
                                                           // src: '-debug.js',
                                                            min: 'min.js'
                                                        }
                                                    }))
                                            
                                    })
                                    
                                )
                                .pipe(gulp.dest(function(file){
                                                var destPath = './app/views/' + destination + '/bundle/dist/';
                                                return destPath;
                                            }));
                                
})

var path = require('path');
var folders = require('gulp-folders');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
gulp.task('folders', folders('app/views/', function(folder){
    var destination = path.join('app/views', folder, '/bundle/*.js');
    return gulp.src(destination)
        .pipe(concat('concat.js'))
        .pipe(minify({
            ext: {
               // src: '-debug.js',
                min: 'min.js'
            }
        }))
        .pipe(gulp.dest(path.join('app/views', folder, '/bundle/build/')))
}));
