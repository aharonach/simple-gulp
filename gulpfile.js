const { src, dest, watch } = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mediaQueries = require('postcss-sort-media-queries');
const uglify = require('gulp-uglify');

const SASS_SRC_PATHS = [
    "./assets/sass/**/*.scss",
];

const JS_SRC_PATHS = [
    "./assets/js/**/*.js",
];

function build_styles() {
    return src(SASS_SRC_PATHS)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([mediaQueries(), autoprefixer(), cssnano()]))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest('./build/css'));
}

function build_scripts() {
    return src(JS_SRC_PATHS)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./build/js'));
}

function watch_files() {
    watch(SASS_SRC_PATHS, build_styles);
    watch(JS_SRC_PATHS, build_scripts);
}

exports.styles = build_styles;
exports.scripts = build_scripts;
exports.watch = watch_files;