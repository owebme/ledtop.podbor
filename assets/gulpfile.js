var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var base64 = require('gulp-base64');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var riot = require('gulp-riot');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cached = require('gulp-cached');
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
		cached('sass'),
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

gulp.task('app', function() {
	gulp.src(['js/components/commons/app.js',
		'js/components/commons/common.js',
		'js/components/commons/afterlag.js',
		'js/components/commons/modules.js',
		'js/components/commons/utils.js',
		'js/components/commons/request.js',
		'js/components/fetch.js',
		'js/components/config.js',
		'js/components/router.js',
		'js/plugins/styles.js',
		'js/plugins/sortable.js',
		'js/store/data.js',
		'js/store/products.js',
		'js/store/packages.js',
		'js/store/light.js',
		'js/store/type.js',
		'js/store/group.js'])
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});

gulp.task('templates', function() {
	gulp.src(['templates/*.html',
		'templates/**/*.html'])
		.pipe(riot())
		.pipe(concat('templates.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});

gulp.task('app.build', function() {
	gulp.src(['js/libs.js',
		'js/templates.js',
		'js/app.js',
		'js/init.js'])
		.pipe(concat('app.build.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('js.build', gulp.parallel('libs', 'app', 'templates'));

gulp.task('build', gulp.parallel('css', 'app.build'));

gulp.task('dev', gulp.parallel('css', 'js.build'));


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
