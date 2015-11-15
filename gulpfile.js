
'use strict';

var conf = require('./frontend/gulp/config')();
var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var includeSources = require('gulp-include-source');
var less = require('gulp-less');
var path = require('path');
var del = require('del');
var inlineAngularTemplates = require('gulp-inline-angular-templates');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var eslint = require('gulp-eslint');
var flatten = require('gulp-flatten');
var autoprefixer = require('gulp-autoprefixer');
var cdnizer = require("gulp-cdnizer");
var fs = require('fs');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;

if (process.env.NODE_ENV !== 'production') {
  var browserSync = require('browser-sync').create();
  var historyApiFallback = require('connect-history-api-fallback');
  gulp.task('server:dev', ['includeSourcesLessDev'], function() {
    browserSync.init({
        server: {
          baseDir: [
            conf.TEMP_FOLDER,
            conf.SRC_FOLDER,
            conf.FILES_FOLDER,
            conf.BOWER_FOLDER + 'bootstrap',
            conf.BOWER_FOLDER + 'font-awesome',
            conf.BOWER_FOLDER + 'simple-line-icons'
          ],
          middleware: [historyApiFallback()]
        },
        open: false,
        port: 8080,
        ui: {
          port: 8081
        }
    });
    gulp.watch(conf.MODULES_FOLDER + '**/*.html', browserSync.reload);
    gulp.watch(conf.SRC_FOLDER + 'index.html', ['includeSourcesDev', browserSync.reload]);
    gulp.watch('bower.json', ['includeSourcesDev', browserSync.reload]);
    gulp.watch(conf.MODULES_FOLDER + '**/*.js', ['includeSourcesDev', browserSync.reload]);
    gulp.watch(conf.LESS_FOLDER + '**/*.less').on('change', function(event){
      if (event.type == 'changed') {
        var p = event.path.split(conf.LESS_FOLDER)[1];
        lessCompileStream(event.path, conf.TEMP_CSS_FOLDER + p.substr(0, p.lastIndexOf('/')))();
      } else {
        runSequence('includeSourcesLessMainDev', browserSync.stream());
      }
    });
    gulp.watch([conf.MODULES_FOLDER + '**/*.less']).on('change', function(event){
      if (event.type == 'changed') {
        var p = event.path.split(conf.MODULES_FOLDER)[1];
        lessCompileStream(event.path, conf.TEMP_CSS_FOLDER + p.substr(0, p.lastIndexOf('/')))();
      } else {
        runSequence('includeSourcesLessModulesDev', browserSync.stream());
      }
    });
  });
}

var environmentName = 'local';
if (argv.environment) {
  environmentName = argv.environment;
}

function injectSources() {
  return gulp.src(conf.SRC_FOLDER + 'index.html')
    .pipe(includeSources())
    .pipe(wiredep({
      exclude: [
        conf.BOWER_FOLDER + 'angular-swagger-ui/dist/css/swagger-ui.min.css',
        conf.BOWER_FOLDER + 'font-awesome/*',
        conf.BOWER_FOLDER + 'bootstrap/*',
        conf.BOWER_FOLDER + 'bootswatch/*',
        conf.BOWER_FOLDER + 'simple-line-icons/*'
      ]
    }))
    .pipe(gulp.dest(conf.TEMP_FOLDER));
}

function environment(env) {
   return function(){
     fs.writeFile(
      conf.MODULES_FOLDER + conf.ANGULAR_APP_NAME + '/config/environment.js',
      [
        "/* This file is automatically generated by gulp. */",
        "(function() {",
        "  'use strict';",
        "",
        "  angular",
        "  .module('" + conf.ANGULAR_APP_NAME + "')",
        "  .constant('" + conf.ANGULAR_APP_NAME + ".config.environment',",
        JSON.stringify(
          require('./' + conf.ENVIRONMENTS_FOLDER + env), null, 2) + ');',
        "",
        "})();",
        ""
      ].join('\n')
    );
   };
}

function lessCompile(pathArray, dest) {
  return function() {
    return gulp.src(pathArray)
      .pipe(less({
        paths: [
          path.join(__dirname, conf.LESS_FOLDER),
          path.join(__dirname, conf.BOWER_FOLDER)
          ]
      }))
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest(dest));
  };
}

function lessCompileCDN(pathArray, dest) {
  return function() {
    return lessCompile(pathArray, dest)()
      .pipe(cdnizer({
          defaultCDNBase: conf.CDN_URL,
          files: ['**/*.{gif,png,jpg,jpeg, ttf,woff,woff2,eof,svg}']
      }))
      .pipe(gulp.dest(dest));
  };
}

function lessCompileStream(pathArray, dest) {
  return function(){
    return lessCompile(pathArray, dest)()
      .pipe(browserSync.reload({stream: true}));
  };
}

function clean(pathArray) {
  return function(callback) {
    return del(pathArray, callback);
  };
}

function copy(pathArray, dest) {
  return function() {
    return gulp.src(pathArray)
      .pipe(gulp.dest(dest));
  };
}

function copyAndFlatten(pathArray, dest) {
  return function() {
    return gulp.src(pathArray)
      .pipe(flatten())
      .pipe(gulp.dest(dest));
  };
}

function lint(pathArray, options) {
  return function() {
    return gulp.src(pathArray)
      .pipe(eslint(options))
      .pipe(eslint.formatEach('compact', process.stderr));
  };
}

gulp.task('environment', environment(environmentName));

gulp.task('includeSourcesDev', injectSources);

gulp.task('includeSourcesLessDev', ['less', 'environment'], injectSources);

gulp.task('includeSourcesDist', ['lessCDN', 'environment'], injectSources);

gulp.task('includeSourcesLessModulesDev', ['lessModulesDev'], injectSources);

gulp.task('includeSourcesLessMainDev', ['lessMainDev'], injectSources);

gulp.task('less', ['clean:dev'], lessCompile([conf.LESS_FOLDER + '**/*.less', conf.MODULES_FOLDER + '**/*.less'], conf.TEMP_CSS_FOLDER));

gulp.task('lessCDN', ['clean:dev'], lessCompileCDN([conf.LESS_FOLDER + '**/*.less', conf.MODULES_FOLDER + '**/*.less'], conf.TEMP_CSS_FOLDER));

gulp.task('lessModulesDev', ['clean:lessModulesDev'], lessCompileStream(conf.MODULES_FOLDER + '**/*.less', conf.TEMP_CSS_FOLDER));

gulp.task('lessMainDev', ['clean:lessMainDev'], lessCompileStream(conf.LESS_FOLDER + '**/*.less', conf.TEMP_CSS_FOLDER));

gulp.task('clean:dev', clean(conf.TEMP_FOLDER + '**'));

gulp.task('clean:lessModulesDev', clean(conf.TEMP_CSS_FOLDER + '*/'));

gulp.task('clean:lessMainDev', clean(conf.TEMP_CSS_FOLDER + '*.css'));

gulp.task('clean:dist', clean(conf.DIST_FOLDER + '**'));

gulp.task('dist', ['angularTemplates', 'copyAssets']);

gulp.task('copyBowerFontsDist', ['clean:dist'],
  copyAndFlatten([
    conf.BOWER_FOLDER + 'bootstrap/fonts/*.{ttf,woff,woff2,eof,svg}',
    conf.BOWER_FOLDER + 'font-awesome/fonts/*.{ttf,woff,woff2,eof,svg}',
    conf.BOWER_FOLDER + 'simple-line-icons/fonts/*.{ttf,eot,woff,woff2,eof,svg}',
    conf.BOWER_FOLDER + 'slick-carousel/slick/fonts/*.{ttf,eot,woff,woff2,eof,svg}'
  ], conf.FONTS_DIST_FOLDER));

gulp.task('copyFontsDist', ['clean:dist'], copy(conf.FONTS_FOLDER + '**/*', conf.FONTS_DIST_FOLDER));

gulp.task('copyImagesDist', ['clean:dist'], copy(conf.IMAGES_FOLDER + '**', conf.IMAGES_DIST_FOLDER));

gulp.task('copyFaviconDist', ['clean:dist'], copy(conf.FILES_FOLDER + 'favicon.ico', conf.DIST_FOLDER));

gulp.task('copyAssets', ['copyFontsDist', 'copyBowerFontsDist', 'copyImagesDist', 'copyFaviconDist']);

gulp.task('angularTemplates', ['clean:dist', 'includeSourcesDist'], function () {
  return gulp.src(conf.MODULES_FOLDER + '*/templates/**/*.html')
    .pipe(inlineAngularTemplates(conf.TEMP_FOLDER + 'index.html', {
       base: conf.SRC_FOLDER,
       prefix: '',
       selector: 'body',
       method: 'prepend'
     }))
    .pipe(usemin({
      html: [minifyHtml({empty: true})],
      assetsDir: conf.SRC_FOLDER,
      css: [minifyCss({processImport: false, keepSpecialComments: 0}), rev()],
      js: [uglify({
        mangle: true
      }), rev()]
    }))
    .pipe(cdnizer({
          defaultCDNBase: conf.CDN_URL,
          allowRev: true,
          allowMin: true,
          files: [
            'js/**/*.js',
            'css/**/*.css',
            'img/**/*.{gif,png,jpg,jpeg, ttf,woff,woff2,eof,svg}'
          ]
    }))
    .pipe(gulp.dest(conf.DIST_FOLDER));
});

gulp.task('lint-browser-js', lint(
  [conf.MODULES_FOLDER + '**/*.js', '!' + conf.MODULES_FOLDER + conf.ANGULAR_APP_NAME +  '/config/environment.js'],
  {globals: {'angular': true}, envs: ['browser']}
));

gulp.task('lint', ['lint-browser-js']);

gulp.task('default', ['server:dev']);
