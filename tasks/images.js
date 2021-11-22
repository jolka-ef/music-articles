const config = require('./config.json');
const gulp = require('gulp');

gulp.task('images', function() {
    return gulp.src('dev/images/**/*')
        .pipe(gulp.dest(config.publicDir + config.imgPath));
});
