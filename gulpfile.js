const { src, dest, watch, parallel } = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();

function styles(){
    return src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({level: 2}))
        .pipe(dest('./build/css'))
        .pipe(browserSync.stream());
};

function watchs(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch('./src/scss/*.scss', styles);
    watch('./*.html').on('change', browserSync.reload);
};

exports.default = parallel(watchs, styles);