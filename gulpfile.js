'use strict';

// Load plugins
var autoprefixer = require('autoprefixer'),
  browsersync = require('browser-sync').create(),
  cssnano = require('cssnano'),
  del = require('del'),
  eslint = require('gulp-eslint'),
  gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  newer = require('gulp-newer'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass');

var paths = {
  root: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  styles: {
    src: 'src/stylesheets/*.scss',
    dest: 'dist/stylesheets/'
  },
  images: {
    src: 'src/assets/images/**/*',
    dest: 'dist/assets/images'
  },
  fonts: {
    src: 'src/assets/fonts/**/*',
    dest: 'dist/assets/fonts'
  },
  javascripts:{
    src: 'src/javascripts/**/*',
    dest: 'dist/javascripts/'
  }
};

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './dist/'
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(['./dist/assets/']);
}

// Optimize Images
function images() {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest(paths.images.dest));
}

//fonts task
function fonts(){
  return gulp
    .src(paths.fonts.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browsersync.stream());
}

// CSS task
function css() {
  return gulp
    .src(paths.styles.src)
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream());
}

//HTML task
function html(){
  return gulp
    .src(paths.root.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.root.dest))
    .pipe(browsersync.stream());
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src([paths.javascripts.src, './gulpfile.js'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src([paths.javascripts.src])
      .pipe(plumber())
      .pipe(gulp.dest(paths.javascripts.dest))
      .pipe(browsersync.stream())
  );
}

// Watch files
function watchFiles() {
  gulp.watch(paths.root.src, html);
  gulp.watch(paths.styles.src, css);
  gulp.watch(paths.javascripts.src, gulp.series(scriptsLint, scripts));
  gulp.watch(
    [
      './_vendor/**/*'
    ],
    gulp.series(browserSyncReload)
  );
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.fonts.src, fonts);
}

// define complex tasks
var js = gulp.series(scriptsLint, scripts);
var build = gulp.series(clean, gulp.parallel(css, html, images, fonts, js));
var watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;