const gulp = require('gulp');
const sassCompiler = require('sass');
const gulpSass = require('gulp-sass')(sassCompiler);
const sourcemap = require('gulp-sourcemaps');
const browser = require('browser-sync').create();
const connectSSI = require('connect-ssi');
const reload = browser.reload;
const del = require('del');
const ssi = require('gulp-ssi');
const autoprefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

const src = './src';
const dist = './dist';

const path = {
  main: src,
  scssEntry: `${src}/resource/scss/output.scss`,
  scssWatch: `${src}/resource/scss/**/*.scss`,
  css: `${src}/resource/css`,
  js: `${src}/resource/js/**/*.js`,
  images: `${src}/resource/img/**/*.{jpg,jpeg,png,gif,svg,webp,ico}`,
  font: `${src}/resource/fonts/**/*.{otf,woff,woff2}`,
  html: [`${src}/**/*.html`, `!${src}/components/**/*.html`],
};

const clean = () => del([dist]);

/* =========================
   DEV SCSS (최속)
========================= */
gulp.task('sass', () => {
  return gulp
    .src(path.scssEntry)
    .pipe(gulpSass({ outputStyle: 'expanded' }).on('error', gulpSass.logError))
    .pipe(gulp.dest(path.css))
    .pipe(browser.stream({ match: '**/*.css' }));
});

/* =========================
   SERVER (DEV)
========================= */
gulp.task('serv', () => {
  browser.init({
    server: {
      baseDir: path.main,
      middleware: [
        connectSSI({
          baseDir: __dirname + '/src/',
          ext: '.html',
        }),
      ],
    },
  });

  gulp.watch(path.scssWatch, gulp.series('sass'));
  gulp.watch(path.js).on('change', reload);
  gulp.watch(path.images).on('change', reload); // ✅ 압축 없음
  gulp.watch(path.html).on('change', reload);
});

/* =========================
   BUILD TASKS
========================= */
const html = () =>
  gulp
    .src(path.html)
    .pipe(ssi({ root: path.main }))
    .pipe(gulp.dest(dist));

const imageBuild = () =>
  gulp
    .src(path.images)
    .pipe(imagemin()) // ✅ 빌드에서만
    .pipe(gulp.dest(`${dist}/resource/img`));

const fonts = () =>
  gulp.src(path.font).pipe(gulp.dest(`${dist}/resource/fonts`));

const sassBuild = () =>
  gulp
    .src(path.scssEntry)
    .pipe(sourcemap.init())
    .pipe(gulpSass({ outputStyle: 'compressed' }))
    .pipe(autoprefix({ cascade: false }))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(`${dist}/resource/css`));

const js = () => gulp.src(path.js).pipe(gulp.dest(`${dist}/resource/js`));

/* =========================
   COMMANDS
========================= */
gulp.task('default', gulp.series('sass', 'serv'));

gulp.task('build', gulp.series(clean, html, fonts, imageBuild, sassBuild, js));
