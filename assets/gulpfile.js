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
var _ = require('underscore');

browserSync.init({
	open: false,
	notify: false,
	watchOptions: {
        usePolling: true
    },
	proxy: "http://localhost:8080/"
	// server: {
	// 	baseDir: "../"
	// }
});

gulp.task('css', function() {
	return combiner(
		gulp.src('css/style.scss'),
		sass(),
		csso(),
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}),
        base64({
            baseDir: '../',
            extensions: ['svg'],
            maxImageSize: 16*1024, // bytes
            debug: false
        }),
		rename("style.css"),
		gulp.dest('css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('libs', function() {
	gulp.src(['js/libs/jquery.min.js',
		'js/libs/modernizr.custom.js',
		'js/libs/fastclick.min.js',
		'js/libs/riot/riot+compiler.update.js',
		'js/libs/baobab.js',
		'js/libs/underscore-min.js',
		'js/libs/rangeslider.js',
		'js/libs/afterlag-js/dist/afterlag.min.js',
		'js/libs/url.min.js',
		'js/libs/store.min.js',
		'js/libs/sortable/Sortable.min.js'])
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});

gulp.task('dev', gulp.parallel('css', 'libs'));

gulp.watch([
	'css/style.scss',
	'css/**/*.scss'
], gulp.series('css'));

gulp.watch([
	'templates/*.html',
	'templates/**/*.html',
	'js/*.js',
	'js/**/*.js'
]).on('change', reload);

gulp.watch([
	'API/*.js',
	'API/**/*.js',
	'../views/private.html'
]).on('change', _.debounce(reload, 3000));
