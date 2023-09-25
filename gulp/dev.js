const { src, dest, watch, parallel, series } = require('gulp');
const fs = require('fs');

// sass
const scss = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const sourceMaps = require('gulp-sourcemaps');

// js
const webpack = require('webpack-stream');
const babel = require('gulp-babel');

// images
const imagemin = require('gulp-imagemin');
const fileInclude = require('gulp-file-include');

const server = require('gulp-server-livereload');
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
        .pipe(scss({ outputStyle: 'compressed', includePaths: ['./node_modules'] }))
        // .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(sourceMaps.write())
        .pipe(concat('style.min.css'))
        .pipe(dest('./build/assets/css'))
}

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

function html() {
    return src(['./src/html/*.html', '!./src/html/blocks/*.html'])
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(dest('./build'))
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
        // .pipe(babel({
        //     presets: ['@babel/preset-env']
        // }))
        .pipe(webpack(require('./../webpack.config.js')))
        // .pipe(concat('main.min.js'))
        .pipe(dest('./build/assets/js'))
}

function copyFiles() {
    return src(['./node_modules/animate.css/animate.min.css'])
        .pipe(dest('./build/assets/css'))
}

function watching(cb) {
    watch(['./src/sass/**/*.sass'], parallel(styles))
    watch(['./src/images/**/*.*'], parallel(images))
    watch(['./src/js/**/*.js'], parallel(scripts))
    watch(['./src/html/**/*.html'], parallel(html))

    cb()
}

function cleanBuild(cb) {
    if (fs.existsSync('./build/')) {
		return src('./build/', { read: false })
			.pipe(clean({ force: true }));
	}

    cb()
}

const serverOptions = {
	livereload: true,
	open: true,
};

function serverDev() {
    return src('./build/').pipe(server(serverOptions));
}

exports.stylesDev = styles
exports.htmlDev = html
exports.imagesDev = images
exports.scriptsDev = scripts
exports.fontsDev = fonts
exports.copyFilesDev = copyFiles
exports.watchingDev = watching
exports.cleanBuild = cleanBuild
exports.serverDev = serverDev