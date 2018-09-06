var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('sass', function() {
    return gulp.src('scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('scss/style.scss', ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback)
})