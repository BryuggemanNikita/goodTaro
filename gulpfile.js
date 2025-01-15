const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const paths = {
    scss: './views/scss/**/*.scss',
    css: './public/css/',
    pug: './views/**/*.pug',
    dist: './dist/',
    js: './views/js/**/*.js',
    jsDist: './public/js/'
};

function scripts() {
    return gulp
        .src(paths.js)
        .pipe(concat('auth.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsDist));
}

function compileSCSS() {
    return gulp
        .src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.css));
}

function compilePug() {
    return gulp
        .src('./views/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.dist));
}

function watchFiles() {
    gulp.watch(paths.js, scripts);
    gulp.watch(paths.scss, compileSCSS);
    gulp.watch(paths.pug, compilePug);
}

exports.scripts = scripts;
exports.scss = compileSCSS;
exports.pug = compilePug;
exports.watch = watchFiles;

exports.default = gulp.parallel(scripts, compileSCSS, compilePug, watchFiles);
