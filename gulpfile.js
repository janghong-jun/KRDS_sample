const gulp = require('gulp');
const postcss = require('gulp-postcss');
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
const htmlmin = require('gulp-htmlmin');

const removeEmptyRulesWithComments = () => {
  return {
    postcssPlugin: 'remove-empty-rules-with-comments',
    Once(root) {
      root.walkRules((rule) => {
        if (rule.nodes && rule.nodes.every((node) => node.type === 'comment')) {
          rule.remove();
        }
      });
    },
  };
};
removeEmptyRulesWithComments.postcss = true;

const src = './src';
const dist = './dist';

const path = {
  main: src,
  scssEntry: [`${src}/resources/scss/output.scss`, `${src}/resources/scss/plugin/swiper-bundle.min.scss`],
  scssWatch: `${src}/resources/scss/**/*.scss`,
  css: `${src}/resources/css`,
  js: `${src}/resources/js/**/*.js`,
  images: `${src}/resources/img/**/*.{jpg,jpeg,png,gif,svg,webp,ico}`,
  font: `${src}/resources/fonts/**/*.{otf,woff,woff2}`,
  html: [`${src}/**/*.html`, `!${src}/components/**/*.html`],
  guideResources: `${src}/guide/resources/**/*`,
  adminResources: `${src}/resources/admin/**/*`,
};

const clean = () => del([dist]);
/* =========================
   SCSS (DEV)
========================= */
gulp.task('sass', () => {
  return gulp
    .src(path.scssEntry, { base: `${src}/resources/scss` })
    .pipe(sourcemap.init())
    .pipe(gulpSass({ outputStyle: 'expanded', silenceDeprecations: ['legacy-js-api', 'global-builtin', 'if-function'] }).on('error', gulpSass.logError))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(path.css))
    .pipe(browser.stream({ match: '**/*.css' }));
});

/* =========================
   GUIDE SCSS (DEV)
========================= */
const guideScssEntry = `${src}/resources/scss/guide/guide.scss`;
const guideCssOutput = `${src}/guide/resources/css`;

gulp.task('guide-sass', () => {
  return gulp
    .src(guideScssEntry, { base: `${src}/resources/scss/guide` })
    .pipe(sourcemap.init())
    .pipe(gulpSass({ outputStyle: 'expanded', silenceDeprecations: ['legacy-js-api', 'global-builtin', 'if-function'] }).on('error', gulpSass.logError))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(guideCssOutput))
    .pipe(browser.stream({ match: '**/*.css' }));
});

/* =========================
   SERVER (DEV)
========================= */
gulp.task('serv', () => {
  browser.init({
    port: 3000,
    open: false,
    online: true,
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
  gulp.watch(guideScssEntry, gulp.series('guide-sass'));
  gulp.watch(path.js).on('change', reload);
  gulp.watch(path.images).on('change', reload);
  gulp.watch(path.html).on('change', reload);
});

/* =========================
   BUILD TASKS
========================= */
const html = () =>
  gulp
    .src(path.html)
    .pipe(ssi({ root: path.main }))
    .pipe(
      htmlmin({
        collapseWhitespace: false,
        removeComments: false,
      }),
    )
    .pipe(gulp.dest(dist));

const newer = require('gulp-newer');
const gulpSsi = require('gulp-ssi');
const imageBuild = () =>
  gulp
    .src(path.images)
    .pipe(newer(`${dist}/resources/img`))
    .pipe(imagemin())
    .pipe(gulp.dest(`${dist}/resources/img`));

const fonts = () => gulp.src(path.font).pipe(gulp.dest(`${dist}/resources/fonts`));

const sassBuild = () =>
  gulp
    .src(path.scssEntry, { base: `${src}/resources/scss` })
    .pipe(gulpSass({ outputStyle: 'expanded', silenceDeprecations: ['legacy-js-api', 'global-builtin', 'if-function'] }))
    .pipe(
      autoprefix({
        overrideBrowserslist: ['> 0.2% in KR', 'cover 99.5% in KR', 'not dead'],
        cascade: false,
      }),
    )
    .pipe(postcss([removeEmptyRulesWithComments()]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(`${dist}/resources/css`));

const js = () => gulp.src(path.js).pipe(gulp.dest(`${dist}/resources/js`));

const guideResources = () => gulp.src(path.guideResources).pipe(gulp.dest(`${dist}/guide/resources`));

// BUILD TASK
const guideSassBuild = () => {
  return gulp
    .src(guideScssEntry, { base: `${src}/resources/scss/guide` })
    .pipe(sourcemap.init())
    .pipe(gulpSass({ outputStyle: 'expanded', silenceDeprecations: ['legacy-js-api', 'global-builtin', 'if-function'] }))
    .pipe(
      autoprefix({
        overrideBrowserslist: ['> 0.2% in KR', 'cover 99.5% in KR', 'not dead'],
        cascade: false,
      }),
    )
    .pipe(postcss([removeEmptyRulesWithComments()]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(guideCssOutput));
};
const adminResources = () => gulp.src(path.adminResources).pipe(gulp.dest(`${dist}/resources/admin`));
/* =========================
   COMMANDS
========================= */
gulp.task('default', gulp.series('sass', 'serv'));

gulp.task('build', gulp.series(html, fonts, imageBuild, sassBuild, js, guideResources, guideSassBuild, adminResources));
gulp.task('clean', gulp.series(clean));
