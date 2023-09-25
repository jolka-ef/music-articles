const gulp = require('gulp');

require('./css.js');
require('./content.js');
require('./images.js');
require('./javascript.js');

gulp.task('build', gulp.series(
    'javascript',
    'css',
    'images',
    'content'
));
