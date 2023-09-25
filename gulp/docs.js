const { src, dest, watch, parallel, series } = require('gulp');
const fs = require('fs');

// sass
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const webpCss = require('gulp-webp-css');
const csso = require('gulp-csso');
// const groupMedia = require('gulp-group-css-media-queries');
const sassGlob = require('gulp-sass-glob');

// js
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const webpack = require('webpack-stream');

// html
const fileInclude = require('gulp-file-include');
const webpHTML = require('gulp-webp-html');

// Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const newer = require('gulp-newer');

const concat = require('gulp-concat');
const clean = require('gulp-clean');

function styles () {
    return src('./src/sass/*.sass')
        .pipe(sassGlob())
        .pipe(scss({includePaths: ['./node_modules'] }))
        // .pipe(groupMedia())
        // .pipe(webpCss())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(csso())
        .pipe(dest('./docs/assets/css'))
}

function fonts() {
    return src('./src/fonts/*.*')
        .pipe(dest('./docs/assets/fonts'))
}

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

function html() {
    return src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(dest('./docs'))
}

function images() {
    return src(['./src/images/*.*', '!src/images/*.svg'])
        .pipe(newer('./docs/assets/images'))
        .pipe(webp())
        .pipe(src('./src/images/*.*'))
        .pipe(newer('./docs/assets/images'))
        .pipe(imagemin())
        .pipe(dest('./docs/assets/images'))
}

function scripts() {
    return src(['./src/js/*.js'])
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        // .pipe(uglify())
        .pipe(webpack(require('./../webpack.config.js')))
        .pipe(dest('./docs/assets/js'))
}

function copyFiles() {
    return src(['./node_modules/animate.css/animate.min.css'])
        .pipe(dest('./docs/assets/css'))
}

function cleanDocs(cb) {
    if (fs.existsSync('./docs/')) {
		return src('./docs/', { read: false })
			.pipe(clean({ force: true }));
	}

    cb()
}

exports.stylesDocs = styles
exports.htmlDocs = html
exports.imagesDocs = images
exports.scriptsDocs = scripts
exports.fontsDocs = fonts
exports.copyFilesDocs = copyFiles
exports.cleanDocs = cleanDocs