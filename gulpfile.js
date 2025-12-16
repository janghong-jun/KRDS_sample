const gulp = require("gulp"),
  sass = require("gulp-dart-sass"),
  sourcemap = require("gulp-sourcemaps"),
  browser = require("browser-sync"),
  connectSSI = require("connect-ssi"),
  reload = browser.reload,
  del = require("del"),
  ssi = require("gulp-ssi"),
  autoprefix = require("gulp-autoprefixer"),
  imagemin = require("gulp-imagemin");
// dgbl = require("del-gulpsass-blank-lines");

const clean = () => del(["./dist"]);

const src = "./src";
const dist = "./dist";
const path = {
  main: src,
  scss: `${src}/resource/scss/**/*.scss`,
  css: `${src}/resource/css/`,
  js: `${src}/resource/js/**/*.js`,
  images: `${src}/resource/img/**/*.{jpg,jpeg,png,gif,svg,webp,ico}`,
  font: `${src}/resource/fonts/**/*.+(otf|woff|woff2)`,
  html: [`${src}/**/*.html`, `!${src}/components/**/*.html`],
};
const scssOptions = {
  outputStyle: "expanded",
};

gulp.task("sass", () => {
  return (
    gulp
      .src(path.scss)
      // .pipe(sourcemap.init())
      .pipe(sass(scssOptions).on("error", sass.logError))
      .pipe(autoprefix({ cascade: false }))
      .pipe(sourcemap.write())
      .pipe(gulp.dest(path.css)) // ✅ src/resource/css
      .pipe(browser.stream())
  );
});

gulp.task("serv", () => {
  browser.init({
    // open: 'external',
    server: {
      baseDir: path.main,
      middleware: [
        connectSSI({
          baseDir: __dirname + "/src/",
          ext: ".html",
        }),
      ],
    },
  });

  gulp.watch(path.scss, gulp.series("sass"));
  gulp.watch(path.js).on("change", reload);
  gulp.watch(path.images).on("change", reload);
  gulp.watch(path.html).on("change", reload);
});

const html = () => {
  return gulp
    .src(path.html)
    .pipe(
      ssi({
        root: path.main,
      })
    )
    .pipe(gulp.dest(dist));
};

const image = () => {
  return gulp
    .src(path.images)
    .pipe(imagemin())
    .pipe(gulp.dest(`${dist}/resource/img`));
};

const fonts = () => {
  return gulp.src(path.font).pipe(gulp.dest(`${dist}/resource/fonts`));
};

const css = () => {
  return gulp
    .src(path.scss)
    .pipe(sass(scssOptions).on("error", sass.logError))
    .pipe(
      autoprefix({
        // browsers: [
        //   "> 0.5%",
        //   "last 5 versions",
        //   "Firefox ESR",
        //   "IE 11",
        //   "not dead",
        // ],
        cascade: false,
      })
    )
    .pipe(gulp.dest(`${dist}/resource/css`));
};
const cssCopy = () => {
  return gulp
    .src(`${path.css}/**/*`) // ✅ css 폴더 전체
    .pipe(gulp.dest(`${dist}/resource/css`));
};
const js = () => {
  return gulp.src(path.js).pipe(gulp.dest(`${dist}/resource/js`));
};

const build = gulp.series(
  clean,
  html,
  fonts,
  image, // 🔥 이 줄 추가
  gulp.series("sass"), // SCSS → src/css
  cssCopy, // css 폴더 통째로 복사
  js
);

gulp.task("default", gulp.series("sass", "serv"));
gulp.task("build", build);
