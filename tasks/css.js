const autoprefixer = require('autoprefixer');
const config = require('./config.json');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function() {
    return (
        gulp.src('./dev/styles/styles.scss', )
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(postcss([autoprefixer()]))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(config.publicDir))
    );
});

