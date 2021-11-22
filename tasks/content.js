const config = require('./config.json');
const contentData = require('../sampleData');
const fs = require('fs-extra');
const glob = require('glob-fs')({gitignore: true});
const gulp = require('gulp');
const htmlMinifier = require('html-minifier');
const nunjucks = require('nunjucks');
const path = require('path');
const templates = glob.readdirSync('[^_]*.html', {cwd: 'templates'});

if (process.env.WATCH) {
    nunjucks.configure('templates', {
        autoescape: false,
        watch: true,
    });
} else {
    nunjucks.configure('templates', {
        autoescape: false,
    });
}

const minifyHtml = (html) => {
    let opts = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true,
    };
    return htmlMinifier.minify(html, opts);
};

const processHtml = (html) => {
    return process.env.NODE_ENV === 'production' ? minifyHtml(html) : html;
};

/**
 * @param {string} template
 */
function generateContent(template) {
    contentData.imagePath = '.' + config.imgPath;
    contentData.baseUrl = path.join('/', (isProd() ? config.repo : '.'), '/');
    let html = nunjucks.render(
        template,
        contentData
    );

    fs.outputFile(
        path.join(config.publicDir, template), processHtml(html)
);
}

function isProd() {
    return process.env.NODE_ENV === 'production';
}


const buildPages = () => {
    templates.forEach(function(templateName) {
        generateContent(templateName);
    });
};

gulp.task('content', async () => {
    try {
        await buildPages();
    } catch (err) {
        /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.error(err);
    }
});
