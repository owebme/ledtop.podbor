var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var base64 = require('gulp-base64');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var riot = require('gulp-riot');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var px2vw = require('gulp-px2vw');
var combiner = require('stream-combiner2').obj;
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

browserSync.init({
	open: false,
	notify: false,
	watchOptions: {
        usePolling: true
    },
	// proxy: "http://localhost:8080/"
	server: {
		baseDir: "./"
	}
});

gulp.task('css', function() {
	return combiner(
		gulp.src('assets/css/style.scss'),
		sass(),
		csso(),
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}),
        base64({
            baseDir: './',
            extensions: ['svg'],
            maxImageSize: 16*1024, // bytes
            debug: false
        }),
		gulp.dest('assets/css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('styleguide', function() {
	return combiner(
		gulp.src('assets/css/styleguide.scss'),
		sass(),
		csso(),
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}),
        base64({
            baseDir: './',
            extensions: ['svg', 'png', 'jpg'],
            maxImageSize: 16*1024, // bytes
            debug: false
        }),
		gulp.dest('assets/css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('build', gulp.series('css', 'styleguide'));

gulp.watch([
	'assets/css/style.scss',
	'assets/css/**/*.scss'
], gulp.series('css'));

// gulp.watch([
// 	'assets/css/styleguide.scss',
// 	'assets/css/**/*.scss'
// ], gulp.series('styleguide'));

gulp.watch([
	'assets/js/*.js',
	'assets/js/**/*.js',
	// 'assets/styleguide/*.html',
	// 'assets/styleguide/**/*.html',
	'assets/templates/*.html',
	'assets/templates/**/*.html'
]).on('change', reload);

gulp.watch([
	// 'styleguide.html',
	'podbor.html'
]).on('change', reload);
