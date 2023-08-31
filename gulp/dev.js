const { src, dest, watch, parallel, series } = require('gulp');
const fs = require('fs');

// sass
const scss = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const sourceMaps = require('gulp-sourcemaps');

// js
// const webpack = require('webpack-stream');

// images
const imagemin = require('gulp-imagemin');
const fileInclude = require('gulp-file-include');

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const changed = require('gulp-changed');

// errr messages
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

function styles () {
    return src('./src/sass/*.sass')
        .pipe(plumber(plumberNotify('sass')))
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(scss({ outputStyle: 'compressed' }))
        // .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(sourceMaps.write())
        .pipe(concat('style.min.css'))
        .pipe(dest('./build/assets/css'))
        .pipe(browserSync.stream())
}

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

function html() {
    return src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(dest('./build'))
        .pipe(browserSync.stream())
}

function images() {
    return src(['./src/images/*.*', '!app/images/*.svg'])
        .pipe(changed('build/assets/images'))
        .pipe(imagemin())
        .pipe(dest('./build/assets/images'))
}

function fonts() {
    return src('./src/fonts/*.*')
        .pipe(dest('./build/assets/fonts'))
}

function scripts() {
    return src(['./src/js/*.js'])
        .pipe(plumber(plumberNotify('js')))
        .pipe(concat('main.min.js'))
        .pipe(dest('./build/assets/js'))
        .pipe(browserSync.stream())
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    watch(['./src/sass/**/*.sass'], styles)
    watch(['./src/images/**/*.*'], images)
    watch(['./src/js/**/*.js'], scripts)
    watch(['./src/html/**/*.html'], html)
    // watch(['./src/html/**/*.html']).on('change', browserSync.reload);
}

function cleanBuild(cb) {
    if (fs.existsSync('./build/')) {
		return src('./build/', { read: false })
			.pipe(clean({ force: true }));
	}

    cb()
}

exports.stylesDev = styles
exports.htmlDev = html
exports.imagesDev = images
exports.scriptsDev = scripts
exports.fontsDev = fonts
exports.watchingDev = watching
exports.cleanBuild = cleanBuild