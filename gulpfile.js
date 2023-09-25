const { parallel, series } = require('gulp');

const {
    stylesDev, 
    htmlDev, 
    imagesDev, 
    scriptsDev, 
    fontsDev, 
    watchingDev, 
    cleanBuild,
    serverDev,
    copyFilesDev
} = require('./gulp/dev.js');

const {
    stylesDocs,
    htmlDocs,
    scriptsDocs,
    imagesDocs,
    fontsDocs,
    cleanDocs,
    copyFilesDocs
} = require('./gulp/docs.js');

exports.default = series(
    cleanBuild,
    parallel(stylesDev, 
        htmlDev, 
        imagesDev, 
        scriptsDev, 
        fontsDev,
        watchingDev,
        copyFilesDev
    ),
    serverDev
);

exports.docs = series(
    cleanDocs,
    parallel(stylesDocs,
        htmlDocs,
        imagesDocs,
        fontsDocs,
        scriptsDocs,
        copyFilesDocs
    )
);